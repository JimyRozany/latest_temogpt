"use client";
import AccordionItem from "../components/AccordionItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import QuizButtons from "../components/QuizButtons";

const Articles = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState({});
  const [renderArticles, setRenderArticles] = useState([]);
  const [showQuizLink, setShowQuizLink] = useState(false);

  const activeClass = "bg-primary text-white border-primary";

  useEffect(() => {
    fetchCategories();
    fetchUser();
    fetchArticles();
  }, []);

  useEffect(() => {
    categories?.map((cat) => {
      if (cat.name === "programming") {
        getArticlesByCategory(cat.id);
      }
    });
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/categories`);
      const cats = response.data.data;
      setCategories(cats);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchArticles = async () => {
    try {
      const response = await axios.get(`/api/articles`);
      setArticles(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/me-two`);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterArticles = (cat) => {
    const articlesRen = articles.filter(
      (article) => cat.id === article.categoryId
    );
    setRenderArticles(articlesRen);
    if (cat.name === "programming") {
      setShowQuizLink(false);
    } else {
      // check if user opened quiz
      axios
        .post(`/api/open-quiz/${user.id}`, { categoryId: cat.id })
        .then((res) => {
          console.log(
            "response from POST open quiz / USER ID And Category ID  ",
            res.data.data.length
          );
          // if (res.data.data.length == 0) {
          //   return setShowQuizLink(true);
          // }

          if (
            res.data.data[0]?.openQuiz === false ||
            res.data.data[0] === undefined ||
            res.data.data.length === 0
          ) {
            return setShowQuizLink(true);
          } else {
            return setShowQuizLink(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // get articles when  click on category button
  const getArticlesByCategory = async (catId) => {
    axios
      .post(`api/articles/articles-by-category`, {
        categoryId: catId,
      })
      .then((res) => {
        setRenderArticles(res.data.data.articles);
      })
      .catch((error) => console.log(error));
  };

  if (Object.keys(user).length === 0) {
    return (
      <div className="w-full">
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex justify-center">
      <div className=" w-4/5 flex flex-col items-center">
        {/* filtration */}
        <div className=" flex items-center gap-5 my-2 mt-4  bg-white" dir="rtl">
          {categories?.map((cat) => (
            <div
              className="indicator"
              key={cat.id}
              onClick={(e) => handleFilterArticles(cat)}
            >
              {user?.Score[0]?.php && cat.name == "php" && (
                <IoMdCheckmarkCircleOutline className="indicator-item text-3xl text-primary" />
              )}
              {user?.Score[0]?.html && cat.name == "html" && (
                <IoMdCheckmarkCircleOutline className="indicator-item text-3xl text-primary" />
              )}
              {user?.Score[0]?.programming && cat.name == "programming" && (
                <IoMdCheckmarkCircleOutline className="indicator-item text-3xl text-primary" />
              )}
              <button
                dir="rtl"
                className={` px-3 py-2  md:px-6 md:py-4 border rounded-md  text-gray-400 text-md md:text-xl font-medium  duration-300 ${
                  cat.id == renderArticles[0]?.categoryId && activeClass
                }`}
              >
                {cat.name === "php"
                  ? "لغة PHP"
                  : cat.name === "programming"
                  ? "البرمجة"
                  : cat.name === "html"
                  ? "لغة HTML"
                  : ""}
              </button>
            </div>
          ))}
        </div>
        {renderArticles.length === 0 && (
          <div className="flex justify-center items-center w-full mt-10">
            <p className="text-xl text-gray-400">
              لا يوجد محتوى متوفرة في هذا القسم حاليا.
            </p>
          </div>
        )}
        {/* articles */}
        <div className=" w-full ">
          {renderArticles?.map((article) => (
            <AccordionItem key={article.id} article={article} />
          ))}
        </div>
        {/* Quiz Link  */}
        {showQuizLink && (
          <QuizButtons
            categoryId={renderArticles[0]?.categoryId}
            quizName="ابدء الاختبار"
          />
        )}
      </div>
    </div>
  );
};

export default Articles;
