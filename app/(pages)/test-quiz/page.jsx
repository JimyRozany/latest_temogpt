"use client";
import { useEffect, useState } from "react";
import questions from "../../../utils/data";
const TestQuizPage = () => {
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
  const selectedClass = "bg-blue-500 text-white";

  const { question, correctAnswer, options } = questions[activeQuestion];
  // select and check answer
  const onAnswerSelected = (option, index) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    if (option === correctAnswer) {
      setSelectedAnswer(true);
      console.log(true);
    } else {
      setSelectedAnswer(false);
      console.log(false);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
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

  const testCallApi = () => {
    alert("testCallApi");
  };

  return (
    <div>
      <h1>TestQuizPage</h1>
      <div className="">
        <button onClick={testCallApi}>click ME</button>

        <h2>
          Question : {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div className="">
        {!showResult ? (
          <div className="">
            <h3>{questions[activeQuestion].question}</h3>
            <ul className="list-none w-96">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => onAnswerSelected(option, index)}
                  className={`border border-gray-500 mb-2 cursor-pointer  text-2xl p-2 rounded ${
                    selectedAnswerIndex == index
                      ? selectedClass
                      : "hover:bg-gray-100 "
                  }`}
                >
                  <span>{option}</span>
                </li>
              ))}
            </ul>
            {checked ? (
              <button
                onClick={nextQuestion}
                className="btn btn-outline border-none bg-gray-300"
              >
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            ) : (
              <button
                disabled
                className="btn btn-outline border-none bg-gray-300"
              >
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        ) : (
          <div className="">
            <h3>Result</h3>
            <h3>overall {(result.score * 25) / 100}%</h3>
            <p> Total Questions : {questions.length}</p>
            <p> Total Score : {result.score}</p>
            <p> Correct Answers : {result.correctAnswers}</p>
            <p> wrong Answers : {result.wrongAnswers}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestQuizPage;
