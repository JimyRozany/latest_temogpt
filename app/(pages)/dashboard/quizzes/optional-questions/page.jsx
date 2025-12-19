"use client";

import Link from "next/link";
import { MdEditNote } from "react-icons/md";
import axios from "axios";

import { useState, useEffect } from "react";

const OptionalQuestionPage = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const activeClass = "border-primary text-primary";

  useEffect(() => {
    axios
      .get(`${apiURL}/categories`)
      .then((response) => {
        const data = response.data.data;
        const cats = data.filter((c) => c.name != "programming");

        setCategories(cats);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleShowQuestions = (e, categoryId) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/quizzes/category`, { categoryId: categoryId })
      .then((response) => {
        setQuestions(response.data.data.questions);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (e, question) => {
    e.preventDefault();

    if (confirm("هل انت متاكد من حذف هذا السؤال")) {
      try {
        axios.delete(`${apiURL}/quizzes/${question.id}`).then((res) => {
          handleShowQuestions(e, question.categoryId);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full border border-gray-500  rounded h-[calc(100vh_-_30px)] overflow-scroll overflow-x-hidden p-2">
      <h1 className="text-2xl font-bold text-center">الاسئلة الاختياري</h1>

      <div className="flex justify-end items-center gap-2 mb-2 ">
        <div className=" flex justify-end items-center gap-2 group ">
          <MdEditNote className=" text-xl group-hover:text-primary duration-300" />

          <Link
            href="/dashboard/quizzes/create"
            className="group-hover:text-primary duration-300"
          >
            اضافة سؤال اختياري
          </Link>
        </div>
      </div>

      <hr />

      {/* three buttons to get all questions by category ID */}
      <div className="mt-2  flex items-center justify-center gap-2 " dir="rtl">
        {categories.map((category, index) => (
          <button
            key={index}
            dir="rtl"
            className={` flex items-center gap-2 outline-none bg-white border   rounded px-4 py-2 ${
              category.id == questions[0]?.categoryId
                ? activeClass
                : `border-gray-400`
            } `}
            onClick={(e) => {
              handleShowQuestions(e, category.id);
            }}
          >
            <span>اختبار</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      <hr className="my-4" />
      {questions.length === 0 && (
        <div className="text-center text-xl font-medium">
          لا يوجد اختبارات بهذا القسم
        </div>
      )}
      {/* show questions */}
      {questions.length > 0 && (
        <div className="overflow-x-hidden overflow-y-auto" dir="rtl">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>السؤال</th>
                <th>الاجابة</th>
                <th>درجة</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>{question.degree}</td>
                    <td>
                      <Link href={`/dashboard/quizzes/edit/${question.id}`}>
                        <button className="border border-yellow-500 outline-none rounded bg-white text-yellow-500 text-md font-medium hover:bg-yellow-500 hover:text-white duration-300">
                          تعديل
                        </button>
                      </Link>
                      <span className="mx-2">|</span>
                      <button
                        onClick={(e) => handleDelete(e, question)}
                        className="border border-red-500 outline-none rounded bg-white text-red-500 text-md font-medium hover:bg-red-500 hover:text-white duration-300"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OptionalQuestionPage;
