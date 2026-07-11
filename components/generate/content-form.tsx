"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenerateContent } from "@/hooks/use-generate-content";
import { contentRequestSchema, type ContentRequestInput } from "@/lib/validation";
import { saveGeneration } from "@/lib/storage";
import { TONES, TONE_LABELS } from "@/types/content";

export function ContentForm() {
  const router = useRouter();
  const { generate, isGenerating, error } = useGenerateContent();

  const form = useForm<ContentRequestInput>({
    resolver: zodResolver(contentRequestSchema),
    defaultValues: {
      topic: "",
      audience: "",
      tone: "professional",
    },
  });

  const { errors } = form.formState;

  async function onSubmit(values: ContentRequestInput) {
    const response = await generate(values);
    if (response) {
      saveGeneration({ request: values, response });
      router.push("/results");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="topic">Topic</Label>
        <Textarea
          id="topic"
          placeholder="e.g. Why I stopped chasing investors and bootstrapped instead"
          rows={3}
          maxLength={200}
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={errors.topic ? "topic-error" : undefined}
          disabled={isGenerating}
          {...form.register("topic")}
        />
        {errors.topic && (
          <p id="topic-error" role="alert" className="text-destructive text-sm">
            {errors.topic.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="audience">Audience</Label>
        <Input
          id="audience"
          placeholder="e.g. first-time SaaS founders"
          maxLength={120}
          aria-invalid={Boolean(errors.audience)}
          aria-describedby={errors.audience ? "audience-error" : undefined}
          disabled={isGenerating}
          {...form.register("audience")}
        />
        {errors.audience && (
          <p id="audience-error" role="alert" className="text-destructive text-sm">
            {errors.audience.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tone">Tone</Label>
        <Controller
          control={form.control}
          name="tone"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={isGenerating}>
              <SelectTrigger id="tone" className="w-full" aria-invalid={Boolean(errors.tone)}>
                <SelectValue placeholder="Pick a tone" />
              </SelectTrigger>
              <SelectContent>
                {TONES.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {TONE_LABELS[tone]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.tone && (
          <p role="alert" className="text-destructive text-sm">
            {errors.tone.message}
          </p>
        )}
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

      <Button type="submit" size="lg" disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Writing your posts…
          </>
        ) : (
          <>
            <Sparkles aria-hidden="true" />
            Generate content
          </>
        )}
      </Button>
    </form>
  );
}
