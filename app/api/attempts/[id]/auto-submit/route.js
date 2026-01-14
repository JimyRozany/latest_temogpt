// src/app/api/attempts/[id]/auto-submit/route.js
import { autoSubmitIfExpired } from "@/services/autoSubmit.service";

export async function POST(req, { params }) {
  const attemptId = Number(params.id);

  await autoSubmitIfExpired(attemptId);

  return Response.json({ message: "Checked" });
}
