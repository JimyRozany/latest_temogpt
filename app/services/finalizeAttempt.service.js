// src/services/finalizeAttempt.service.js
import prisma from "@/utils/db";

export async function finalizeAttempt(attemptId) {
  const answers = await prisma.userAnswer.findMany({
    where: { attemptId },
    include: { question: true },
  });

  let totalScore = 0;

  for (const a of answers) {
    if (a.question.type === "MCQ") {
      if (a.answer === a.question.correctAnswer) {
        totalScore += a.question.degree;
      }
    } else {
      totalScore += a.degree || 0;
    }
  }

  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: { exam: true },
  });

  const passed = totalScore >= attempt.exam.passingScore;

  await prisma.examAttempt.update({
    where: { id: attemptId },
    data: {
      score: totalScore,
      passed,
      status: "COMPLETED",
    },
  });

  return { totalScore, passed };
}
