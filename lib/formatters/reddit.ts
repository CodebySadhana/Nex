import type { PlatformContent } from "@/types/content";
import { cleanText } from "@/lib/formatters/text";

/**
 * Reddit: value-first, discussion-oriented. Title and body are combined
 * into one copy-ready block — the first line is the post title.
 */
export function formatReddit(post: { title: string; body: string }): PlatformContent {
  const title = cleanText(post.title);
  const body = cleanText(post.body);

  return {
    platform: "reddit",
    content: `${title}\n\n${body}`,
  };
}
