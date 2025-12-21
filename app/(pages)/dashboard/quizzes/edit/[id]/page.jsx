"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

const EditQuizPage = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const { id } = useParams();
  const router = useRouter();

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
   * and get question by id
   *
   */
  useEffect(() => {
    axios
      .get(`/api/quizzes/${id}`)
      .then((response) => {
        // console.log(response.data.data.options[0].name);
        setQuestion(response.data.data);

        const updatedOptions = response.data.data.options?.filter(
          (option) => option.name !== response.data.data.answer
        );

        setQuestion({ ...response.data.data, options: updatedOptions });

        if (updatedOptions[0] === undefined) optionOne.current.value = null;
        else optionOne.current.value = updatedOptions[0].name;
        if (updatedOptions[1] === undefined) optionTwo.current.value = null;
        else optionTwo.current.value = updatedOptions[1].name;
        if (updatedOptions[2] === undefined) optionThree.current.value = null;
        else optionThree.current.value = updatedOptions[2].name;

        // if (updatedOptions[0] !== "" || updatedOptions[0] !== null)
        //   optionOne.current.value = updatedOptions[0].name;
        // else optionOne.current.value = null;

        // if (updatedOptions[1] !== "" || updatedOptions[1] !== null)
        //   optionTwo.current.value = updatedOptions[1].name;
        // else optionTwo.current.value = null;

        // if (updatedOptions[2] !== "" || updatedOptions[2] !== null)
        //   optionThree.current.value = updatedOptions[2].name;
        // else optionThree.current.value = null;

        // console.log(
        //   "optionOne is  ",
        //   optionOne,
        //   "optionTwo is ",
        //   optionTwo,
        //   "optionThree is ",
        //   optionThree
        // );

        // optionOne.current.value = response.data.data.options[0].name;
        // optionTwo.current.value =
        //   response.data.data.options[1]?.name != null ||
        //   response.data.data.options[1]?.name != ""
        //     ? response.data.data.options[1]?.name
        //     : null;
        // optionThree.current.value =
        //   response.data.data.options[2]?.name != null ||
        //   response.data.data.options[2]?.name != ""
        //     ? response.data.data.options[2]?.name
        //     : null;
      })
      .catch((error) => {
        console.log(error);
      });

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

    let options = [
      {
        id: question.options[0].id,
        name: optionOne.current.value,
        questionId: id,
      },
    ];

    if (optionTwo.current.value !== "") {
      options = [
        ...options,
        {
          id: question.options[1].id,
          name: optionTwo.current.value,
          questionId: id,
        },
      ];
    }
    if (optionThree.current.value !== "") {
      options = [
        ...options,
        {
          id: question.options[2].id,
          name: optionThree.current.value,
          questionId: id,
        },
      ];
    }

    const updatedQuestion = { ...question, options: options };

    // // validation
    if (updatedQuestion.question === "")
      return toast.error("يجب ادخال السؤال (الموضوع)");
    if (updatedQuestion.answer === "")
      return toast.error("يجب ادخال الاجابة الصحيحة");
    if (updatedQuestion.categoryId === "")
      return toast.error("يجب اختيار القسم");
    if (updatedQuestion?.options[0].name === "")
      return toast.error("يجب ادخال اختيار");
    if (updatedQuestion?.degree === "0" || updatedQuestion?.degree === "")
      return toast.error("يجب ادخال درجة السؤال");

    console.log(updatedQuestion);

    setLoading(true);
    // // call the api send request
    axios
      .put(`/api/quizzes/${id}`, updatedQuestion)
      .then((response) => {
        toast.success("تم التعديل بنجاح");
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
        router.push(`/dashboard/quizzes`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("خطأ في الحفظ");
      });
  };

  return (
    <div className="w-full border border-gray-500  rounded h-[calc(100vh_-_30px)] overflow-scroll overflow-x-hidden p-2">
      <h1 className="text-2xl font-bold text-center">تعديل سؤال</h1>
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
            {/* {answers.map((answer, index) => (
              <input
                key={index}
                type="text"
                className="w-full border border-red-500 rounded bg-white shadow-md focus:outline-none focus:border-red-500   focus:shadow-red-300"
                placeholder="اختيار"
                dir="rtl"
                // value={answer.name}
                onChange={(e) => updateAnswer(e, index, e.target.value)}
              />
            ))} */}

            <input
              type="text"
              className="w-full border border-red-500 rounded bg-white shadow-md focus:outline-none focus:border-red-500   focus:shadow-red-300"
              placeholder="اختيار"
              dir="rtl"
              ref={optionOne}
            />

            <input
              type="text"
              className="w-full border border-red-500 rounded bg-white shadow-md focus:outline-none focus:border-red-500   focus:shadow-red-300"
              placeholder="اختيار"
              dir="rtl"
              ref={optionTwo}
            />

            <input
              type="text"
              className="w-full border border-red-500 rounded bg-white shadow-md focus:outline-none focus:border-red-500   focus:shadow-red-300"
              placeholder="اختيار"
              dir="rtl"
              ref={optionThree}
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
                  "حفظ"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuizPage;
