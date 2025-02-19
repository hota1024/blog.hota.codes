import { Post } from "contentlayer/generated";
import Link from "next/link";

import { CategoryChip } from "@/features/categories/components/category-chip";
import { Category } from "@/features/categories/types";
import { TagChip } from "@/features/tags/components/tag-chip";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import { getPostTags } from "../lib";

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const href = `/posts/${post.slug}`;
  const tags = getPostTags(post);

  return (
    <article
      className={cn(
        "relative rounded-md border shadow-md hover:shadow-lg grid grid-rows-subgrid row-span-3 pb-4 transition-all overflow-hidden"
      )}
    >
      <CategoryChip
        className="absolute left-2 top-2"
        category={post.category as Category}
        size="small"
      />
      <Link href={href}>
        <div className="grid h-[120px] place-items-center rounded-t-md bg-accent text-6xl">
          {post.emoji}
        </div>
        <header className="px-4 pt-4">
          <h2 className="font-bold">{post.title}</h2>
        </header>
      </Link>
      <div className="px-4 text-xs text-muted-foreground">
        {post.date ? (
          <time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
        ) : (
          <div className="inline-block rounded-md bg-accent px-4 font-bold text-red-400">
            未公開
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 px-4">
        {tags.map((tag) => (
          <TagChip key={tag.slug} tag={tag} size="small" />
        ))}
      </div>
    </article>
  );
}
