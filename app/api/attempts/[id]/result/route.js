// src/app/api/attempts/[id]/result/route.js
import prisma from "@/utils/db";

export async function GET(req, { params }) {
  const attemptId = Number(params.id);

  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    select: {
      score: true,
      passed: true,
      status: true,
    },
  });

  return Response.json(attempt);
}
