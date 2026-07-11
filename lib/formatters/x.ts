import type { PlatformContent } from "@/types/content";
import { cleanText } from "@/lib/formatters/text";

/**
 * X: concise, punchy. A thread arrives as individual tweets and is
 * joined into one copy-ready block with n/total markers when it has
 * more than one tweet.
 */
export function formatXThread(tweets: string[]): PlatformContent {
  const cleaned = tweets.map(cleanText).filter((tweet) => tweet.length > 0);

  const content =
    cleaned.length <= 1
      ? (cleaned[0] ?? "")
      : cleaned
          .map((tweet, index) => `${index + 1}/${cleaned.length}\n${tweet}`)
          .join("\n\n");

  return {
    platform: "x",
    content,
  };
}
