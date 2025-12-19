import LogoutBtn from "../../../components/LogoutBtn";
import Link from "next/link";
import { RiMenuFold4Line } from "react-icons/ri";
import { PiCrownSimpleFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineArticle } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { SiQuizlet } from "react-icons/si";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full p-6 flex items-start gap-2">
      <div className="drawer lg:drawer-open w-60  rounded overflow-hidden z-50">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  fixed top-10 left-0 ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn bg-primary hover:bg-secondary text-white drawer-button lg:hidden "
          >
            <RiMenuFold4Line />
          </label>
        </div>
        <div className="drawer-side -left-10  border-none w-[calc(100vw_+_40px)]">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay lg:hidden border-none"
          ></label>
          <ul className="menu bg-mainGray text-white w-80  p-4 min-h-full  ">
            {/* Sidebar content here */}
            <Link href="/">
              <div className="flex items-center bg-white w-min px-4 rounded">
                <PiCrownSimpleFill className="text-3xl text-primary" />
                <span className="text-secondary font-medium">TemoGPT</span>
              </div>
            </Link>
            <li className="text-xl font-medium ">
              <Link href="/dashboard">
                <FaUsers className="text-white text-xl" /> Users
              </Link>
            </li>
            <li className="text-xl font-medium ">
              <Link href="/dashboard/content">
                <MdOutlineArticle /> content
              </Link>
            </li>
            <li>
              <div className="dropdown dropdown-hover dropdown-bottom ">
                <div
                  tabIndex={0}
                  role="button"
                  className=" m-1 bg-transparent cursor-pointer "
                >
                  <Link
                    href="/dashboard/quizzes"
                    className="flex items-center gap-1 text-xl"
                  >
                    <SiQuizlet /> Quizzes
                  </Link>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content text-gray-900  font-semibold menu bg-base-100 rounded-box  z-20  w-52 p-1 shadow gap-2 "
                >
                  <li className="text-[12px]">
                    <Link href="/dashboard/quizzes/optional-questions">
                      Optional questions
                    </Link>
                  </li>
                  <li className="text-[12px]">
                    <Link href="/dashboard/quizzes/short-answer-questions">
                      Short answer questions
                    </Link>
                  </li>
                  <li className="text-[12px]">
                    <Link href="/dashboard/quizzes/correction-questions">
                      Correcting questions
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <div className="text-2xl font-medium ">
                <LogoutBtn className="border-none text-white  bg-transparent text-xl duration-300" />
                <IoIosLogOut />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className=" w-full rounded "> {children} </div>
    </div>
  );
};

export default DashboardLayout;
