import prisma from "../../../utils/db";

export async function PUT(req) {
  const data = await req.json();
  const { userId, quizName } = data;
  try {
    if (quizName === "html") {
      const score = await prisma.score.updateMany({
        where: { userId: parseInt(userId) },
        data: {
          html: true,
        },
      });
    } else if (quizName === "php") {
      const score = await prisma.score.updateMany({
        where: { userId: parseInt(userId) },
        data: {
          php: true,
        },
      });
    }

    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "error", data: error }, { status: 500 });
  }
}
