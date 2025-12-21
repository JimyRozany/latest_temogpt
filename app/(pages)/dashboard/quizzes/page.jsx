"use client";

import Link from "next/link";
import { MdEditNote } from "react-icons/md";
import axios from "axios";

import { useState, useEffect } from "react";
import { toast } from "sonner";

const QuizzesPage = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);
  const [passDegree, setPassDegree] = useState({
    degree: "0",
    categoryId: "",
  });
  const [newObj, setNewObj] = useState({ dee: 0, catId: "" });

  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/categories`)
      .then((response) => {
        const data = response.data.data;
        const cats = data.filter((c) => c.name != "programming");

        setCategories(cats);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePassDegree = (e, catId) => {
    e.preventDefault();
    axios
      .get(`/api/degree/${catId}`)
      .then((res) => {
        console.log(res.data);
        setPassDegree(res.data.data);
        setShowForm(true);
      })
      .catch((error) => console.log(error));
  };
  const handleUpdatePassDegree = (e) => {
    e.preventDefault();
    // const passDegreeObj = {
    //   degree: passDegree.degree,
    //   categoryId: passDegree.categoryId,
    // };
    axios
      .put(`/api/degree/pass-degree`, passDegree)
      .then((res) => {
        console.log(res.data);
        toast.success("تم الاضافة بنجاح");
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("لم تتم الاضافة");
      });
  };
  return (
    <div className="w-full border border-gray-500  rounded h-[calc(100vh_-_30px)] overflow-y-scroll overflow-x-hidden">
      <h1 className="text-2xl font-bold text-center">الاختبارات</h1>
      <div className="flex justify-end items-center gap-2 mb-2 ">
        <Link href="/dashboard/quizzes/create" className="cursor-pointer">
          <button className="btn btn-ghost">
            <MdEditNote className="text-2xl" />
            اضافة سؤال اختياري
          </button>
        </Link>
        <Link
          href="/dashboard/quizzes/create-short-answer-question"
          className="cursor-pointer"
        >
          <button className="btn btn-ghost">
            <MdEditNote className="text-2xl" />
            اضافة سؤال مقالي
          </button>
        </Link>
      </div>

      <hr />
      <div className="border p-2">
        <h3 dir="rtl">تحديد درجة النجاح:</h3>
        <div className=" my-2 flex justify-start gap-5 items-center" dir="rtl">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="btn text-white"
              onClick={(e) => handlePassDegree(e, cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="" dir="rtl">
          {showForm && (
            <form
              className="flex flex-col gap-4 w-72"
              onSubmit={(e) => handleUpdatePassDegree(e)}
            >
              <label> درجة النجاح</label>
              <input
                type="text"
                value={passDegree.degree}
                onChange={(e) =>
                  setPassDegree({ ...passDegree, degree: e.target.value })
                }
              />
              <button className="btn text-white" type="submit">
                حفظ
              </button>
            </form>
          )}
        </div>
      </div>
      <hr />
      {/* three buttons to get all questions by category ID */}
      {/* <div className="mt-2  flex items-center justify-center gap-2 " dir="rtl">
        <Link
          href="/dashboard/quizzes/optional-questions"
          className={` flex items-center gap-2 outline-none bg-white border  rounded px-4 py-2 `}
        >
          <span></span>
          <span>html</span>
        </Link>
        <Link
          href=""
          className={` flex items-center gap-2 outline-none bg-white border  rounded px-4 py-2 `}
        >
          <span>اختبار</span>
          <span>php</span>
        </Link>
      </div> */}
    </div>
  );
};

export default QuizzesPage;
