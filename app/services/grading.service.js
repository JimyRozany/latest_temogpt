// src/services/grading.service.js
export function autoGrade(answers) {
  let totalScore = 0;
  let maxScore = 0;

  for (const item of answers) {
    const question = item.question;
    maxScore += question.degree;

    if (question.type === "MCQ") {
      if (item.answer === question.correctAnswer) {
        totalScore += question.degree;
      }
    }
  }

  return { totalScore, maxScore };
}
