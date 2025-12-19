import prisma from "../../../../utils/db";

export async function POST(request) {
  try {
    const data = await request.json();
    const questions = await prisma.category.findUnique({
      where: { id: Number(data.categoryId) },
      include: {
        // questionShortAnswer: true,
        // questions: true,
        QuestionShortAnswer: true,
        questions: { include: { options: true } }, // Fetch all questions and options for that category
      },
    });

    return Response.json(
      { message: "request success", data: questions },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
