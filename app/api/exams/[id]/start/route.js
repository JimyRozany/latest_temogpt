import prisma from "@/utils/db";
import { getUserFromToken } from "@/utils/auth";

export async function POST(req, { params }) {
  const user = getUserFromToken(req);
  const examId = Number(params.id);

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
  });

  if (!exam) {
    return Response.json({ message: "Exam not found" }, { status: 404 });
  }

  const existingAttempt = await prisma.examAttempt.findFirst({
    where: {
      examId,
      userId: user.id,
      status: { in: ["IN_PROGRESS", "SUBMITTED"] },
    },
    include: { exam: true },
  });

  if (existingAttempt) {
    // 🔥 check if expired
    const endTime =
      existingAttempt.startedAt.getTime() +
      existingAttempt.exam.timeLimit * 60000;

    if (Date.now() > endTime) {
      // الامتحان انتهى → auto submit
      await prisma.examAttempt.update({
        where: { id: existingAttempt.id },
        data: {
          status: "SUBMITTED",
          submittedAt: new Date(),
        },
      });
    } else {
      // لسه شغال → رجّع نفس المحاولة
      return Response.json(existingAttempt);
    }
  }

  // إنشاء Attempt جديد
  const attempt = await prisma.examAttempt.create({
    data: {
      examId,
      userId: user.id,
      startedAt: new Date(),
      status: "IN_PROGRESS",
    },
  });

  return Response.json(attempt);
}
