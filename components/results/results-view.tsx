"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/results/copy-button";
import { useGenerateContent } from "@/hooks/use-generate-content";
import { loadGeneration, saveGeneration } from "@/lib/storage";
import type { StoredGeneration } from "@/types/content";
import { PLATFORMS, PLATFORM_LABELS, TONE_LABELS } from "@/types/content";

export function ResultsView() {
  const [generation, setGeneration] = React.useState<StoredGeneration | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const { generate, isGenerating, error } = useGenerateContent();

  // sessionStorage is only available in the browser — read after mount.
  React.useEffect(() => {
    setGeneration(loadGeneration());
    setLoaded(true);
  }, []);

  async function handleRegenerate() {
    if (!generation) return;
    const response = await generate(generation.request);
    if (response) {
      const next = { request: generation.request, response };
      saveGeneration(next);
      setGeneration(next);
    }
  }

  if (!loaded) {
    return (
      <div className="text-muted-foreground flex items-center justify-center gap-2 py-24 text-sm">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        Loading your results…
      </div>
    );
  }

  if (!generation) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-bold tracking-tight">No results yet</h1>
        <p className="text-muted-foreground max-w-sm">
          Generate content first — it takes under a minute.
        </p>
        <Button asChild>
          <Link href="/generate">
            <ArrowLeft aria-hidden="true" />
            Go to generator
          </Link>
        </Button>
      </div>
    );
  }

  const { request, response } = generation;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your content is ready</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="max-w-full whitespace-normal text-left">
            {request.topic}
          </Badge>
          <Badge variant="outline" className="max-w-full whitespace-normal text-left">
            {request.audience}
          </Badge>
          <Badge variant="outline">{TONE_LABELS[request.tone]}</Badge>
          {response.mock && (
            <Badge className="max-w-full bg-emerald-600 whitespace-normal text-white dark:bg-emerald-500">
              Sample output — add an API key for real generation
            </Badge>
          )}
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="border-destructive/30 bg-destructive/5 text-destructive flex items-start gap-2 rounded-md border p-3 text-sm"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      <Tabs defaultValue="linkedin">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            {PLATFORMS.map((platform) => (
              <TabsTrigger key={platform} value={platform}>
                {PLATFORM_LABELS[platform]}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={isGenerating}
              aria-label="Regenerate all content"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw aria-hidden="true" />
              )}
              {isGenerating ? "Regenerating…" : "Regenerate"}
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/generate">New idea</Link>
            </Button>
          </div>
        </div>

        {PLATFORMS.map((platform) => {
          const item = response[platform];
          return (
            <TabsContent key={platform} value={platform} className="mt-4">
              <Card>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground text-xs">
                      {item.content.length.toLocaleString()} characters
                    </span>
                    <CopyButton text={item.content} label={PLATFORM_LABELS[platform]} />
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{item.content}</p>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
