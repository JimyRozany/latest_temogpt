"use client";

import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
const ContentPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/categories`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleShowArticles = (e, id) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${apiURL}/articles/articles-by-category`, {
        categoryId: id,
      })
      .then((res) => {
        console.log(res.data.data.articles);
        setArticles(res.data.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleDelete = (e, id, categoryId) => {
    e.preventDefault();
    if (confirm("are you sure you want to delete this article?")) {
      setLoading(true);
      axios
        .delete(`${apiURL}/articles/${id}`)
        .then((res) => {
          console.log(res.data);
          // setArticles(articles.filter((article) => article.id !== id));
          setLoading(false);
          handleShowArticles(e, categoryId);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      router.refresh();
    }
  };
  return (
    <div className=" h-screen overflow-scroll">
      {/* back button to dashboard */}
      <Link
        href="/dashboard"
        className="text-xl font-medium text-mainGray flex items-center gap-1 hover:text-primary duration-300"
      >
        <FaArrowLeftLong /> Dashboard
      </Link>

      <div className="flex justify-center mt-4">
        <div className=" flex flex-wrap justify-center gap-4">
          {/* filtration buttons get articles by category */}
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-4 border rounded-md hover:border-primary hover:text-primary text-sm sm:text-xl cursor-pointer duration-300 text-center"
              onClick={(e) => {
                handleShowArticles(e, category.id);
              }}
            >
              <div className="">
                <span className="uppercase border-none ">{category.name}</span>
                محتوى
              </div>
              {/* TODO:get number of articles to all category */}
              {/* <div className="text-sm text-mainGray">{articles.length}</div> */}
            </div>
          ))}

          {/* add article button */}
          <Link href="/dashboard/add-article">
            <div
              className="bg-white p-4 border rounded-md text-secondary cursor-pointer hover:border-primary hover:text-primary duration-300 text-center flex items-center justify-between"
              dir="rtl"
            >
              <div>
                <span className="text-sm md:text-xl">اضافة محتوى</span>
              </div>
              <CiCirclePlus className="text-md md:text-4xl text-primary" />
            </div>
          </Link>
        </div>
      </div>

      <hr className="h-[2px] my-2 w-4/5 mx-auto" />

      <div className="flex justify-center">
        <div className="w-4/5">
          {loading ? (
            <div className="text-center mt-20">
              <h1 className="text-4xl font-semibold text-secondary">
                <span className="loading loading-dots loading-lg"></span>
              </h1>
            </div>
          ) : articles.length === 0 ? (
            <div className=" flex justify-center mt-10">
              <div className="flex justify-between items-center p-4 max-w-60 text-gray-300">
                chose the category <FaLongArrowAltUp />
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto" dir="rtl">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>عنوان</th>
                    <th>خيارات</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {articles?.map((article, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{article.title}</td>
                      <td>
                        <Link href={`/dashboard/content/${article.id}`}>
                          <button className="btn btn-warning text-gray-100">
                            تعديل
                          </button>
                        </Link>
                        <span className="px-4">|</span>
                        <button
                          onClick={(e) =>
                            handleDelete(e, article.id, article.categoryId)
                          }
                          className="btn btn-error text-gray-100"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
