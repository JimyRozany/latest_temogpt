import prisma from "../../../../utils/db";
export async function GET(req, { params }) {
  const { categoryId } = await params;

  const passDegree = await prisma.passingDegree.findUnique({
    where: {
      categoryId: parseInt(categoryId),
    },
  });
  if (!passDegree) {
    const passDegree = await prisma.passingDegree.create({
      data: {
        degree: 0,
        categoryId: parseInt(categoryId),
      },
    });
    return Response.json(
      { message: "request success", data: passDegree },
      { status: 200 }
    );
  }
  return Response.json(
    { message: "request success", data: passDegree },
    { status: 200 }
  );
}
