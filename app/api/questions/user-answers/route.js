import prisma from "../../../../utils/db";

export async function POST(req) {
  const { categoryId, userId } = await req.json();
  try {
    const data = await prisma.userShortAnswer.findMany({
      where: { categoryId: parseInt(categoryId), userId: parseInt(userId) },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        questionShort: {
          select: {
            question: true,
            degree: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return Response.json({ message: "request success", data }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
