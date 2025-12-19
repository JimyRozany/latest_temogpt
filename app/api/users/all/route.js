import prisma from "../../../../utils/db";

/**
 * @method GET
 * @url ~/api/users/all
 * @desc get all users
 * @access private  // only admin can get users
 */

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        Score: true,
      },
    });
    return Response.json(
      { message: "request success", data: users },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error ", error },
      { status: 500 }
    );
  }
}
