/**
 * @method GET
 * @URL ~/api/users/me
 * @desc get user authenticated
 * @access public
 */

import jwt from "jsonwebtoken";
import prisma from "../../../../utils/db";
export async function GET(request) {
  try {
    const cookie = request.cookies.get("auth-token");
    const token = cookie?.value;
    if (!token) {
      return Response.json(
        {
          message: "token not found",
        },
        { status: 404 }
      );
    }
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    // const user = await prisma.user.findUnique({
    //   where: { id: parseInt(payload.id) },
    // });
    return Response.json(
      {
        user: payload,
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
