import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaLaptopCode } from "react-icons/fa6";
import { FiCpu } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { PiCrownSimpleFill } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";

import { HiMenuAlt1 } from "react-icons/hi";

import { useEffect, useState } from "react";
import axios from "axios";
import LogoutBtn from "./LogoutBtn";

const NavTwo = () => {
  const pathname = usePathname();
  const [authUser, setAuthUser] = useState({});
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(`/api/users/me`)
      .then((res) => {
        // console.log(res.data.user);
        setAuthUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="navbar bg-base-100 md:px-32  h-min  flex items-center ">
      <div className="navbar-start ">
        <div className="dropdown z-10">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <HiMenuAlt1 className="text-2xl " />
          </div>
          <ul
            // tabIndex={0}
            className=" dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-semibold"
          >
            {authUser.role === "READER" || authUser.role === "ADMIN" ? (
              <li
                dir="rtl"
                className={`text-md flex items-center gap-2  hover:text-primary duration-300 text-sm  ${
                  pathname === "/" ? "text-primary" : "text-secondary"
                }`}
              >
                <FaLaptopCode className="text-2xl" />
                <Link href="/">تعلم مهارات البرمجة</Link>
              </li>
            ) : null}

            {authUser.role === "CHATTING" || authUser.role === "ADMIN" ? (
              <li dir="rtl">
                <div
                  className={`text-md flex items-center gap-2 text-secondary hover:text-primary duration-300 text-sm  ${
                    pathname === "/chat" ? "text-primary" : "text-secondary"
                  }`}
                >
                  <FiCpu className="text-xl " />
                  <Link href="/chat">تحدث مع TemoGPT</Link>
                </div>
              </li>
            ) : null}
            <li
              dir="rtl"
              className={`text-md flex items-center gap-2   hover:text-primary duration-300 text-sm ${
                pathname === "/quiz" ? "text-primary" : "text-secondary"
              }`}
            >
              <HiOutlineLightBulb className="text-2xl" />
              <Link href="/quiz">اختبر نفسك</Link>
            </li>
          </ul>
        </div>
        {/* logo */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <PiCrownSimpleFill className="text-3xl md:text-4xl lg:text-6xl text-primary " />
            <span className="text-xl md:text-2xl text-secondary font-bold">
              TemoGPT
            </span>
          </div>
        </Link>
      </div>
      {/* nav links when large and medium screens */}
      <div className="navbar-center hidden lg:flex ">
        <ul className="flex items-center gap-3 px-1  ">
          <li
            dir="rtl"
            className={`text-xl flex items-center gap-2  hover:text-primary duration-300 ${
              pathname === "/quiz" ? "text-primary" : "text-secondary"
            }`}
            // onClick={handleClick}
          >
            <HiOutlineLightBulb className="text-2xl" />
            <Link href="/quiz">اختبر نفسك</Link>
          </li>
          {authUser.role === "CHATTING" || authUser.role === "ADMIN" ? (
            <li
              dir="rtl"
              className={`text-xl flex items-center gap-2  hover:text-primary duration-300 ${
                pathname === "/chat" ? "text-primary" : "text-secondary"
              }`}
            >
              <FiCpu className="text-2xl" />
              <Link href="/chat">تحدث مع TemoGPT</Link>
            </li>
          ) : null}
          {authUser.role === "READER" || authUser.role === "ADMIN" ? (
            <li
              dir="rtl"
              className={`text-xl flex items-center gap-2  hover:text-primary duration-300 ${
                pathname === "/" ? "text-primary" : "text-secondary"
              }`}
            >
              <FaLaptopCode className="text-2xl" />
              <Link href="/">تعلم مهارات البرمجة</Link>
            </li>
          ) : null}
        </ul>
      </div>
      {/* profile button */}
      <div className="navbar-end ">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1 cursor-pointer">
            <FaRegUserCircle className="text-2xl text-primary" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
          >
            <li className="hover:text-primary duration-300">
              <Link href="/profile">Profile</Link>
            </li>
            {authUser.role === "ADMIN" ? (
              <li className="hover:text-primary duration-300">
                <Link href="/dashboard">Dashboard</Link>
              </li>
            ) : null}
            <li>
              <LogoutBtn
                className={
                  "bg-transparent text-sm hover:text-primary duration-300 border-none"
                }
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavTwo;
