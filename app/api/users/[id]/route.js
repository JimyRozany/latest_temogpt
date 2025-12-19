import prisma from "../../../../utils/db";
import { updateUserSchema } from "../../../../utils/validationSchemas";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        Score: true,
      },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ data: user }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "internal server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const userId = parseInt(params?.id);
  // const userId = parseInt(data.id);
  const scoreId = parseInt(data.Score[0]?.id);

  try {
    // Old Code is work
    const updatedUser = await prisma.user.update({
      where: {
        id: userId, // Replace with the actual User ID you want to update
      },
      data: {
        username: data.username, // Update user's username
        email: data.email, // Update user's email
        role: data.role, // Update user's role
        Score: {
          update: [
            {
              where: { id: scoreId }, // Replace with the actual Score ID
              data: {
                html: data.Score[0].html, // Update Score fields
                php: data.Score[0].php,
                programming: data.Score[0].programming,
              },
            },
          ],
        },
      },
      include: {
        Score: true,
      },
    });

    // console.log("Updated User:", updatedUser);
    return Response.json(
      { message: "Updated User:", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error updating user and nested records:", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = await params.id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    // ===============
    const deleteScore = prisma.score.deleteMany({
      where: {
        userId: parseInt(id),
      },
    });

    const deleteUser = prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    const transaction = await prisma.$transaction([deleteScore, deleteUser]);
    // ========================================================================

    // const userDeleted = await prisma.user.delete({
    //   where: { id: parseInt(id) },
    // });

    return Response.json(
      { message: "user deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
