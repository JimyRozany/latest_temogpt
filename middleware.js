import { authMiddleware } from "@/middleware/auth";

export const config = {
  matcher: ["/", "/chat", "/quiz", "/profile", "/dashboard/:path*"],
};

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // السماح بصفحة login بدون Token
  if (pathname === "/login") return NextResponse.next();

  // تطبيق Middleware
  return authMiddleware(["ADMIN", "STUDENT", "CHAT_STUDENT"])(req);
}
