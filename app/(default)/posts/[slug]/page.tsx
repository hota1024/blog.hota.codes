import { jaModel, Parser } from "budoux";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CategoryChip } from "@/features/categories/components/category-chip";
import { Category } from "@/features/categories/types";
import { MdxBody } from "@/features/mdx/components/mdx-body";
import { PostShareLinkCopy } from "@/features/posts/components/post-share-link-copy";
import { SideToc } from "@/features/posts/components/side-toc";
import {
  allPosts,
  getPostPath,
  getPostTags,
  getPostURL,
} from "@/features/posts/lib";
import { MissingTagChip } from "@/features/tags/components/mssing-tag-chip";
import { TagChip } from "@/features/tags/components/tag-chip";
import { formatDate } from "@/lib/date";
import { env } from "@/lib/env";
import { getFileCommits } from "@/lib/github";
import { siteData } from "@/site";

export type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags?.join(", "),
    alternates: {
      canonical: `${siteData.siteURL}/posts/${post.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const parser = new Parser(jaModel);

  const tags = getPostTags(post);
  const missingTags =
    post.tags?.filter((tag) => !tags.find((t) => t.slug === tag)) ?? [];
  const postPath = getPostPath(post);
  const commits = await getFileCommits(postPath);
  const lastCommitDate = commits[0]?.commit.committer?.date;

  const title = parser.parse(post.title);

  return (
    <div className="flex flex-col gap-8 px-2 md:gap-16 md:px-4">
      <div className="flex flex-col gap-8">
        <div className="text-center text-8xl">{post.emoji}</div>

        <h1 className="text-center text-2xl font-black lg:text-4xl">
          {title.map((seg) => (
            <span className="inline-block" key={seg}>
              {seg}
            </span>
          ))}
        </h1>

        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          {post.date ? (
            <div className="flex gap-4">
              <div>
                <span>公開：</span>
                <time dateTime={post.date}>
                  {formatDate(new Date(post.date))}
                </time>
              </div>
              {lastCommitDate && (
                <div>
                  <span>最終更新：</span>
                  <time dateTime={lastCommitDate}>
                    {formatDate(new Date(lastCommitDate))}
                  </time>
                </div>
              )}
            </div>
          ) : (
            <div className="inline-block rounded-md bg-accent px-4 font-bold text-red-400">
              未公開
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <TagChip key={tag.slug} tag={tag} />
          ))}
          {env.NEXT_PUBLIC_DRAFT_MODE &&
            missingTags.map((tag) => <MissingTagChip key={tag} tag={tag} />)}
          <CategoryChip category={post.category as Category} variant="tag" />
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-16">
          <section id="post-content" className="mdx-root w-full max-w-full">
            <MdxBody code={post.body.code} />
          </section>

          <div className="flex flex-col gap-2 md:flex-row">
            {siteData.githubRepo && (
              <Button variant="secondary" asChild>
                <Link
                  href={`https://github.com/${siteData.githubRepo}/blob/main/contents/posts/${post._raw.sourceFileName}`}
                >
                  <svg
                    className="fill-current"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  GitHub で編集を提案
                </Link>
              </Button>
            )}
            <Button variant="secondary" asChild>
              <Link
                href={encodeURI(
                  `https://twitter.com/intent/tweet?text=${post.title} | ${
                    siteData.title
                  }\n${getPostURL(post)}`
                )}
                target="_blank"
              >
                <svg
                  className="fill-current"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                X で共有
              </Link>
            </Button>
            <PostShareLinkCopy post={post} />
          </div>
        </div>

        <aside className="hidden w-full max-w-[200px] md:block lg:max-w-[280px]">
          <SideToc />
        </aside>
      </div>
    </div>
  );
}
