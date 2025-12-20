"use client";

import { FaCircleUser } from "react-icons/fa6";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") return toast.error("username is requier");
    if (password === "") return toast.error("password is requier");
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/users/login",
        { username, password },
        { withCredentials: true }
      );
      router.replace("/");

      // router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(` ${error.response.data.message}`);
      setLoading(false);
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      {/* email input */}
      <label
        className="input input-bordered flex items-center gap-2 rounded-full"
        dir="rtl"
      >
        <FaCircleUser className="text-2xl text-primary" />
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="grow text-xl text-secondary "
          placeholder="اسم المستخدم"
        />
      </label>
      {/* password input */}
      <label
        className="input input-bordered flex items-center gap-2 rounded-full mt-2"
        dir="rtl"
      >
        <CiLock className="text-2xl text-primary" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="grow text-xl"
          placeholder="كلمة المرور"
        />
      </label>

      <div className="flex justify-center mt-4">
        <button
          disabled={loading}
          className={`btn btn-neutral bg-primary text-white font-tajawal font-thin text-2xl inline-block px-10 rounded-full border-none outline-none hover:bg-secondary ${
            loading && "opacity-50 cursor-not-allowed"
          }  `}
        >
          {loading ? (
            <span className="loading loading-dots loading-md text-primary"></span>
          ) : (
            "دخول"
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
