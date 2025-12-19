/**
 * endpoint for store the short answer question
 * endpoint for edit and delete
 *
 */

import prisma from "../../../utils/db";

export async function GET() {
  try {
    // const questions = await prisma.q.findMany();
    const questions = await prisma.questionShortAnswer.findMany();
    return Response.json(
      { message: "Request successful", data: questions },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const data = await request.json();
  // store the question in the database
  try {
    // const question = await prisma.q.create();
    const question = await prisma.questionShortAnswer.create({
      data: {
        question: data.question,
        categoryId: Number(data.categoryId),
        degree: Number(data.degree),
      },
    });
    return Response.json(
      { message: "question added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
