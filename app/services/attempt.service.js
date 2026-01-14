// src/services/attempt.service.js
import { answerRepo } from "@/repositories/answer.repo";
import prisma from "@/utils/db";
import { autoGrade } from "./grading.service";

export async function submitExam(attemptId, answers) {
  // 1. حفظ الإجابات
  await answerRepo.createMany(attemptId, answers);

  // 2. جلب الإجابات مع الأسئلة
  const storedAnswers = await answerRepo.findAnswersWithQuestions(attemptId);

  // 3. تصحيح تلقائي
  const { totalScore, maxScore } = autoGrade(storedAnswers);

  // 4. جلب Passing Score
  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: { exam: true },
  });

  const passed = totalScore >= attempt.exam.passingScore;

  // 5. تحديث Attempt
  await prisma.examAttempt.update({
    where: { id: attemptId },
    data: {
      score: totalScore,
      passed,
      submittedAt: new Date(),
    },
  });

  return {
    score: totalScore,
    passed,
  };
}
