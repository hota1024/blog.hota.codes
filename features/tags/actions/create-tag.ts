"use server";

import * as fs from "fs/promises";

import { env } from "@/lib/env";

export type $CreateTagState = object;

export async function $createTag(
  _: $CreateTagState,
  data: FormData
): Promise<$CreateTagState> {
  if (!env.NEXT_PUBLIC_DRAFT_MODE) {
    return {
      message: "Draft mode is disabled",
    };
  }

  const slug = data.get("slug") as string;
  const title = data.get("title") as string;

  const path = `contents/tags/${slug}.mdx`;
  const content =
    ["---", `slug: ${slug}`, `title: ${title}`, "---"].join("\n") + "\n";
  await fs.writeFile(path, content);

  return {
    message: "Tag created",
  };
}
