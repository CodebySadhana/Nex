import OpenAI from "openai";
import type { ContentRequest, ContentResponse } from "@/types/content";
import { aiOutputSchema, type AiOutput } from "@/lib/validation";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/ai/prompts";
import { generateMockOutput } from "@/lib/ai/mock";
import { formatLinkedIn } from "@/lib/formatters/linkedin";
import { formatXThread } from "@/lib/formatters/x";
import { formatReddit } from "@/lib/formatters/reddit";

/**
 * AI provider abstraction. Server-side only — API keys never reach the client.
 * Works with OpenAI or any OpenAI-compatible provider via OPENAI_BASE_URL.
 * Falls back to a clearly-labeled mock when no key is configured, so the
 * app runs end-to-end with zero setup.
 */

const DEFAULT_MODEL = "gpt-4o-mini";

export class GenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GenerationError";
  }
}

export function isAiConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function generateContent(request: ContentRequest): Promise<ContentResponse> {
  if (!isAiConfigured()) {
    return toContentResponse(generateMockOutput(request), { mock: true });
  }

  const output = await callModel(request);
  return toContentResponse(output, { mock: false });
}

async function callModel(request: ContentRequest): Promise<AiOutput> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || undefined,
  });

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    temperature: 0.8,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(request) },
    ],
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new GenerationError("The model returned an empty response.");
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    throw new GenerationError("The model returned malformed JSON.");
  }

  const result = aiOutputSchema.safeParse(parsedJson);
  if (!result.success) {
    throw new GenerationError("The model response did not match the expected shape.");
  }

  return result.data;
}

function toContentResponse(output: AiOutput, options: { mock: boolean }): ContentResponse {
  return {
    linkedin: formatLinkedIn(output.linkedin),
    x: formatXThread(output.x),
    reddit: formatReddit(output.reddit),
    generatedAt: new Date().toISOString(),
    ...(options.mock ? { mock: true } : {}),
  };
}
