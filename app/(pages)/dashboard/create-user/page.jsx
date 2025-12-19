import AddUserForm from "../../../../components/AddUserForm";
import Link from "next/link";

import { FaArrowLeftLong } from "react-icons/fa6";
const CreateUser = () => {
  return (
    <div className="w-full  p-5 flex justify-center">
      <div className="container ">
        <div className="flex items-center gap-2 hover:gap-4 transition-all ease-in-out duration-300">
          <FaArrowLeftLong />
          <Link href={"/dashboard/create-user"}>back</Link>
        </div>
        <h1 className="text-center text-2xl font-semibold text-secondary">
          اضافة مستخدم جديد
        </h1>
        <div className="mt-4 flex justify-center w-full border border-mainGray p-2 rounded">
          <div className="w-96">
            <AddUserForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
