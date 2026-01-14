// src/app/api/exams/[id]/submit/route.js
import { submitExam } from "@/services/attempt.service";
import { getUserFromToken } from "@/utils/auth";
import prisma from "@/utils/db";

export async function POST(req, { params }) {
  try {
    const user = getUserFromToken(req);
    const examId = Number(params.id);
    const body = await req.json();

    const attempt = await prisma.examAttempt.findFirst({
      where: {
        examId,
        userId: user.id,
        submittedAt: null,
      },
    });

    if (!attempt) {
      return Response.json(
        { message: "No active attempt found" },
        { status: 400 }
      );
    }

    const result = await submitExam(attempt.id, body.answers);

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: error.message || "Submit failed" },
      { status: 400 }
    );
  }
}
