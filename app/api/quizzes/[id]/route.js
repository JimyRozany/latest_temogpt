import prisma from "../../../../utils/db";
export async function GET(request,  context) {

 const { params } = context;   // params = Promise
  const { id } = await params;  // ✅ فك الـ Promise


  try {
    const question = await prisma.question.findUnique({
      where: { id: parseInt(id) },
      include: {
        options: true,
      },
    });
    if (!question) {
      return Response.json({ message: "Question not found" }, { status: 404 });
    }
    return Response.json(
      { message: "Request success", data: question },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

export async function PUT(request,  context) {

 const { params } = context;   // params = Promise
  const { id } = await params;  // ✅ فك الـ Promise

  const data = await request.json();
  try {
    // ============== chatgpt code =============
    // Update the question
    const question = await prisma.question.update({
      where: { id: parseInt(id) },
      data: {
        question: data.question,
        answer: data.answer,
        degree: parseInt(data.degree),
        categoryId: parseInt(data.categoryId),
      },
    });

    // Handle options
    const optionUpdates = data.options.map((option, index) => ({
      where: { id: parseInt(option.id) }, // Assuming options include IDs
      data: { name: option.name, questionId: parseInt(question.id) },
    }));

    for (const optionUpdate of optionUpdates) {
      await prisma.option.update(optionUpdate);
    }

    // const question = await prisma.question.update({
    //   where: { id: parseInt(id) }, // Replace with your question ID
    //   data: {
    //     question: data.question,
    //     answer: data.answer,
    //     degree: parseInt(data.degree),
    //     categoryId: parseInt(data.categoryId),
    //   },
    // });

    // update first option
    // await prisma.option.updateMany({
    //   where: { questionId: parseInt(question.id) },
    //   data: [
    //     { name: data.options[0] },
    //     {
    //       name: data.answer,
    //       questionId: parseInt(question.id),
    //     },
    //   ],
    // });

    // if (
    //   data.options[1] === "" ||
    //   data.options[1] === undefined ||
    //   data.options[1] === null
    // ) {
    //   const options = await prisma.option.updateMany({
    //     where: { questionId: parseInt(question.id) },
    //     data: [
    //       { name: data.options[0] },
    //       {
    //         name: data.answer,
    //         questionId: parseInt(question.id),
    //       },
    //     ],
    //   });
    // } else {
    //   const options = await prisma.option.updateMany({
    //     where: { questionId: parseInt(question.id) },
    //     data: [
    //       { name: data.options[0] },
    //       {
    //         name: data.answer,
    //         questionId: parseInt(question.id),
    //       },
    //       { name: data.options[1] },
    //       { name: data.options[2] },
    //     ],
    //   });
    // }

    // ============ OLD CODE ============
    // const updatedQuestion = await prisma.question.update({
    //   where: { id: parseInt(id) }, // Replace with your question ID
    //   data: {
    //     question: data.question,
    //     answer: data.answer,
    //     degree: parseInt(data.degree),
    //     categoryId: parseInt(data.categoryId),
    //     options: {
    //       updateMany: [
    //         {
    //           where: { id: Number(data.options[0].id) }, // Option ID to update
    //           data: { name: data.options[0].name },
    //         },
    //         {
    //           where: { id: Number(data.options[1].id) }, // Option ID to update
    //           data: { name: data.options[1].name },
    //         },
    //         {
    //           where: { id: Number(data.options[2].id) }, // Option ID to update
    //           data: { name: data.options[2].name },
    //         },
    //       ],
    //       // Alternatively, use `create` or `delete` if adding/removing options
    //     },
    //   },
    //   include: {
    //     options: true,
    //   },
    // });
    return Response.json(
      {
        message: "Question updated successfully",
        // data: question,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request,  context) {

 const { params } = context;   // params = Promise
  const { id } = await params;  // ✅ فك الـ Promise



  try {
    const deleteQuestion = await prisma.question.delete({
      where: {
        id: parseInt(id),
      },
    });

    return Response.json(
      { message: "Question deleted successfully", deleteQuestion },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
