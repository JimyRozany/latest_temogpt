import { cookies } from "next/headers";

export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore?.delete("auth-token");

  return Response.json({ message: "clear Cookies success" }, { status: 200 });
}
