import { Metadata } from "next";

import { PostsGrid } from "@/features/posts/components/posts-grid";
import { allPosts } from "@/features/posts/lib";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export const metadata: Metadata = {
  title: "記事一覧",
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-10 px-2 md:gap-16 lg:px-4">
      <h1 className="text-center text-4xl font-black">記事一覧</h1>
      <PostsGrid posts={allPosts} />
    </div>
  );
}
