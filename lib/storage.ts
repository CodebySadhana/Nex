import type { StoredGeneration } from "@/types/content";
import { storedGenerationSchema } from "@/lib/validation";

/**
 * Client-side persistence for the latest generation (V1 has no database).
 * sessionStorage carries the result from /generate to /results and enables
 * Regenerate. Reads are Zod-validated — storage is untrusted input.
 */

const STORAGE_KEY = "nex:last-generation";

export function saveGeneration(generation: StoredGeneration): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(generation));
  } catch {
    // Storage can be unavailable (private mode, quota). Generation still
    // succeeded — the Results page will just show its empty state.
  }
}

export function loadGeneration(): StoredGeneration | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const result = storedGenerationSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
