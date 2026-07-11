import type { PlatformContent } from "@/types/content";
import { cleanText } from "@/lib/formatters/text";

/** LinkedIn: professional, story-driven, short scannable paragraphs. */
export function formatLinkedIn(raw: string): PlatformContent {
  return {
    platform: "linkedin",
    content: cleanText(raw),
  };
}
