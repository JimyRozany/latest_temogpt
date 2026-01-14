// src/app/api/attempts/[id]/time/route.js
import prisma from "@/utils/db";

export async function GET(req, { params }) {
  const attemptId = Number(params.id);

  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: { exam: true },
  });

  if (!attempt) {
    return Response.json({ message: "Attempt not found" }, { status: 404 });
  }

  const now = new Date();
  const endTime = new Date(
    attempt.startedAt.getTime() + attempt.exam.timeLimit * 60000
  );

  const remainingMs = endTime - now;

  return Response.json({
    remainingSeconds: Math.max(0, Math.floor(remainingMs / 1000)),
    expired: remainingMs <= 0,
  });
}
