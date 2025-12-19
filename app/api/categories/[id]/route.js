import prisma from "../../../../utils/db";

export async function GET(res, { params }) {
  const id = params.id;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      return Response.json({ message: "Category not found" }, { status: 404 });
    }
    return Response.json(
      { message: "Request success", data: category },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(res, { params }) {
  const id = params.id;
  try {
    const deleteArticles = prisma.article.deleteMany({
      where: {
        categoryId: parseInt(id),
      },
    });

    const deleteCategory = prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    const transaction = await prisma.$transaction([
      deleteArticles,
      deleteCategory,
    ]);
    return Response.json(
      { message: "Delete category success" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
