"use client";
import { useRouter } from "next/navigation";
const QuizButtons = ({ categoryId, quizName }) => {
  const router = useRouter();
  const startQuiz = (e, categoryId) => {
    if (
      confirm(
        "تنبيه : لا تبدء الاختبار قبل مراجعة المحتوي بشكل جيد , الاختبار يفتح لمره واحدة فقط"
      )
    ) {
      router.replace(`/temo-quiz/${categoryId}`);
    }
  };

  return (
    <button
      className="btn btn-gost btn-sm md:btn-md  text-white"
      onClick={(e) => startQuiz(e, categoryId)}
      dir="ltr"
    >
      {quizName ? quizName : "ابدء الاختبار"}
    </button>
  );
};

export default QuizButtons;
