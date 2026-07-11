"use client";

import { useCallback, useState } from "react";
import type { ContentRequest, ContentResponse } from "@/types/content";
import { contentResponseSchema } from "@/lib/validation";

interface GenerateState {
  isGenerating: boolean;
  error: string | null;
}

/**
 * Calls POST /api/generate and validates the response.
 * Shared by the Create Content form and the Regenerate action.
 */
export function useGenerateContent() {
  const [state, setState] = useState<GenerateState>({ isGenerating: false, error: null });

  const generate = useCallback(async (request: ContentRequest): Promise<ContentResponse | null> => {
    setState({ isGenerating: true, error: null });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data && typeof data === "object" && "error" in data && typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again.";
        setState({ isGenerating: false, error: message });
        return null;
      }

      const parsed = contentResponseSchema.safeParse(data);
      if (!parsed.success) {
        setState({ isGenerating: false, error: "Received an unexpected response. Please try again." });
        return null;
      }

      setState({ isGenerating: false, error: null });
      return parsed.data;
    } catch {
      setState({ isGenerating: false, error: "Network error. Check your connection and try again." });
      return null;
    }
  }, []);

  return { ...state, generate };
}
