// src/app/api/admin/attempts/[id]/finalize/route.js
import { finalizeAttempt } from "@/services/finalizeAttempt.service";

export async function POST(req, { params }) {
  const attemptId = Number(params.id);

  const result = await finalizeAttempt(attemptId);

  return Response.json(result);
}
