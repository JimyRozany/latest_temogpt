import prisma from "../../../../utils/db";

/**
 * @description Get all users in table "UserShortAnswer" by category ID
 */

export async function POST(req) {
  const { categoryId } = await req.json();

  try {
    const users = await prisma.user.findMany({
      // where: { id: 1 },
      include: {
        UserShortAnswer: {
          where: {
            categoryId: parseInt(categoryId),
          },
        },
      },
    });

    // const data = await prisma.userShortAnswer.findMany({
    //   where: { categoryId: parseInt(categoryId) ,userId : 2 },
    //   include: {
    //     user: {
    //       select: {
    //         id: true,
    //         username: true,
    //         email: true,
    //       },
    //     },
    //   },
    // });

    return Response.json(
      { message: "request success", data: users },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }

  //   return Response.json({ message: "Hello from POST" }, { status: 200 });
}
