"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Copies text and reports a short-lived "copied" state for button feedback. */
export function useCopyToClipboard(resetAfterMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      const succeeded = await writeToClipboard(text);
      if (succeeded) {
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), resetAfterMs);
      }
      return succeeded;
    },
    [resetAfterMs],
  );

  return { copied, copy };
}

async function writeToClipboard(text: string): Promise<boolean> {
  // Preferred: async Clipboard API (secure contexts).
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy path — some embedded/automation
      // contexts and plain-http origins block the Clipboard API.
    }
  }

  // Fallback: hidden textarea + execCommand("copy").
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    return succeeded;
  } catch {
    return false;
  }
}
