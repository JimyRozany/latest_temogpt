"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CorrectingQuestionsPage = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiURL}/categories`)
      .then((res) => {
        const cats = res.data.data.filter((cat) => cat.name !== "programming");
        console.log(cats);

        setCategories(cats);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleShowUsers = (e, catId) => {
    e.preventDefault();
    axios
      .post(`${apiURL}/questions/category-users`, { categoryId: catId })
      .then((res) => {
        console.log(res.data.data);
        
        const users = res.data.data.filter(
          (user) => user.UserShortAnswer.length > 0
        );
        console.log(users);

        // user answer on the short answer question
        setUsers(users);
      })
      .catch((error) => console.log(error));
  };

  const handleShowAnswer = (e, userId, catId) => {
    router.push(
      `/dashboard/quizzes/correction-questions/answer/${userId}?categoryId=${catId}`
    );
  };

  return (
    <div className="w-full border border-gray-500  rounded h-[calc(100vh_-_30px)] overflow-scroll overflow-x-hidden p-2">
      {/* title page */}
      <div className="flex justify-center">
        <div className="">
          <h3>تصحيح الاسئلة المقالي</h3>
          <hr />
        </div>
      </div>
      {/* filtration buttons  */}
      <div className=" my-2 flex justify-start gap-5 items-center" dir="rtl">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className="btn text-white"
            onClick={(e) => handleShowUsers(e, cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* users  */}
      <div className="flex justify-center mt-2 ">
        {users.length > 0 ? (
          <div className="relative overflow-x-auto" dir="rtl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    الاسم
                  </th>
                  <th scope="col" className="px-6 py-3">
                    البريدالالكتروني
                  </th>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.username}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) =>
                          handleShowAnswer(
                            e,
                            user.id,
                            user.UserShortAnswer[0].categoryId
                          )
                        }
                        className="relative inline-flex border-none items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Show answer
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <span>لم يبدء احد هذا الاختبار</span>
        )}
      </div>
    </div>
  );
};

export default CorrectingQuestionsPage;
