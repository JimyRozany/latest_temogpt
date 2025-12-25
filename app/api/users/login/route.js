import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/utils/validationSchemas";
import { setCookie } from "@/utils/auth";

export async function POST(req) {
  try {
    const data = await req.json();

    const validation = loginSchema.safeParse(data);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ message: validation.error.errors[0].message }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { username: data.username } });
    if (!user) return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });

    const cookie = setCookie({ id: user.id, username: user.username, email: user.email, role: user.role });

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), { status: 500 });
  }
}
