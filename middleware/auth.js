import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";

export const authMiddleware = (allowedRoles = []) => {
  return (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;

    // لو مفيش Token
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const user = verifyToken(token);
    if (!user) return NextResponse.redirect(new URL("/login", req.url));

    // تحقق من Roles
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // كل حاجة تمام
    req.user = user;
    return NextResponse.next();
  };
};
