import prisma from "../../../../utils/db";


/**
 * @method GET
 * @url ~/api/articles/articles-by-category
 * @desc get all articles by category id
 * @access private  // authenticated user use endpoint
 */

export async function POST(request) {
  try {
    const reqData = await request.json();
    const categoryId = parseInt(reqData.categoryId);

    const articles = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        articles: true, // All articles where categoryId
      },
    });

    return Response.json(
      { message: "request success", data: articles },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
