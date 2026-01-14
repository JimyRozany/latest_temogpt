// src/app/api/admin/answers/[id]/grade/route.js
import prisma from "@/utils/db";

export async function POST(req, { params }) {
  const answerId = Number(params.id);
  const { degree } = await req.json();

  const answer = await prisma.userAnswer.findUnique({
    where: { id: answerId },
    include: { question: true },
  });

  if (!answer) {
    return Response.json({ message: "Answer not found" }, { status: 404 });
  }

  if (degree > answer.question.degree) {
    return Response.json(
      { message: "Invalid degree value" },
      { status: 400 }
    );
  }

  await prisma.userAnswer.update({
    where: { id: answerId },
    data: { degree },
  });

  return Response.json({ message: "Answer graded" });
}
