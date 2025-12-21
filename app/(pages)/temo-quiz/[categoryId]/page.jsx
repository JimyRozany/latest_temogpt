// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import { toast } from "sonner";
// const TemoQuiz = () => {
//   const apiURL = process.env.NEXT_PUBLIC_API_URL;
//   const { categoryId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState({});
//   const [questions, setQuestions] = useState([]);

//   const [questionShortAnswer, setQuestionShortAnswer] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [shortAnswer, setShortAnswer] = useState("");
//   const [showResult, setShowResult] = useState(false);
//   const [score, setScore] = useState({
//     totalScore: 0,
//     correctAnswers: 0,
//   });
//   useEffect(() => {
//     setLoading(true);
//     // get optional questions
//     axios
//       .post(`/api/quizzes/category`, { categoryId })
//       .then((response) => {
//         console.log(response.data.data.questions);
//         setQuestions(response.data.data.questions);
//         setQuestionShortAnswer(response.data.data.QuestionShortAnswer);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//         toast.error("خطأ في الحصول على الاسئلة");
//       });

//     // get user information
//     axios
//       .get(`/api/users/me`)
//       .then((response) => {
//         // console.log(response.data.user);
//         // set user information
//         setUser(response.data.user);
//       })
//       .catch((error) => {
//         console.log(error);
//         // handle error
//       });
//   }, []);

//   const handleNextQuestion = (e) => {
//     e.preventDefault();

//     // if (currentQuestion == questions.length - 1) {
//     //   setQuestions(questionShortAnswer);
//     // }

//     // increment score
//     if (questions[currentQuestion].answer == selectedAnswer) {
//       setScore({
//         ...score,
//         totalScore: score.totalScore + 1,
//         correctAnswers: score.correctAnswers + 1,
//       });
//     }
//     if (questions.length > currentQuestion) {
//       setSelectedAnswer("");
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       return null;
//     }
//     console.log(score);
//   };
//   return (
//     <div className="w-full border border-gray-500  rounded h-[calc(100vh_-_30px)] overflow-scroll overflow-x-hidden p-2">
//       <div className="border border-red-500">
//         <div className="border border-green-500">
//           <h1>امتحان html</h1>
//           <p>
//             {currentQuestion + 1}/
//             {questions.length + questionShortAnswer.length}
//           </p>
//         </div>
//         {questions.length > 0 ? (
//           <div className="border border-yellow-400 flex justify-center ">
//             {!showResult ? (
//               <div className="border border-purple-900 w-4/5">
//                 <h1>{questions[currentQuestion]?.question}</h1>
//                 <div className="flex flex-col gap-4">
//                   <div
//                     className={`mr-2 text-md font-semibold border-2 border-gray-200 p-2 cursor-pointer ${
//                       questions[currentQuestion]?.answer == selectedAnswer
//                         ? `border-primary`
//                         : `border-gray-200`
//                     }
//                   }`}
//                     onClick={() =>
//                       setSelectedAnswer(questions[currentQuestion]?.answer)
//                     }
//                   >
//                     {questions[currentQuestion]?.answer}
//                   </div>
//                   {questions[currentQuestion]?.options.map((option) => (
//                     <div
//                       key={option.id}
//                       className={`mr-2  text-md font-semibold border-2 border-gray-200 p-2 cursor-pointer  ${
//                         option.name == selectedAnswer
//                           ? `border-primary`
//                           : `border-gray-200`
//                       } `}
//                       onClick={() => setSelectedAnswer(option.name)}
//                     >
//                       {option.name}
//                     </div>
//                   ))}
//                 </div>
//                 {questions.length > currentQuestion ? (
//                   <button
//                     onClick={(e) => handleNextQuestion(e)}
//                     // disabled={questions.length <= currentQuestion}
//                     className="btn  btn-neutral"
//                   >
//                     Next
//                   </button>
//                 ) : (
//                   <button
//                     // onClick={(e) => handleNextQuestion(e)}
//                     // disabled={questions.length <= currentQuestion}
//                     className="btn  btn-neutral"
//                   >
//                     Next 2
//                   </button>
//                 )}

//                 {score.totalScore}
//               </div>
//             ) : (
//               <div></div>
//             )}
//           </div>
//         ) : (
//           <div className="border border-yellow-400 flex justify-center ">
//             new short qqqq
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TemoQuiz;

// ----------------------------------------------------------------

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const TemoQuiz = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const { categoryId } = useParams();
  const [user, setUser] = useState({});
  const [quizName, setQuizName] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [questions, setQuestions] = useState([]);
  const [shortAnswerQuestions, setShortAnswerQuestions] = useState([]);
  const [checkedSortAnswer, setCheckedSortAnswer] = useState(false);
  const [shortAnswer, setShortAnswer] = useState("");

  const selectedClass = "bg-blue-500 text-white";

  const { question, answer, options } = questions[activeQuestion] || {};
  const { question: shortAnswerQuestion, id: shortAnswerQuestionId } =
    shortAnswerQuestions[activeQuestion] || {};

  //  get all optional questions form database
  useEffect(() => {
    axios
      .post(`/api/quizzes/category`, { categoryId })
      .then((response) => {
        setQuizName(response.data.data.name);
        setQuestions(response.data.data.questions);
        setShortAnswerQuestions(response.data.data.QuestionShortAnswer);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
        toast.error("خطأ في الحصول على الاسئلة");
      });

    // get user information
    axios
      .get(`/api/users/me`)
      .then((response) => {
        console.log(response.data.user);
        // set user information
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  }, []);

  const openQuiz = (userId, categoryId) => {
    const data = {
      userId,
      categoryId,
    };

    // set open quiz
    axios
      .post(`/api/open-quiz`, data)
      .then((res) => console.log("send Open Quiz", res.data))
      .catch((error) => console.log(error));
  };

  // select and check answer
  const onAnswerSelected = (option, index) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    if (option === answer) {
      setSelectedAnswer(true);
      console.log(true);
    } else {
      setSelectedAnswer(false);
      console.log(false);
    }
  };

  // change current question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + questions[activeQuestion].degree,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  const nextShortAnswerQuestion = () => {
    const userShortAnswer = {
      answer: shortAnswer,
      userId: user.userId,
      categoryId,
      questionShortId: shortAnswerQuestionId,
    };
    // sned answer
    axios
      .post(`/api/questions/short-answer`, userShortAnswer)
      .then((response) => {
        console.log(response.data);
        toast.success("تم الارسال بنجاح");
        if (activeQuestion !== shortAnswerQuestions.length - 1) {
          setActiveQuestion((prev) => prev + 1);
        } else {
          setActiveQuestion(0);
          setShowResult(true);
          setCheckedSortAnswer(true);
        }
        setShortAnswer("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("خطأ في الارسال");
      });

    console.log(shortAnswer);
    if (activeQuestion === shortAnswerQuestions.length - 1) {
      calculateScore();
      openQuiz(user.userId, categoryId);
    }
  };

  // calculate the score and update in database
  const calculateScore = () => {
    const data = {
      score: result.score,
      quiz: quizName,
      userId: user.userId,
    };
    axios
      .post(`/api/user-score`, data)
      .then((res) => console.log("saved score"))
      .catch((err) => console.log(err));

    // get pass degree and check if user passed update score in database
    axios
      .get(`/api/degree/pass-degree`)
      .then((res) => {
        const passDegrees = res.data.passDegrees;
        passDegrees.map((el) => {
          if (el.category.name === quizName) {
            if (result.score >= el.degree) {
              const data = {
                userId: user.userId,
                quizName,
              };
              axios
                .put(`/api/score`, data)
                .then((res) => console.log(res.data))
                .catch((error) => console.log(error));
            }
          }
        });

        console.log(res.data.passDegrees);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-2">
      <div className="w-full border border-gray-500   rounded h-[calc(100vh_-_100px)] overflow-scroll overflow-x-hidden p-2">
        <h2 dir="rtl" className="text-center underline">
          امتحان {quizName}
        </h2>

        <div className="w-full m-auto  flex justify-center items-center">
          {/* <div className="border border-blue-500  w-full p-4"> */}
          <div className="w-4/5">
            {!showResult ? (
              <div className="flex justify-center w-[100%]">
                <div className="w-[40rem] " dir="rtl">
                  <h3 className="text-xl font-medium" dir="rtl">
                    سؤال : {activeQuestion + 1}
                    <span>/{questions.length}</span>
                  </h3>
                  {/* <h3>{questions[activeQuestion]?.question}</h3> */}
                  <h3 className="text-xl font-semibold">{question}</h3>
                  <ul className="list-none w-full">
                    {options?.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => onAnswerSelected(option.name, index)}
                        className={`border border-gray-500 mb-2 hover:cursor-pointer  text-2xl p-2 rounded ${
                          selectedAnswerIndex == index
                            ? selectedClass
                            : "hover:bg-gray-100 "
                        }`}
                      >
                        <span>{option.name}</span>
                      </li>
                    ))}
                  </ul>
                  {checked ? (
                    <button
                      onClick={nextQuestion}
                      className="btn btn-outline border-none bg-gray-300"
                    >
                      {/* {activeQuestion === questions.length - 1
                      ? "Finish"
                      : "Next"} */}
                      التالي
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn btn-outline border-none bg-gray-300"
                    >
                      {/* {activeQuestion === questions.length - 1
                      ? "Finish"
                      : "Next"} */}
                      التالي
                    </button>
                  )}
                </div>
              </div>
            ) : !checkedSortAnswer ? (
              <div className="flex justify-center w-[100%]">
                <div className="w-full border " dir="rtl">
                  <h3 dir="rtl">
                    سؤال : {activeQuestion + 1}
                    <span>
                      /{shortAnswerQuestions.length} - {questions.length}
                    </span>
                  </h3>
                  {/* <h3>{questions[activeQuestion]?.question}</h3> */}
                  <h3 className="text-xl font-semibold">
                    {" "}
                    {shortAnswerQuestion}
                  </h3>
                  <div className="border rounded mb-2 shadow-md w-4/5">
                    <textarea
                      placeholder="الاجابة"
                      value={shortAnswer}
                      onChange={(e) => setShortAnswer(e.target.value)}
                      className=" outline-none text-xl w-full resize-none h-40 max-h-36"
                    ></textarea>
                  </div>
                  {shortAnswer != "" ? (
                    <button
                      onClick={nextShortAnswerQuestion}
                      className="btn btn-outline border-none bg-gray-300"
                    >
                      {activeQuestion === shortAnswerQuestions.length - 1
                        ? "انهاء"
                        : "التالي"}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn btn-outline border-none bg-gray-300"
                    >
                      {activeQuestion === shortAnswerQuestions.length - 1
                        ? "انهاء"
                        : "التالي"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="px-4" dir="rtl">
                <h3 className="text-secondary ">نتيجة الاسئلة الاختياري</h3>
                <p className="text-xl text-secondary font-medium">
                  نسبة {(result.score * 100) / 100}%
                </p>
                <p className="text-xl text-secondary font-medium">
                  عدد الاسئلة : {questions.length}
                </p>
                <p className="text-xl text-secondary font-medium">
                  النتيجة : {result.score}
                </p>
                <p className="text-xl text-secondary font-medium">
                  الاجابات الصحيحة : {result.correctAnswers}
                </p>
                <p className="text-xl text-secondary font-medium">
                  الاجابات الخاطئة : {result.wrongAnswers}
                </p>
                <p>
                  <span className="font-medium text-secondary">تنبيه</span> :
                  ستتم مراجعة الاسئلة المقالي من قبل مشرف النظام
                </p>
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default TemoQuiz;
