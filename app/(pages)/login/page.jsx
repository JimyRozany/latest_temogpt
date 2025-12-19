import { PiCrownSimpleFill } from "react-icons/pi";
import LoginForm from "../../../components/LoginForm";

const LoginPage = () => {
  return (
    <div className=" flex justify-center h-[100vh]">
      <div className="flex flex-col md:justify-center items-center ">
        <div className="">
          <PiCrownSimpleFill className="text-9xl text-primary" />
        </div>
        <h2 className="text-6xl text-secondary font-extrabold">TemoGPT</h2>
        <h2 className={`text-2xl  `}>تسجيل الدخول</h2>

        {/* form  */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
