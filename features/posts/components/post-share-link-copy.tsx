"use client";

import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/use-clipboard";

import { getPostURL } from "../lib";

export function PostShareLinkCopy({
  post,
}: {
  post: { title: string; slug: string };
}) {
  const [copied, copy] = useClipboard();
  const url = getPostURL(post);

  return (
    <Button variant="secondary" onClick={() => copy(url)}>
      {copied ? <ClipboardCheckIcon /> : <ClipboardIcon />}
      記事の URL をコピー
    </Button>
  );
}
