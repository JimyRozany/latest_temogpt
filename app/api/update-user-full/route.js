import prisma from "../../../utils/db";
export async function PUT(request) {
  try {
    const requestData = await request.json();
    const users = await prisma.user.findMany({
      include: {
        Score: true,
      },
    });
    return Response.json(
      { message: "req success", data: users },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "req failed", error }, { status: 200 });
  }
}
