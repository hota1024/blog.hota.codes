import { allTags } from "contentlayer/generated";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PostsGrid } from "@/features/posts/components/posts-grid";
import { allPosts } from "@/features/posts/lib";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return allTags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = allTags.find((tag) => tag.slug === slug);

  if (!tag) {
    notFound();
  }

  return {
    title: `「${tag.title}」がタグ付けされた記事一覧`,
  };
}
export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = allTags.find((tag) => tag.slug === slug);

  if (!tag) {
    notFound();
  }

  const posts = allPosts.filter((post) => post.tags?.includes(tag.slug));

  return (
    <div className="flex flex-col gap-16 px-4">
      <div className="flex flex-col items-center gap-8">
        {tag.logo && (
          <Image
            src={tag.logo}
            width={64}
            height={64}
            alt={`${tag.title} のロゴ画像`}
          />
        )}
        <h1 className="text-center text-2xl font-bold lg:text-4xl">
          「{tag.title}」がタグ付けされた記事
        </h1>
      </div>
      <PostsGrid posts={posts} />
    </div>
  );
}
