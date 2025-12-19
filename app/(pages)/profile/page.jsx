"use client";
import { FiCpu } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import axios from "axios";
import { useEffect, useState } from "react";
const ProfilePage = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState("");
  const [scoreRen, setScoreRen] = useState(0);
  const [loading, setLoading] = useState(false);

  // calculate score
  const calculateScore = (user) => {
    if (!user) return 0;
    console.log("this message in calc method ");
    let totalScore = 0;
    Object.keys(user?.Score[0]).forEach((key) => {
      if (key == "php" || key == "html" || key == "programming") {
        const value = user.Score[0][key];
        if (value == true) {
          totalScore += 33;
        }
      }
    });
    setScoreRen(totalScore);
  };

  const getAuthUser = async () => {
    setLoading(true);
    const response = await axios.get(`${apiURL}/me-two`);

    setUser(response.data.user);
    calculateScore(response.data.user);
    setLoading(false);
  };

  useEffect(() => {
    getAuthUser();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (!user) return null;
  return (
    <div className="h-[calc(100vh_-_50px)] overflow-scroll">
      {/* user info */}
      <div className="flex flex-col items-center ">
        <FaRegUserCircle className="text-4xl md:text-8xl text-primary my-1" />
        <h3
          className="text-xl md:text-3xl text-secondary font-bold mb-1"
          dir="rtl"
        >
          الطالب : {user.username}
        </h3>
        <p className=" text-sm md:text-md font-medium text-primary">
          الصف الثاني الثانوي
        </p>
      </div>
      {/* user class */}
      <div className="flex flex-col items-center gap-5 my-2">
        {user.role === "READER" ? (
          <div dir="rtl" className="flex items-center gap-2 text-mainGray">
            <FaLaptopCode className="text-2xl" />
            <h3 className="text-xl ">تعلم مهارات البرمجة</h3>
          </div>
        ) : user.role === "CHATTING" ? (
          <div dir="rtl" className="flex items-center gap-2 text-mainGray">
            <FiCpu className="text-2xl" />
            <h3 className="text-xl ">تحدث مع TemoGPT</h3>
          </div>
        ) : null}

        {/* three buttons */}
        <div className=" flex items-center gap-4">
          <div className="indicator shadow-md rounded-lg">
            {user?.Score[0]?.php && (
              <IoMdCheckmarkCircleOutline className="indicator-item text-xl md:text-3xl text-primary" />
            )}
            <button
              dir="rtl"
              className="border border-mainGray text-mainGray text-md font-medium px-4 py-2 rounded-lg"
            >
              لغة PHP
            </button>
          </div>
          <div className="indicator shadow-md rounded-lg">
            {user?.Score[0]?.html && (
              <IoMdCheckmarkCircleOutline className="indicator-item text-xl md:text-3xl text-primary" />
            )}

            <button
              dir="rtl"
              className="border border-mainGray text-mainGray text-md font-medium px-4 py-2 rounded-lg"
            >
              لغة HTML
            </button>
          </div>
          <div className="indicator shadow-md rounded-lg">
            {user?.Score[0]?.programming && (
              <IoMdCheckmarkCircleOutline className="indicator-item text-xl md:text-3xl text-primary" />
            )}

            <button className="border border-mainGray text-mainGray text-md font-medium px-4 py-2 rounded-lg">
              البرمجة
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Gauge Component --> */}
      <div className=" flex justify-center mt-6  ">
        <div className="border border-mainGray p-2 w-60 rounded-md">
          {/* title */}
          <div className="w-full flex justify-end items-center gap-1 ">
            <h1 className="text-mainGray text-sm md:text-xl">مؤشر الاداء </h1>
            <div className="h-2 w-2 md:h-3 md:w-3 bg-primary rounded"></div>
          </div>

          {/* <!-- Gauge Component --> */}
          <div className="relative size-32 md:size-40">
            <svg
              className="rotate-[135deg] size-full"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <!-- Background Circle (Gauge) --> */}
              {/* <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200" strokeWidth="1.5" strokeDasharray="75 100" strokeLinecap="round"></circle> */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-primary/30 opacity-45 shadow-md "
                strokeWidth="1"
                strokeDasharray="75 100"
                strokeLinecap="round"
              ></circle>

              {/* <!-- Gauge Progress --> */}
              {/* <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600" strokeWidth="1.5" strokeDasharray="37.5 100" strokeLinecap="round"></circle> */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-primary"
                strokeWidth="1.5"
                // strokeDasharray={`${calculateScore()} 100`}
                strokeDasharray={`${scoreRen} 100`}
                strokeLinecap="round"
              ></circle>
            </svg>

            {/* <!-- Value Text --> */}
            <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-xl md:text-4xl font-bold text-blue-600">
                {/* {calculateScore()}% */}
                {scoreRen}%
              </span>
              <span className="text-blue-600 block font-medium">نقاطك</span>
            </div>
          </div>
          {/* <!-- End Gauge Component --> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
