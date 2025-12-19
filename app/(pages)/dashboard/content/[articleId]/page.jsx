"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation.js";

// Dynamically load the CKEditor component to prevent SSR issues
const CKEditor = dynamic(
  () => import("../../../../../components/CKEditor.jsx"),
  { ssr: false }
);

export default function EditArticle() {
  const { articleId } = useParams();
  const router = useRouter();
  const [editorData, setEditorData] = useState("");
  const [article, setArticle] = useState({});

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setLoading(true);

    // get article by id
    axios
      .get(`${apiURL}/articles/${articleId}`)
      .then((res) => {
        console.log(res.data.article);
        setArticle(res.data.article);
        setEditorData(res.data.article.body);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // get all categories
    axios
      .get(`${apiURL}/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lastArticle = { ...article, body: editorData };
    // validation
    if (lastArticle.title === "")
      return toast.error("يجب ادخال العنوان (الموضوع)");
    if (lastArticle.body === "") return toast.error("يجب ادخال المحتوي");
    if (lastArticle.categoryId === "") return toast.error("يجب اختيار القسم ");

    try {
      setLoading(true);
      await axios.put(`${apiURL}/articles/${articleId}`, lastArticle);
      toast.success("تم الحفظ بنجاح");
      setLoading(false);
      router.replace("/dashboard/content");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("خطأ من الخادم");
    }
  };
  return (
    <div className=" flex items-center flex-col h-screen overflow-scroll">
      <span className="text-xl font-semibold text-gray-400 ">
        limit 900 characters
      </span>
      {loading ? (
        <div className="mt-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="w-[400px] md:w-[600px] lg:w-[900px] ">
          <div className=" mt-5 flex justify-between items-center gap-2 ">
            <label className="input input-bordered   flex items-center gap-2">
              <input
                type="text"
                placeholder="موضوع"
                className="input input-bordered border-none w-full max-w-xs"
                value={article.title}
                onChange={(e) =>
                  setArticle({ ...article, title: e.target.value })
                }
              />
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={article.categoryId}
              onChange={(e) =>
                setArticle({ ...article, categoryId: e.target.value })
              }
              defaultChecked={article.categoryId}
            >
              <option>قسم</option>
              {categories?.map((cat) => (
                <option key={cat.id} dir="rtl" value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              className="btn btn-accent"
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "حفظ"
              )}
            </button>
          </div>
          <div dir="rtl" className="mt-5">
            <CKEditor value={editorData} onChange={setEditorData} />
          </div>
          <div>
            <h3>Preview</h3>
            <div
              className="overflow-scroll max-h-40 border border-green-500"
              dangerouslySetInnerHTML={{ __html: editorData }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
