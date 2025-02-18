import { ArrowBigRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PostsGrid } from "@/features/posts/components/posts-grid";
import { allPosts } from "@/features/posts/lib";
import { siteData } from "@/site";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 px-2 md:px-4">
      <section className="flex flex-col gap-8">
        <h1 className="text-center text-5xl font-black">{siteData.title}</h1>
        <p className="text-center">{siteData.description}</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">最新の記事</h2>
        <PostsGrid posts={allPosts.slice(0, 3)} />
        <div className="flex justify-end">
          <Button variant="ghost" asChild>
            <Link href="/posts">
              すべての記事を見る
              <ArrowBigRightIcon />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
