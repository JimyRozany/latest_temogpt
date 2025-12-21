"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// Dynamically load the CKEditor component to prevent SSR issues
const CKEditor = dynamic(() => import("../../../../components/CKEditor"), {
  ssr: false,
});

export default function AddArticle() {
  const router = useRouter();
  const [editorData, setEditorData] = useState("");
  const [article, setArticle] = useState({
    title: "",
    body: "",
    userId: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // get user information
    axios
      .get(`/api/users/me`)
      .then((res) => {
        setUser(res.data.user);
        setArticle({ ...article, userId: res.data.user.userId });
        console.log(res.data.user);
      })
      .catch((error) => console.log(error));
    // get all categories
    axios
      .get(`/api/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setCategories(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async () => {
    const lastArticle = {
      ...article,
      body: editorData,
      // userId: toString(user.userId),
    };
    console.log(lastArticle);

    // validation
    if (lastArticle.title === "")
      return toast.error("يجب ادخال العنوان (الموضوع)");
    if (lastArticle.body === "") return toast.error("يجب ادخال المحتوي");
    if (lastArticle.categoryId === "") return toast.error("يجب اختيار القسم ");

    try {
      setLoading(true);
      await axios.post(`/api/articles`, lastArticle);
      toast.success("تم الاضافة بنجاح");
      setArticle({ title: "", body: "", userId: "", categoryId: "" });
      setEditorData("");
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("لم تتم الاضافة");
    }
  };
  return (
    <div className=" flex items-center flex-col h-screen overflow-scroll">
      <span className="text-xl font-semibold text-gray-400 ">
        limit 900 characters
      </span>
      <div className=" w-[400px] md:w-[600px] lg:w-[900px] ">
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
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "اضافة"
            )}
          </button>
        </div>
        <CKEditor value={editorData} onChange={setEditorData} />

        <div className="w-full m-0 p-0">
          <h3>Preview</h3>
          <div
            className="  h-40  break-words w-full overflow-scroll "
            dangerouslySetInnerHTML={{ __html: editorData }}
          ></div>
        </div>
      </div>
    </div>
  );
}
