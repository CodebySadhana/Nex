import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "Why Nex exists and who it's built for.",
};

const AUDIENCE = [
  "Solo founders shipping their first product",
  "Solopreneurs running everything alone",
  "Indie hackers building in public",
  "Builder-creators without a marketing team",
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">About Nex</h1>

      <div className="text-muted-foreground mt-6 space-y-4 text-lg">
        <p>
          {"Founders know they should post consistently. The problem was never motivation — it's that adapting one idea for LinkedIn, X, and Reddit takes an hour you don't have."}
        </p>
        <p>
          Nex collapses that hour into a minute. You bring the idea, the audience, and the tone.
          Nex writes a platform-native version for each channel: a story-driven LinkedIn post, a
          punchy X thread, and a value-first Reddit post. You review, copy, and hit publish.
        </p>
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>{"Who it's for"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted-foreground space-y-2 text-sm">
            {AUDIENCE.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Open source</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Nex is open source and self-hostable. It runs on Next.js, TypeScript, Tailwind CSS, and
          shadcn/ui, with any OpenAI-compatible AI provider. No database, no tracking — your ideas
          stay yours.
        </CardContent>
      </Card>

      <div className="mt-10">
        <Button asChild size="lg">
          <Link href="/generate">
            Try it now
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
