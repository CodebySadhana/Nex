/**
 * Core domain models for Nex content generation.
 * One idea in → three platform-native posts out.
 */

export const TONES = ["professional", "casual", "bold", "friendly", "witty"] as const;

export type Tone = (typeof TONES)[number];

export const TONE_LABELS: Record<Tone, string> = {
  professional: "Professional",
  casual: "Casual",
  bold: "Bold",
  friendly: "Friendly",
  witty: "Witty",
};

export const PLATFORMS = ["linkedin", "x", "reddit"] as const;

export type Platform = (typeof PLATFORMS)[number];

export const PLATFORM_LABELS: Record<Platform, string> = {
  linkedin: "LinkedIn",
  x: "X",
  reddit: "Reddit",
};

/** What the user submits from the Create Content form. */
export interface ContentRequest {
  topic: string;
  audience: string;
  tone: Tone;
}

/** A single ready-to-post piece of content for one platform. */
export interface PlatformContent {
  platform: Platform;
  content: string;
}

/** API response: one PlatformContent per supported platform. */
export interface ContentResponse {
  linkedin: PlatformContent;
  x: PlatformContent;
  reddit: PlatformContent;
  generatedAt: string;
  /** True when produced by the mock generator (no API key configured). */
  mock?: boolean;
}

/** The request/response pair persisted for the Results page. */
export interface StoredGeneration {
  request: ContentRequest;
  response: ContentResponse;
}
