import prisma from "../../../../utils/db";

export async function GET() {
  try {
    const passDegrees = await prisma.passingDegree.findMany({
      include: {
        category: true,
      },
    });
    return Response.json(
      { message: "request success", passDegrees },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const data = await req.json();
  try {
    const passDegree = await prisma.passingDegree.create({
      data: {
        degree: parseInt(data.degree),
        categoryId: parseInt(data.categoryId),
      },
    });
    return Response.json(
      { message: "added successfully", passDegree },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const data = await req.json();

  // return Response.json(
  //   { message: "updated successfully", data },
  //   { status: 200 }
  // );

  try {
    const passDegree = await prisma.passingDegree.update({
      where: {
        categoryId: parseInt(data.categoryId),
      },
      data: {
        degree: parseInt(data.degree),
        categoryId: parseInt(data.categoryId),
      },
    });

    return Response.json(
      { message: "updated successfully", data: passDegree },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
