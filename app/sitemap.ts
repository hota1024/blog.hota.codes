import { allTags } from "contentlayer/generated";
import { MetadataRoute } from "next";

import { allPosts } from "@/features/posts/lib";
import { env } from "@/lib/env";
import { siteData } from "@/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (env.NEXT_PUBLIC_DRAFT_MODE) {
    return [];
  }

  return [
    {
      url: siteData.siteURL,
    },
    {
      url: `${siteData.siteURL}/posts`,
    },
    ...allPosts.map((post) => ({
      url: `${siteData.siteURL}/posts/${post.slug}`,
    })),
    {
      url: `${siteData.siteURL}/tags`,
    },
    ...allTags.map((tag) => ({
      url: `${siteData.siteURL}/tags/${tag.slug}`,
    })),
  ];
}
