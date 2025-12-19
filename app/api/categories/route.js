import prisma from "../../../utils/db";
import { createCategorySchema } from "../../../utils/validationSchemas";


/**
 * @method GET
 * @url ~/api/categories
 * @desc get all categories
 * @access private  // authenticated user use endpoint
 */

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return Response.json(
      { message: "request success", data: categories },
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
 * @url ~/api/categories
 * @desc create new category
 * @access private  // authenticated user use endpoint
 */

export async function POST(request) {
  try {
    const reqData = await request.json();

    // validation on the data from request
    const validation = createCategorySchema.safeParse(reqData);

    if (!validation.success) {
      return Response.json(
        {
          error: validation.error.errors[0].path,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name: reqData.name,
      },
    });

    return Response.json(
      { message: "category created successfully", data: newCategory },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
