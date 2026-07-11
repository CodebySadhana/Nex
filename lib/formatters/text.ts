/**
 * Shared plain-text cleanup for AI output.
 * Output is always treated as plain text — it is rendered with React text
 * nodes (never dangerouslySetInnerHTML), so HTML can never execute.
 */

/** Trim, strip wrapping quotes, and collapse 3+ blank lines into one. */
export function cleanText(raw: string): string {
  let text = raw.trim();

  // Models occasionally wrap the whole post in quotes.
  if (text.length > 1 && text.startsWith('"') && text.endsWith('"')) {
    text = text.slice(1, -1).trim();
  }

  // Normalize Windows line endings and excessive vertical whitespace.
  text = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n");

  return text;
}
