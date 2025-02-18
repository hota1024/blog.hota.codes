import { Tag } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface TagChipProps {
  className?: string;
  noLink?: boolean;
  tag: Pick<Tag, "slug" | "title" | "logo">;
  size?: "small" | "medium";
}

export function TagChip({
  className,
  noLink,
  tag,
  size = "medium",
}: TagChipProps) {
  const style = cn(
    "flex items-center gap-2 rounded-md border transition-all hover:bg-accent",
    size === "small" && "px-2 py-1 text-xs font-bold ",
    size === "medium" && "p-2 text-sm ",
    className
  );

  const node = (
    <>
      {tag.logo ? (
        <Image
          className={cn(
            size === "small" && "size-4",
            size === "medium" && "size-6"
          )}
          src={tag.logo}
          width={32}
          height={32}
          alt={`${tag.title} のロゴ画像`}
        />
      ) : (
        "# "
      )}
      {tag.title}
    </>
  );

  if (noLink) {
    return <span className={style}>{node}</span>;
  }

  return (
    <Link href={`/tags/${tag.slug}`} className={style}>
      {node}
    </Link>
  );
}
