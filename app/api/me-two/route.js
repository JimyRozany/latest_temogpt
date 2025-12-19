/**
 * @method GET
 * @URL ~/api/users/me
 * @desc get user authenticated
 * @access public
 */

import jwt from "jsonwebtoken";
import prisma from "../../../utils/db";
import { cookies } from "next/headers";
export async function GET(request) {
  try {
    const cookie = await cookies();
    const token = cookie?.get("auth-token").value;
    if (!token) {
      return Response.json(
        {
          message: "token not found",
        },
        { status: 404 }
      );
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      include: {
        Score: true,
      },
    });
    return Response.json(
      {
        user: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Internal server error",
        error: error,
      },
      { status: 500 }
    );
  }
}
