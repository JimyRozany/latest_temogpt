"use client";
import NavTwo from "../components/NavTwo";
import { usePathname } from "next/navigation";

// import NavTwo from "@/components/nav2/NavTwo";

const LayoutProvider = ({ children }) => {
  const pathname = usePathname();

  if (pathname === "/login" || pathname.startsWith("/dashboard")) {
    return <>{children}</>;
  }

  return (
    <>
      {/* <Navbar /> */}
      <NavTwo />
      {children}
    </>
  );
};

export default LayoutProvider;
