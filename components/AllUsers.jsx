"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
const AllUsers = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [users, setUsers] = useState([]);
  // get all users
  const getUsers = () => {
    axios
      .get(`${apiURL}/users/all`)
      .then((res) => {
        setUsers(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (confirm("هل انت متاكد من حدف هذا المستخدم")) {
      try {
        await axios.delete(`${apiURL}/users/${id}`);
        getUsers();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {users !== null ? (
        <table
          className="table table-xs sm:table-sm md:table-md lg:table-lg"
          dir="rtl"
        >
          {/* head */}
          <thead>
            <tr className="bg-base-100 text-xl font-medium">
              <th>#</th>
              <th>الاسم</th>
              <th>البريد الالكتروني</th>
              <th>اقسام تم تعلمها</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                className={`${
                  index % 2 == 0 ? "bg-base-200" : ""
                } text-xl font-medium `}
                key={index}
              >
                <th>{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                {/* TODO : create three checkbox  and save button */}
                <td>
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
                        disabled
                        checked={user?.Score[0]?.programming}
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
                        disabled
                        checked={user?.Score[0]?.html}
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
                        disabled
                        checked={user?.Score[0]?.php}
                      />
                    </label>
                  </div>
                </td>
                <td className="flex gap-2">
                  <Link
                    href={`/dashboard/edit-user/${user.id}`}
                    className="btn btn-warning  text-white"
                  >
                    تعديل
                  </Link>

                  {user.role != "ADMIN" && (
                    <button
                      className="btn btn-error text-white"
                      onClick={(e) => handleDelete(e, user.id)}
                    >
                      حدف
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-3xl mt-10">users not found</h1>
      )}
    </>
  );
};

export default AllUsers;
