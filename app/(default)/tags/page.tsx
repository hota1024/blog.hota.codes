import { allTags } from "contentlayer/generated";
import { Metadata } from "next";

import { allPosts } from "@/features/posts/lib";
import { TagChip } from "@/features/tags/components/tag-chip";
import { siteData } from "@/site";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export const metadata: Metadata = {
  title: "タグ一覧",
  alternates: {
    canonical: `${siteData.siteURL}/tags`,
  },
};

export default async function TagsPage() {
  return (
    <div className="flex flex-col gap-10 pt-10 md:gap-16 lg:px-4">
      <h1 className="text-center text-4xl font-black">タグ一覧</h1>

      <div className="flex justify-center gap-2">
        {allTags.map((tag) => (
          <TagChip key={tag.slug} tag={tag} />
        ))}
      </div>
    </div>
  );
}
