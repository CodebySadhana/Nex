import type { Metadata } from "next";
import { ResultsView } from "@/components/results/results-view";

export const metadata: Metadata = {
  title: "Results",
  description: "Your generated LinkedIn, X, and Reddit content.",
};

export default function ResultsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <ResultsView />
    </div>
  );
}
