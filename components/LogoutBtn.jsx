"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
const LogoutBtn = ( {className}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const handleLogout = () => {
    setLoading(true);
    axios
      .get(`${apiURL}/clear-cookie`)
      .then((res) => {
        router.replace("/login");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    // <button onClick={handleLogout} disabled={loading} className="border-none font-tajawal  hover:text-primary duration-300">
    <button onClick={handleLogout} disabled={loading} className={className}>
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        "Logout"
      )}
    </button>
  );
};

export default LogoutBtn;
