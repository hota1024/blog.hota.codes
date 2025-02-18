"use client";

import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/use-clipboard";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, copy] = useClipboard();

  return (
    <Button
      className="absolute right-2 top-2 text-white hover:bg-accent"
      variant="ghost"
      size="icon"
      onClick={() => !copied && copy(code)}
    >
      {copied ? (
        <ClipboardCheckIcon className={"size-full"} />
      ) : (
        <ClipboardIcon className={"size-full"} />
      )}
      <span className="sr-only">コードをコピーする</span>
    </Button>
  );
}
