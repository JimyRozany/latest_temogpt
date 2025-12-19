import prisma from "../../../utils/db";

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        options: true,
      },
    });
    return Response.json(
      { message: "request success", questions },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(request) {
  const data = await request.json();
  // return Response.json({ message: "data is :: ", data }, { status: 200 });

  try {
    // create a new question
    const question = await prisma.question.create({
      data: {
        question: data.question,
        answer: data.answer,
        degree: parseInt(data.degree),
        categoryId: parseInt(data.categoryId),
      },
    });

    if (
      data.options[1] === "" ||
      data.options[1] === undefined ||
      data.options[1] === null
    ) {
      const options = await prisma.option.createMany({
        data: [
          {
            name: data.options[0],
            questionId: parseInt(question.id),
          },
          {
            name: data.answer,
            questionId: parseInt(question.id),
          },
        ],
      });
    } else {
      const options = await prisma.option.createMany({
        data: [
          {
            name: data.options[0],
            questionId: parseInt(question.id),
          },
          {
            name: data.answer,
            questionId: parseInt(question.id),
          },
          {
            name: data.options[1],
            questionId: parseInt(question.id),
          },
          {
            name: data.options[2],
            questionId: parseInt(question.id),
          },
        ],
      });
    }
    return Response.json(
      { message: "question added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
