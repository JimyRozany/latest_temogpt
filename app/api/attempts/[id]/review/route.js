// src/app/api/attempts/[id]/review/route.js
import prisma from "@/utils/db";
import { getUserFromToken } from "@/utils/auth";

export async function GET(req, { params }) {
  const user = getUserFromToken(req);
  const attemptId = Number(params.id);

  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: {
      exam: {
        select: { title: true },
      },
      answers: {
        include: {
          question: {
            select: {
              question: true,
              type: true,
              degree: true,
              correctAnswer: true,
              options: true,
            },
          },
        },
      },
    },
  });

  if (!attempt || attempt.userId !== user.id) {
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  }

  if (attempt.status !== "COMPLETED") {
    return Response.json(
      { message: "Exam not finished yet" },
      { status: 400 }
    );
  }

  return Response.json(attempt);
}
