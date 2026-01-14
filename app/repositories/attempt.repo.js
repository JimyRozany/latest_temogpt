// src/repositories/attempt.repo.js
import prisma from "@/utils/db";

export const attemptRepo = {
  createAttempt: async (examId, userId) => {
    return prisma.examAttempt.create({
      data: {
        examId,
        userId,
        startedAt: new Date(),
      },
    });
  },

  findUserAttempt: async (examId, userId) => {
    return prisma.examAttempt.findFirst({
      where: {
        examId,
        userId,
      },
    });
  },
};
