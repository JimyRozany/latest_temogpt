import prisma from "../../../utils/db";

export async function POST(req) {
  const { userId, categoryId } = await req.json();

  try {
    // check if user has already opened the quiz for this category
    const quizExists = await prisma.openQuizOrNot.findFirst({
      where: { userId: parseInt(userId), categoryId: parseInt(categoryId) },
    });
    if (!quizExists) {
      await prisma.openQuizOrNot.create({
        data: {
          openQuiz: true,
          userId: parseInt(userId),
          categoryId: parseInt(categoryId),
        },
      });
    }
    const openQuiz = await prisma.openQuizOrNot.updateMany({
      where: { userId: parseInt(userId), categoryId: parseInt(categoryId) },
      data: {
        openQuiz: true,
      },
    });

    return Response.json(
      { message: "request success", openQuiz },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internnal Server Error", error },
      { status: 500 }
    );
  }
}
