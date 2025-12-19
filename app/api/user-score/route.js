import prisma from "../../../utils/db";


export async function POST(req) {
  const data = await req.json();
  const { score, quiz, userId } = data;
  try {
    const userScore = await prisma.userScore.create({
      data: {
        score: parseInt(score),
        quiz,
        userId: parseInt(userId),
      },
    });
    return Response.json(
      { message: "added successfully", userScore },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
