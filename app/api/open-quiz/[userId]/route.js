import prisma from "../../../../utils/db";

export async function GET(req, { params }) {
  const { userId } = await params;
  try {
    const userOpenQuiz = await prisma.openQuizOrNot.findMany({
      where: { userId: parseInt(userId) },
      include: {
        category: true,
      },
    });
    return Response.json(
      { message: "request success", data: userOpenQuiz },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  const { userId } = await params;
  const { categoryId } = await req.json();
  //   if (!userId) {
  //     return Response.json({ message: "User ID is required" }, { status: 400 });
  //   }

  try {
    const result = await prisma.openQuizOrNot.findMany({
      where: {
        userId: parseInt(userId),
        categoryId: parseInt(categoryId),
      },
    });

    const data = result.find((item) => item.categoryId == categoryId);

    return Response.json(
      { message: "tessssssssssst", data: result },
      { status: 200 }
    );
    //     return Response.json(
    //       { message: "request success", data: userOpenQuiz },
    //       { status: 200 }
    //     );
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
