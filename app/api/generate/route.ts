import { NextResponse } from "next/server";
import { contentRequestSchema } from "@/lib/validation";
import { generateContent, GenerationError } from "@/lib/ai/provider";

/**
 * POST /api/generate
 * Body: { topic: string, audience: string, tone: Tone }
 * Returns: ContentResponse (see types/content.ts)
 *
 * All input is untrusted and validated with Zod before touching the AI layer.
 * Error responses never leak provider internals.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = contentRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const content = await generateContent(parsed.data);
    return NextResponse.json(content);
  } catch (error) {
    console.error("[api/generate] generation failed:", error);
    const message =
      error instanceof GenerationError
        ? "The AI returned an unexpected response. Please try again."
        : "Content generation failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
