// src/repositories/answer.repo.js
import prisma from "@/utils/db";

export const answerRepo = {
  createMany: async (attemptId, answers) => {
    return prisma.userAnswer.createMany({
      data: answers.map((a) => ({
        attemptId,
        questionId: a.questionId,
        answer: a.answer,
      })),
    });
  },

  findAnswersWithQuestions: async (attemptId) => {
    return prisma.userAnswer.findMany({
      where: { attemptId },
      include: {
        question: true,
      },
    });
  },
};
