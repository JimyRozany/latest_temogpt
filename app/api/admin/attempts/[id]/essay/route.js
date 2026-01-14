// src/app/api/admin/attempts/[id]/essay/route.js
import prisma from "@/utils/db";

export async function GET(req, { params }) {
  const attemptId = Number(params.id);

  const answers = await prisma.userAnswer.findMany({
    where: {
      attemptId,
      question: {
        type: "ESSAY",
      },
    },
    include: {
      question: true,
      user: {
        select: { id: true, username: true },
      },
    },
  });

  return Response.json(answers);
}
