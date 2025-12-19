"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteBtn = ({ user }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const result = confirm(`are you sur delete ${user.username} ?`);
      if (result) {
        await axios.delete(`http://localhost:3000/api/users/${user.id}`);
        toast.success("user deleted successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  return (
    <button
      className="btn bg-red-600 text-white text-xl font-medium hover:text-red-"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteBtn;
