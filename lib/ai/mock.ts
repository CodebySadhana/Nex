import type { ContentRequest } from "@/types/content";
import type { AiOutput } from "@/lib/validation";

/**
 * Mock generator used when OPENAI_API_KEY is not configured.
 * Lets contributors run the full product flow with zero setup.
 * Output is clearly labeled as a sample in the UI via the `mock` flag.
 */
export function generateMockOutput(request: ContentRequest): AiOutput {
  const { topic, audience, tone } = request;

  return {
    linkedin: `I spent the last month thinking about ${topic}.

Here's what surprised me: most ${audience} get this wrong not because it's hard, but because nobody breaks it down simply.

Three things I'd tell anyone starting out:

1. Start smaller than feels comfortable.
2. Talk to people who've done it — not people who write about it.
3. Ship something this week, even if it's rough.

The ${tone} take: perfect is a form of procrastination.

What's the first thing you'd do differently?`,
    x: [
      `Everyone overcomplicates ${topic}. Here's the simple version ${audience} actually need:`,
      `1. Start smaller than feels comfortable. Momentum beats planning.`,
      `2. Learn from people who've done it, not people who write about it.`,
      `3. Ship something this week. Rough beats perfect.`,
      `That's it. ${topic} rewards action, not analysis. Which step are you skipping?`,
    ],
    reddit: {
      title: `What I learned about ${topic} (the honest version for ${audience})`,
      body: `I've been deep in ${topic} lately and most advice I found was either too generic or trying to sell something. So here's the honest breakdown.

The biggest lesson: start smaller than feels comfortable. Every failed attempt I've seen came from overbuilding before validating.

Second: the best insights came from talking to people who had actually done it — not blog posts, not courses.

Third: shipping something rough this week beats shipping something perfect next quarter.

Curious what this community thinks — for those who've been through it, what do you wish someone had told you at the start?`,
    },
  };
}
