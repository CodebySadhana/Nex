"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CopyButtonProps {
  text: string;
  label: string;
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => copy(text)}
      aria-label={`Copy ${label} content`}
    >
      {copied ? (
        <>
          <Check className="text-emerald-600 dark:text-emerald-500" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Copy aria-hidden="true" />
          Copy
        </>
      )}
    </Button>
  );
}
