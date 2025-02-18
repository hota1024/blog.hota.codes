import { Metadata } from "next";

import { PostsGrid } from "@/features/posts/components/posts-grid";
import { allPosts, getPostsByCategory } from "@/features/posts/lib";
import { siteData } from "@/site";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export const metadata: Metadata = {
  title: "趣味系の記事一覧",
  alternates: {
    canonical: `${siteData.siteURL}/categories/hobby`,
  },
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-10 px-2 md:gap-16 lg:px-4">
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-4xl font-black">HOBBY 記事一覧</h1>
        <p className="text-center text-muted-foreground">
          HOBBY は趣味系の記事をまとめたカテゴリです。
        </p>
      </div>
      <PostsGrid posts={getPostsByCategory("hobby")} />
    </div>
  );
}
