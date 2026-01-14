// src/services/autoSubmit.service.js
import prisma from "@/utils/db";
import { submitExam } from "./attempt.service";

export async function autoSubmitIfExpired(attemptId) {
  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: { exam: true },
  });

  if (!attempt || attempt.submittedAt) return;

  const endTime =
    attempt.startedAt.getTime() + attempt.exam.timeLimit * 60000;

  if (Date.now() >= endTime) {
    await submitExam(attemptId, []); // submit بالإجابات الموجودة
  }
}
