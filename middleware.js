import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function middleware(request) {
  const cookieStore = await cookies();
  const token = cookieStore?.get("auth-token");
  const secretKey = process.env.JWT_SECRET;

  const pathname = request.nextUrl.pathname;
  // If the user is accessing the login page
  if (pathname === "/login") {
    if (token) {
      // Redirect users with a token away from the login page
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Allow access to the login page if no token
    return NextResponse.next();
  }
  // If the user is accessing other pages (protected routes)
  if (!token && pathname !== "/login") {
    // Redirect users without a token to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // decode the token
  const user = jwt.decode(token.value, secretKey);

  // if user not admin and need access dashboard
  if (user.role !== "ADMIN" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // if user is CHATTING not access the home page go to chat page
  if (user.role === "CHATTING" && pathname === "/") {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // Allow access if the user has a token for protected pages
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/chat", "/quiz", "/profile", "/login", "/dashboard/:path*"],
};
