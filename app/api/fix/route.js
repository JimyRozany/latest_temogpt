import { serialize } from "cookie";
export async function GET(req) {
  const cookie = serialize("auth-token", "mytoken", {
    httpOnly: true,
    secure: false, //development=http , production=https
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return Response.json(
    { message: "Hello from app.js" },
    {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
      },
    }
  );
}
