// src/repositories/exam.repo.js
import prisma from "@/utils/db";

export const examRepo = {
  findById: async (id) => {
    return prisma.exam.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });
  },
};
