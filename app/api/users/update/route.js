import prisma from "../../../../utils/db";
import { updateUserSchema } from "../../../../utils/validationSchemas";


/**
 * @method POST
 * @url ~/api/users/update
 * @desc update user
 * @access private // only admin can update user
 */

export async function PUT(request) {
  try {
    const requestData = await request.json();
    const { id } = parseInt(requestData.id);
    // validate data from request
    const validation = updateUserSchema.safeParse(requestData);
    if (!validation.success) {
      return Response.json(
        {
          error: validation.error.errors[0].path,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }
    // update user
    await prisma.user.update({
      where: {
        id: id,
      },
      data: requestData,
    });
    return Response.json(
      { message: "updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error ", error },
      //   { message: error },
      { status: 500 }
    );
  }

 
}
