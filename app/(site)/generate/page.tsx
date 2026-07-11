import type { Metadata } from "next";
import { ContentForm } from "@/components/generate/content-form";

export const metadata: Metadata = {
  title: "Generate",
  description: "Turn one idea into LinkedIn, X, and Reddit content.",
};

export default function GeneratePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{"What's your idea?"}</h1>
      <p className="text-muted-foreground mt-3">
        {"Give Nex a topic, an audience, and a tone. You'll get a LinkedIn post, an X thread, and a Reddit post — ready to copy."}
      </p>
      <div className="mt-8">
        <ContentForm />
      </div>
    </div>
  );
}
