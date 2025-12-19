import prisma from "../../../../utils/db";

export async function GET(req, { params }) {
  // const { userId } = params;
  const { IDs } = await params;
  const userId = IDs[0];
  const categoryId = IDs[1];
  // return Response.json(
  //   { message: "request success", data: [userId, categoryId] },
  //   { status: 200 }
  // );

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(categoryId),
      },
    }); 

    const userScores = await prisma.userScore.findMany({
      where: {
        userId: parseInt(userId),
        quiz: category?.name,
      },
    });
    return Response.json(
      { message: "request success", data: userScores },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
