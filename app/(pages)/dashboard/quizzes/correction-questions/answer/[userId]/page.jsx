"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
const AnswerPage = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const { userId } = useParams();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [user, setUser] = useState({});
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [category, setCategory] = useState("");

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [endCorrection, setEndCorrection] = useState(false);
  const [inputDegree, setInputDegree] = useState("");
  const [totalDegree, setTotalDegree] = useState(0);
  const [passDegree, setPassDegree] = useState(0);

  useEffect(() => {
    // get questions and answers
    axios
      .post(`/api/questions/user-answers`, { categoryId, userId })
      .then((res) => {
        setUser(res.data.data[0]?.user);
        setCategory(res.data.data[0]?.category.name);

        setQuestionsAndAnswers(res.data.data);
      })
      .catch((error) => console.log(error));
    // get user score
    axios
      .get(`/api/user-score/${userId}/${categoryId}`)
      .then((res) => {
        console.log(res.data.data[0].score);
        setTotalDegree(res.data.data[0]?.score);
      })
      .catch((err) => console.log(err));
    // get pass degree for the quiz
    axios
      .get(`/api/degree/${categoryId}`)
      .then((res) => {
        setPassDegree(res.data.data.degree);
      })
      .catch((err) => console.log(err));
  }, []);

  // handle correcting calculation degree and show next question and answer
  const handleCorrecting = () => {
    if (activeQuestion < questionsAndAnswers.length - 1) {
      setTotalDegree(
        (prevTotalDegree) => prevTotalDegree + parseInt(inputDegree)
      );
      setActiveQuestion((prevActiveQuestion) => prevActiveQuestion + 1);
      setInputDegree("");
    } else if (activeQuestion === questionsAndAnswers.length - 1) {
      setTotalDegree(
        (prevTotalDegree) => prevTotalDegree + parseInt(inputDegree)
      );
      setInputDegree("");
      setEndCorrection(true);
    } else return null;
  };

  // handle student success or fail
  const handleStudentSuccess = () => {
    axios
      .post(`/api/user-pass`, {
        userId,
        categoryId,
        totalDegree,
      })
      .then((res) => router.back())
      .catch((err) => console.log(err));
  };

  const handleStudentFail = () => {
    alert("fail");
  };

  return (
    <div className="w-full border border-gray-500  rounded h-[calc(100vh_-_30px)] overflow-scroll overflow-x-hidden p-2">
      <div className="flex justify-center">
        <h3 className="text-secondary text-xl underline">الاسئلة والاجابات</h3>
      </div>
      {/* user info */}
      <div className="flex justify-start flex-col md:flex-row gap-2" dir="rtl">
        <div
          className="border border-secondary p-2 rounded-md shadow-lg w-full md:w-1/2  xl:w-1/4"
          dir="rtl"
        >
          <h3 className="text-md text-secondary">بيانات الطالب</h3>
          <p className="text-sm font-semibold text-secondary">
            الاسم: {user?.username}
          </p>
          <p className="text-sm font-semibold text-secondary">
            البريد الالكتروني: {user?.email}
          </p>
          <p className="text-sm font-semibold text-secondary">
            اختبار: {category}
          </p>
        </div>
        <div
          className="border border-secondary p-2 rounded-md shadow-lg w-full md:w-1/2  xl:w-1/4"
          dir="rtl"
        >
          <p className="text-sm font-semibold text-secondary">
            الدرجة النهائية :100
          </p>
          <p className="text-sm font-semibold text-secondary">
            درجة النجاح :{passDegree}
          </p>
          <p className="text-sm font-semibold text-secondary">
            مجموع الطالب: {totalDegree}
          </p>
          {endCorrection && (
            <div className="flex  items-center gap-2">
              <button
                onClick={handleStudentSuccess}
                className="border border-teal-400 text-teal-400 shadow-sm bg-white hover:shadow-teal-400 duration-300 px-4 rounded-md font-semibold"
              >
                ناجح
              </button>
              <button
                onClick={handleStudentFail}
                className="border border-rose-500 text-rose-500 shadow-sm bg-white hover:shadow-rose-500 duration-300 px-4 rounded-md font-semibold"
              >
                راسب
              </button>
            </div>
          )}
        </div>
      </div>
      {/* questions and answers */}
      <div className="border border-primary  mt-2 shadow-md p-4 rounded-md">
        {!endCorrection ? (
          <div className="border rounded-md p-2 my-2 shadow-md" dir="rtl">
            <div className="flex justify-between items-center">
              <p className="text-secondary text-xl font-semibold">
                {questionsAndAnswers[activeQuestion]?.questionShort.question}
              </p>
              <p className="text-gray-400 text-sm font-semibold">
                <span>الدرجة: </span>
                {questionsAndAnswers[activeQuestion]?.questionShort.degree}
              </p>
            </div>
            <p className="text-secondary">
              الاجابة: {questionsAndAnswers[activeQuestion]?.answer}
            </p>
            <div className="flex justify-end items-center ">
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="number"
                  placeholder="الدرجة"
                  className="focus:outline-none border border-primary rounded-md"
                  onChange={(e) => setInputDegree(e.target.value)}
                  value={inputDegree}
                />
                <button
                  onClick={handleCorrecting}
                  className="outline-none border border-primary text-primary hover:border-teal-400 hover:text-teal-400 text-sm rounded-md font-bold shadow-sm hover:shadow-teal-400 duration-300"
                >
                  التالي
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-center ">انتهت الاجابات </span>
          </div>
        )}

        {/* *********************** test new code *********************** */}
        {/* 
        {questionsAndAnswers.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-md p-2 my-2 shadow-md"
            dir="rtl"
          >
            <div className="flex justify-between items-center">
              <p className="text-secondary text-xl font-semibold">
                {item.questionShort.question}
              </p>
              <p className="text-gray-400 text-sm font-semibold">
                <span>الدرجة</span> {item.questionShort.degree}
              </p>
            </div>
            <p className="text-secondary">الاجابة: {item.answer}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default AnswerPage;
