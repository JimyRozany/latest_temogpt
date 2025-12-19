import prisma from "../../../../utils/db";

export async function POST(request) {
  const data = await request.json();
  //   return Response.json({ message: "success", data }, { status: 200 });

  // store the data in the database
  try {
    const userAnser = await prisma.userShortAnswer.create({
      data: {
        answer: data.answer,
        userId: data.userId,
        categoryId: Number(data.categoryId),
        questionShortId: data.questionShortId,
      },
    });
    return Response.json({ message: "success", userAnser }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}

/**
 * model UserShortAnswer {
  id              Int                 @id @default(autoincrement())
  answer          String
  userId          Int
  user            User                @relation(fields: [userId], references: [id])
  categoryId      Int
  category        Category            @relation(fields: [categoryId], references: [id])
  questionShortId Int
  questionShort   QuestionShortAnswer @relation(fields: [questionShortId], references: [id])
}

 */
