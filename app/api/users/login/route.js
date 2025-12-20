import prisma from "../../../../utils/db";
import bcrypt from "bcryptjs";
import { loginSchema } from "../../../../utils/validationSchemas";

import { setCookie } from "../../../../utils/generateToken";

/**
 * @method POST
 * @url ~/api/users/login
 * @desc login
 * @access public // any user can try login
 */

export async function POST(request) {
  try {
    const requestData = await request.json();

    const validation = loginSchema.safeParse(requestData);
    if (!validation.success) {
      return Response.json(
        {
          error: validation.error.errors[0].path,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username: requestData.username },
    });

    if (!user) {
      return Response.json(
        { message: "username or password incorrect" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      requestData.password,
      user.password
    );

    if (!isPasswordValid) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const cookie = setCookie({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    return Response.json(
      { message: "login successful" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
