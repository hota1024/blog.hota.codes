import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Tag = defineDocumentType(() => ({
  name: "Tag",
  filePathPattern: `tags/**/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    logo: { type: "string" },
  },
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    emoji: { type: "string", required: false },
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    category: { type: "string", required: true },
    date: { type: "date" },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
    },
    description: { type: "string" },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post.slug}`,
    },
  },
}));

import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeShiftHeading from "rehype-shift-heading";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { rehypeAttachDataCode } from "./mdx-plugins/rehype-attach-data-code";
import { rehypeAttachDataCodeCopy } from "./mdx-plugins/rehype-attach-data-code-copy";
import { rehypePlaiceholder } from "./mdx-plugins/rehype-plaiceholder";
import { remarkAssetsSrcRedirect } from "./mdx-plugins/remark-assets-src-redirect";
import { remarkLinkCard } from "./mdx-plugins/remark-link-card";

export default makeSource({
  contentDirPath: "contents",
  documentTypes: [Tag, Post],
  mdx: {
    remarkPlugins: [
      remarkAssetsSrcRedirect,
      remarkGfm,
      remarkMath,
      remarkLinkCard,
    ],
    rehypePlugins: [
      rehypeAttachDataCode,
      () =>
        rehypePrettyCode({
          theme: "tokyo-night",
          keepBackground: false,
        }),
      rehypeAttachDataCodeCopy,
      rehypeSlug,
      () =>
        rehypeShiftHeading({
          shift: 1,
        }),
      (option) =>
        rehypeAutolinkHeadings({
          ...option,
          behavior: "prepend",
          content(node) {
            let value = "";

            if (node.tagName === "h2") {
              value = "#";
            } else if (node.tagName === "h3") {
              value = "##";
            } else if (node.tagName === "h4") {
              value = "###";
            } else if (node.tagName === "h5") {
              value = "####";
            } else if (node.tagName === "h6") {
              value = "#####";
            }

            return h("span.heading-link", value);
          },
        }),
      rehypePlaiceholder,
      rehypeKatex,
    ],
  },
});
