"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";

const CreateShortAnswerQuestion = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({
    question: "",
    categoryId: "",
    degree: 1,
  });

  useEffect(() => {
    axios
      .get(`/api/categories`)
      .then((response) => {
        // console.log(response.data.data);
        const data = response.data.data;
        const cats = data.filter((c) => c.name != "programming");
        setCategories(cats);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (question.question === "")
      return toast.error("يجب ادخال السؤال (الموضوع)");
    if (question.categoryId === "") return toast.error("يجب اختيار القسم");
    if (question.degree === 0 || question?.degree === "")
      return toast.error("يجب ادخال درجة السؤال");

    setLoading(true);
    // call the api send request
    //DOTO: change the true URL
    axios
      .post(`/api/questions`, question)
      .then((response) => {
        toast.success("تم الاضافة بنجاح");
        setQuestion({
          question: "",
          categoryId: "",
          degree: 1,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("خطأ في الاضافة");
      });
  };

  return (
    <div className="w-full border border-gray-500  rounded h-[calc(100vh_-_30px)] overflow-scroll overflow-x-hidden p-2">
      <h1 className="text-2xl font-bold text-center">انشاء سؤال مقالي</h1>
      <div className="w-full flex justify-center">
        <div className=" w-96 p-2 bg-slate-100 rounded">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <textarea
              className="resize-none w-full border shadow-md rounded bg-white focus:outline-none focus:border"
              placeholder="السؤال"
              dir="rtl"
              value={question.question}
              onChange={(e) =>
                setQuestion({ ...question, question: e.target.value })
              }
            ></textarea>

            <div className="" dir="rtl">
              <select
                className="select w-full max-w-xs"
                dir="rtl"
                value={question.categoryId}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    categoryId: e.target.value,
                  })
                }
              >
                <option>قسم</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <label className="mt-2 font-medium text-secondary">
                درجة السؤال:
              </label>
              <input
                className="border rounded mt-1"
                type="number"
                value={question.degree}
                onChange={(e) =>
                  setQuestion({ ...question, degree: e.target.value })
                }
              />
            </div>
            <div className="w-full text-center mt-2">
              <button
                type="submit"
                className=" border-none outline-none w-min bg-green-500 p-4 rounded-lg text-white font-semibold tex-xl hover:bg-green-800 duration-300 "
                disabled={loading}
              >
                {loading ? (
                  <span className=" loading loading-spinner loading-md"></span>
                ) : (
                  "اضافة"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShortAnswerQuestion;
