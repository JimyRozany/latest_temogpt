import Link from "next/link";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import DeleteBtn from "../../../components/DeleteBtn";
import AllUsers from "../../../components/AllUsers";

const DashboardPage = async () => {
  // const api_url = process.env.API_URL;
  // const response = await axios.get(`${api_url}/users/all`);
  // const users = response.data.data;
  // if (!response.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  return (
    <div className="w-full  p-2 flex justify-center">
      <div className="container ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-secondary">
            جميع المستخدمين
          </h1>
          <Link
            href={"/dashboard/create-user"}
            className="flex items-center gap-2 hover:gap-4 duration-300 ease-in-out font-medium"
          >
            <span>اضافة طالب جديد</span>

            <FaArrowRight />
          </Link>
        </div>
        <div className="h-[calc(100vh_-_100px)]  overflow-y-auto ">
          {/* client component to fetch users */}
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
