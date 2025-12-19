import { createArticleSchema } from "../../../utils/validationSchemas";
import prisma from "../../../utils/db.js";
// import prisma from "@utils/db";
/**
 * @method GET
 * @url ~/api/articles
 * @desc get all articles
 * @access private  // authenticated user use endpoint
 */

// const prisma = new PrismaClient();

export async function GET() {
  try {
    const articles = await prisma.article.findMany();

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

/**
 * @method POST
 * @url ~/api/articles
 * @desc create new Article
 * @access private  // authenticated user use endpoint
 */

export async function POST(request) {
  const reqData = await request.json();
  // return Response.json(
  //   { message: "article created successfully", reqData },
  //   { status: 201 }
  // );
  try {
    // validation on the data from request
    const validation = createArticleSchema.safeParse(reqData);

    if (!validation.success) {
      return Response.json(
        {
          error: validation.error.errors[0].path,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const newArticle = await prisma.article.create({
      data: {
        title: reqData.title,
        body: reqData.body,
        userId: reqData.userId,
        categoryId: parseInt(reqData.categoryId),
      },
    });

    return Response.json(
      { message: "article created successfully", data: newArticle },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error, reqData },
      // { message:error },
      { status: 500 }
    );
  }
}
