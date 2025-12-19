"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";

const CreateQuiz = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({
    question: "",
    answer: "",
    options: [],
    categoryId: "",
    degree: 1,
  });
  const optionOne = useRef(null);
  const optionTwo = useRef(null);
  const optionThree = useRef(null);

  /**
   *
   *  after load the page
   * get all the categories
   *
   */
  useEffect(() => {
    axios
      .get(`${apiURL}/categories`)
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
    const options = [
      optionOne.current.value,
      optionTwo.current.value != null || optionTwo.current.value != ""
        ? optionTwo.current.value
        : null,
      optionThree.current.value != null || optionThree.current.value != ""
        ? optionThree.current.value
        : null,
      // optionThree.current.value,
    ];

    const updatedQuestion = { ...question, options: options };

    // validation
    if (updatedQuestion.question === "")
      return toast.error("يجب ادخال السؤال (الموضوع)");
    if (updatedQuestion.answer === "")
      return toast.error("يجب ادخال الاجابة الصحيحة");
    if (updatedQuestion.categoryId === "")
      return toast.error("يجب اختيار القسم");
    if (updatedQuestion?.options[0] === "")
      return toast.error("يجب ادخال اختيار");
    if (updatedQuestion?.degree === "0" || updatedQuestion?.degree === "")
      return toast.error("يجب ادخال درجة السؤال");
    // if (updatedQuestion?.options[1] === "")
    //   return toast.error("يجب ادخال اختيار");
    // if (updatedQuestion?.options[2] === "")
    //   return toast.error("يجب ادخال اختيار");

    setLoading(true);
    // call the api send request
    axios
      .post(`${apiURL}/quizzes`, updatedQuestion)
      .then((response) => {
        console.log(response.data);
        toast.success("تم الاضافة بنجاح");
        setQuestion({
          question: "",
          answer: "",
          options: [],
          categoryId: "",
          degree: 1,
        });
        optionOne.current.value = "";
        optionTwo.current.value = "";
        optionThree.current.value = "";
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
      <h1 className="text-2xl font-bold text-center">انشاء امتحان</h1>
      {/* loading
      {loading && (
        <div className=" flex justify-center items-center mt-20 ">
          <span className=" loading loading-spinner loading-md"></span>
        </div>
      )} */}

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
            <input
              type="text"
              className="w-full border border-green-500 rounded bg-white shadow-md focus:outline-none focus:border-green-500 focus:shadow-green-300"
              placeholder="الاجابة الصحيحة"
              dir="rtl"
              value={question.answer}
              onChange={(e) =>
                setQuestion({ ...question, answer: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full border border-red-500 rounded bg-white shadow-md focus:outline-none focus:border-red-500   focus:shadow-red-300"
              placeholder="اختيار"
              dir="rtl"
              // onChange={(e) => setOptions((options[0] = e.target.value))}
              ref={optionOne}
            />
            <input
              type="text"
              className="w-full border border-red-500 rounded bg-white shadow-md focus:outline-none focus:border-red-500   focus:shadow-red-300"
              placeholder="اختيار"
              dir="rtl"
              //   value={question.options[1]}
              ref={optionTwo}
            />
            <input
              type="text"
              className="w-full border border-red-500 rounded bg-white shadow-md focus:outline-none focus:border-red-500   focus:shadow-red-300"
              placeholder="اختيار"
              dir="rtl"
              //   value={question.options[2]}
              ref={optionThree}
              //   onChange={(e) => setOptions([...options.push(e.target.value)])}
            />
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

export default CreateQuiz;
