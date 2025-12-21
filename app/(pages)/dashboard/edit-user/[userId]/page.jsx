"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";

const EditUser = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((res) => {
        console.log(res.data.data);
        setUser(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);

    // call api to send data
    try {
      setLoading(true);
      const res = await axios.put(`/api/users/${userId}`, user);

      // console.log(res);
      toast.success("تم تحديث البيانات بنجاح ");
      router.replace("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(` ${error.response.data.message}`);
      setLoading(false);
    }
  };

  if (Object.keys(user).length == 0) {
    return (
      <div className="w-screen h-screen ">
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-secondary mt-4">Edit user</h1>
      <div className="w-1/2 mt-10 ">
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => handleSubmit(e)}
          dir="rtl"
        >
          <label className="input input-bordered flex items-center gap-2">
            <CiUser />
            <input
              type="text"
              className="grow"
              placeholder="الاسم"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
            />
          </label>
          <label className="input input-bordered   flex items-center gap-2">
            <MdEmail />
            <input
              type="email"
              className="grow"
              placeholder="البريد الالكتروني"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
            />
          </label>
          {/* <label className="input input-bordered flex items-center gap-2">
         <FaKey />
         <input
           type="text"
           className="grow"
           placeholder="كلمة المرور"
           onChange={(e) => setUser({...user , username: e.target.value})}
           value={user.username}
         />
       </label> */}

          {user.role != "ADMIN" && (
            <>
              <select
                className="select w-full max-w-xs border border-secondary"
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                defaultValue={user.role}
                defaultChecked={user.role}
              >
                <option>طريقة التعلم</option>
                <option value={"CHATTING"}>موجة بالمستخدم</option>
                <option value={"READER"}>موجة بالمحتوي</option>
              </select>

              <div className="flex items-center gap-2">
                <label
                  className="label border-none cursor-pointer flex flex-col justify-center gap-1"
                  dir="rtl"
                >
                  <div className="label-text" dir="rtl">
                    برمجة
                  </div>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    defaultChecked={user?.Score[0]?.programming}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        Score: [
                          { ...user.Score[0], programming: e.target.checked },
                        ],
                      })
                    }
                  />
                </label>
                <label
                  className="label border-none cursor-pointer flex flex-col justify-center gap-1"
                  dir="rtl"
                >
                  <div className="label-text" dir="rtl">
                    تعلم HTML
                  </div>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    defaultChecked={user?.Score[0]?.html}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        Score: [{ ...user.Score[0], html: e.target.checked }],
                      })
                    }
                  />
                </label>
                <label
                  className="label border-none cursor-pointer flex flex-col justify-center gap-1"
                  dir="rtl"
                >
                  <div className="label-text" dir="rtl">
                    تعلم PHP
                  </div>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    defaultChecked={user?.Score[0]?.php}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        Score: [{ ...user.Score[0], php: e.target.checked }],
                      })
                    }
                  />
                </label>
              </div>
            </>
          )}

          <button
            disabled={loading}
            className={`btn btn-neutral bg-primary text-white font-tajawal font-thin text-2xl inline-block px-10 rounded-full border-none outline-none hover:bg-secondary ${
              loading && "opacity-50 cursor-not-allowed"
            }  `}
          >
            {loading ? (
              <span className="loading loading-dots loading-md text-primary"></span>
            ) : (
              "حفظ"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
