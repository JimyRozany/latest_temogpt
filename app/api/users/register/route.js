import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/utils/validationSchemas";
import { authMiddleware } from "@/middleware/auth";

export async function POST(req) {
  // تحقق من صلاحيات الأدمن
  const authResp = authMiddleware(["ADMIN"])(req);
  if (authResp instanceof Response) return authResp;

  try {
    const data = await req.json();
    const validation = registerSchema.safeParse(data);
    if (!validation.success) {
      return new Response(JSON.stringify({ message: validation.error.errors[0].message }), { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) return new Response(JSON.stringify({ message: "Email already exists" }), { status: 400 });

    const hashed = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: { username: data.username, email: data.email, password: hashed, role: data.role || "STUDENT" },
    });

    return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), { status: 500 });
  }
}
