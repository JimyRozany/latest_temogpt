// import prisma from "../../../../utils/db.js";
// import bcrypt from "bcryptjs";
import { registerSchema } from "../../../../utils/validationSchemas";
import prisma from "../../../../utils/db";
import bcrypt from "bcryptjs";
/**
 * @method POST
 * @url ~/api/users/register
 * @desc register or create new user by admin
 * @access private // only admin can create new user
 */

// const bcrypt = require('bcryptjs');

export async function POST(request) {
  try {
    const requestData = await request.json();
    // validation

    const validation = registerSchema.safeParse(requestData);
    if (!validation.success) {
      return Response.json(
        {
          error: validation.error.errors[0].path,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }
    // check the email exists in database or not
    const user = await prisma.user.findUnique({
      where: { email: requestData.email },
    });
    if (user) {
      return Response.json(
        { message: "email already exists" },
        { status: 400 }
      );
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(requestData.password, salt);
    if (requestData.role !== "" || requestData.role === null) {
      await prisma.user.create({
        data: {
          username: requestData.username,
          email: requestData.email,
          password: hashedPassword,
          role: requestData.role,
          Score: {
            create: [{ html: false, php: false, programming: false }],
          },
        },
        include: {
          Score: true,
        },
      });
      // return success message
      return Response.json(
        { message: "user registered successfully" },
        { status: 201 }
      );
    }
    // create new user in database
    await prisma.user.create({
      data: {
        username: requestData.username,
        email: requestData.email,
        password: hashedPassword,
        Score: {
          create: [{ html: false, php: false, programming: false }],
        },
      },
      include: {
        Score: true,
      },
    });
    // return success message
    return Response.json(
      { message: "user registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error ", error },
      { status: 500 }
    );
  }
}
