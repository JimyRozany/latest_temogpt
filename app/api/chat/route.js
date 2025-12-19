import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    // system: "You are a helpful assistant.",
    system:
      "You are a programming assistant. You only answer programming-related questions. You respond in Arabic if the user's question is in Arabic and in English if the question is in English. Politely refuse to answer non-programming-related questions.",
    messages,
  });

  // console.log(result.toDataStreamResponse());
  return result.toDataStreamResponse();
}

// ------------------------------------------------------------

// export async function POST(req) {
//   const { prompt } = await req.json();

//   if (!prompt) {
//     return Response.json({ message: "Prompt is required" }, { status: 400 });
//   }

//   try {
//     //It doesn't answer anything other than programming
//     const res = await openai.chat.completions.create({
//       messages: [
//         // {
//         //   role: "system",
//         //   content:
//         //     "You are a programming assistant. You only answer questions related to programming, coding, and software development. Politely refuse to answer questions that are not related to programming.",
//         // },
//         {
//           "role": "system",
//           "content": "You are a programming assistant. You only answer programming-related questions. You respond in Arabic if the user's question is in Arabic and in English if the question is in English. Politely refuse to answer non-programming-related questions."
//         },
//         { role: "user", content: prompt },
//       ],
//       model: "gpt-4o-mini",
//       max_tokens: 100,
//     });
//     // // convert the response into a friendly text-stream
//     // const stream = OpenAIStream(response);
//     // //  Respond with the stream
//     // return new StreamingTextResponse(stream);

//     return Response.json(
//       { reply: res.choices[0].message.content },
//       { status: 200 }
//     );
//   } catch (error) {
//     return Response.json({ message: error.message }, { status: 500 });
//   }
// }
