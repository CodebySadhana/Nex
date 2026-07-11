import { z } from "zod";
import { PLATFORMS, TONES } from "@/types/content";

/**
 * All input crossing a trust boundary (form → API, API → AI, storage → UI)
 * is validated with these schemas. Treat everything as untrusted.
 */

export const contentRequestSchema = z.object({
  topic: z
    .string({ required_error: "Topic is required" })
    .trim()
    .min(3, "Topic must be at least 3 characters")
    .max(200, "Topic must be 200 characters or fewer"),
  audience: z
    .string({ required_error: "Audience is required" })
    .trim()
    .min(3, "Audience must be at least 3 characters")
    .max(120, "Audience must be 120 characters or fewer"),
  tone: z.enum(TONES, {
    errorMap: () => ({ message: "Pick a tone" }),
  }),
});

export type ContentRequestInput = z.infer<typeof contentRequestSchema>;

/** Shape we ask the AI model to return. Parsed before anything is rendered. */
export const aiOutputSchema = z.object({
  linkedin: z.string().min(1),
  x: z.array(z.string().min(1)).min(1).max(10),
  reddit: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
  }),
});

export type AiOutput = z.infer<typeof aiOutputSchema>;

const platformContentSchema = z.object({
  platform: z.enum(PLATFORMS),
  content: z.string().min(1),
});

export const contentResponseSchema = z.object({
  linkedin: platformContentSchema,
  x: platformContentSchema,
  reddit: platformContentSchema,
  generatedAt: z.string(),
  mock: z.boolean().optional(),
});

/** Validates what we read back from sessionStorage on the Results page. */
export const storedGenerationSchema = z.object({
  request: contentRequestSchema,
  response: contentResponseSchema,
});
