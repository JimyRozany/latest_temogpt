"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { FaKey } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";

const AddUserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") return toast.error("اسم المستخدم مطلوب");
    if (email === "") return toast.error("البريد الالكتروني مطلوب");
    if (password === "") return toast.error("كلمة المرور مطلوبة");
    try {
      setLoading(true);
      await axios.post(`/api/users/register`, {
        username,
        email,
        password,
        role,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(` ${error.response.data.message}`);
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => handleSubmit(e)}
      dir="rtl"
    >
      <label className="input  input-bordered  flex items-center gap-2">
        <CiUser />
        <input
          type="text"
          className="grow"
          placeholder="الاسم"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>
      <label className="input input-bordered   flex items-center gap-2">
        <MdEmail />
        <input
          type="email"
          className="grow"
          placeholder="البريد الالكتروني"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <FaKey />
        <input
          type="text"
          className="grow"
          placeholder="كلمة المرور"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <select
        className="select w-full max-w-xs border border-secondary"
        onChange={(e) => setRole(e.target.value)}
        value={role}
      >
        <option>طريقة التعلم</option>
        <option value={"CHATTING"}>موجة بالمستخدم</option>
        <option value={"READER"}>موجة بالمحتوي</option>
      </select>

      <button
        disabled={loading}
        className={`btn btn-neutral bg-primary text-white font-tajawal font-thin text-2xl inline-block px-10 rounded-full border-none outline-none hover:bg-secondary ${
          loading && "opacity-50 cursor-not-allowed"
        }  `}
      >
        {loading ? (
          <span className="loading loading-dots loading-md text-primary"></span>
        ) : (
          "اضافة"
        )}
      </button>
    </form>
  );
};

export default AddUserForm;
