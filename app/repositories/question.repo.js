// src/services/attempt.service.js
import { attemptRepo } from "@/repositories/attempt.repo";
import { examRepo } from "@/repositories/exam.repo";

export async function startExam(examId, userId) {
  const exam = await examRepo.findById(examId);

  if (!exam || !exam.published) {
    throw new Error("Exam not available");
  }

  const existingAttempt = await attemptRepo.findUserAttempt(examId, userId);
  if (existingAttempt) {
    throw new Error("Exam already started");
  }

  const attempt = await attemptRepo.createAttempt(examId, userId);
  return attempt;
}
