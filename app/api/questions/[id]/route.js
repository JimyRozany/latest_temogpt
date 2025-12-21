import prisma from "../../../../utils/db";

export async function GET(request,  context) {

 const { params } = context;   // params = Promise
  const { id } = await params;  // ✅ فك الـ Promise


  try {
    const question = await prisma.questionShortAnswer.findUnique({
      where: { id: Number(id) },
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
    const updatedQuestion = await prisma.questionShortAnswer.update({
      where: { id: Number(id) }, // Replace with your question ID
      data: {
        question: data.question,
        categoryId: Number(data.categoryId),
        degree: Number(data.degree),
      },
    });
    return Response.json(
      {
        message: "Question updated successfully",
        data: updatedQuestion,
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
    if (!id) {
      return Response.json({ message: "id is required" }, { status: 400 });
    }

    const question = await prisma.questionShortAnswer.delete({
      where: { id: Number(id) },
    });

    return Response.json(
      { message: "Question deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to delete question", error },
      { status: 500 }
    );
  }
}
