import prisma from "../../../utils/db";
export async function POST(req) {
  // get data from request body
  const data = req.json();
  const { userId, categoryId, totalDegree } = data;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });
    // update user score
    const userScore = await prisma.userScore.findFirst({
      where: { userId: parseInt(userId), quiz: category.name },
      data: { score: parseInt(totalDegree) },
    });
    const userScoreUpdated = await prisma.userScore.update({
      where: { userId: parseInt(userScore.id) },
      data: { score: parseInt(totalDegree) },
    });

    // update Score table
    const score = await prisma.score.findFirst({
      where: { userId: parseInt(userId) },
    });
    if (category.name === "html") {
      const updatedScore = await prisma.score.update({
        where: { id: parseInt(score.id) },
        update: { data: { html: true } },
      });
    } else if (category.name === "php") {
      const updatedScore = await prisma.score.update({
        where: { id: parseInt(score.id) },
        update: { data: { php: true } },
      });
    }
    return Response.json(
      { message: "user score updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

/**
 * user ID
 * category ID
 * total Score
 *
 */
