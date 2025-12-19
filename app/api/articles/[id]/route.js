import prisma from "../../../../utils/db";
// import { updateArticleSchema } from "@/utils/validationSchemas";

/**
 * @method GET
 * @url ~/api/articles/:id
 * @desc get one article by id
 * @access private  // authenticated user use endpoint
 */

export async function GET(req, { params }) {
  try {
    const id = await params.id;
    if (!params.id)
      return Response.json({ message: "id is required" }, { status: 400 });
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });
    if (!article) {
      return Response.json({ message: "article not found" }, { status: 404 });
    }
    return Response.json(
      { message: "request success", article: article },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

/**
 * @method PUT
 * @url ~/api/articles/:id
 * @desc update article
 * @access private  // authenticated user use endpoint
 */
export async function PUT(req, { params }) {
  const { id } = await params;
  const { title, body, categoryId, userId } = await req.json();
  try {
    // await updateArticleSchema.validate({ title, body, userId ,categoryId });
    await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title,
        body,
        updatedAt: new Date(),
        userId: userId,
        categoryId: parseInt(categoryId),
      },
    });
    return Response.json(
      { message: "article updated success" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

/**
 * @method DELETE
 * @url ~/api/articles/:id
 * @desc Delete article
 * @access private  // authenticated user use endpoint
 */

export async function DELETE(req, { params }) {
  try {
    const id = await params.id;
    if (!params.id)
      return Response.json({ message: "id is required" }, { status: 400 });
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });

    return Response.json(
      { message: "article deleted success" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
