import { allPosts as posts, allTags, Post } from "contentlayer/generated";

import { siteData } from "@/site";

import { env } from "../../lib/env";
import { Category } from "../categories/types";

/**
 * Checks whether a post is published or not.
 *
 * @param post the post to check.
 * @returns whether the post is published or not.
 */
export function isPostPublished(post: Post): boolean {
  return (
    env.NEXT_PUBLIC_DRAFT_MODE ||
    (!!post.date && new Date(post.date).getTime() <= Date.now())
  );
}

/**
 * All published posts sorted by date. If draft mode is enabled, all posts(including drafts) are returned.
 */
export const allPosts = posts.filter(isPostPublished).sort((a, b) => {
  if (!a.date) {
    return 1;
  }
  if (!b.date) {
    return -1;
  }

  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

/**
 * Returns the URL of a post.
 */
export function getPostURL({ slug }: { slug: string }): string {
  return `${siteData.siteURL}/posts/${slug}`;
}

/**
 * Returns the path of a post.
 */
export function getPostPath(post: Post): string {
  return `contents/posts/${post._raw.sourceFileName}`;
}

/**
 * Returns the tags of a post.
 */
export function getPostTags(post: Post) {
  return allTags.filter((tag) => post.tags?.includes(tag.slug));
}

/**
 *Returns all posts by category.
 */
export function getPostsByCategory(category: Category) {
  return allPosts.filter((post) => post.category === category);
}
