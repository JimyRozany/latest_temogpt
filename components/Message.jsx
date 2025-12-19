import Image from "next/image";

import avatarUser from "../public/avatar-user.png";
import avatarAi from "../public/avatar-ai.png";
const Message = ({ message, role, time, user }) => {
  const detectLanguage = (input) => {
    if (/[\u0600-\u06FF]/.test(input)) {
      return "Arabic";
    } else if (/[\u0041-\u007A]/i.test(input)) {
      return "English";
    } else {
      return "Unknown";
    }
  };
  const language = detectLanguage(message);

  return (
    <div
      className="w-full  flex gap-2 mt-2"
      dir={role === "user" ? "ltr" : "rtl"}
    >
      {/* user image  */}
      <div className="rounded-full object-cover overflow-hidden w-10 h-10  md:w-16 md:h-16 ">
        <Image
          src={role === "user" ? avatarUser : avatarAi}
          alt="user photo"
          className="w-full h-full "
        />
      </div>
      {/* user name & time & question */}
      <div className=" w-11/12">
        <div className="flex items-center gap-2 md:mt-5">
          <h1 className="text-secondary  text-sm md:text-xl font-medium ">
            {role === "user" ? user.username : "TemoGPT"}
          </h1>
          <p dir="ltr" className="text-mainGray text-sm md:text-md">
            {time}
          </p>
        </div>
        <div
          dir={language === "Arabic" ? "rtl" : "ltr"}
          className={`text-mainGray text-sm md:text-lg font-bold ${
            role === "user" ? "bg-blue-50" : "bg-green-300"
          } p-2 rounded-xl`}
        >
          <pre className="text-wrap">{message}</pre>
        </div>
      </div>
    </div>
  );
};

export default Message;
