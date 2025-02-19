import * as utils from "node:util";

import * as fs from "fs/promises";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";

const { styleText } = utils;

import { Command } from "commander";
import remarkFrontmatter from "remark-frontmatter";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import yaml from "yaml";

import { allPosts } from "../.contentlayer/generated/index.mjs";

const command = new Command()
  .name("post-publish")
  .description("Publish a post")
  .argument("<slug>", "Post slug")
  .action(async (slug) => {
    const date = new Date();

    const post = allPosts.find((post) => post.slug === slug);
    if (!post) {
      console.error(
        styleText("red", `[post-publish] Post with slug \`${slug}\` not found.`)
      );
      return;
    }

    const file = await fs.readFile(
      `contents/${post._raw.sourceFilePath}`,
      "utf-8"
    );
    const vfile = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ["yaml", "toml"])
      .use(() => (tree) => {
        visit(tree, "yaml", (node) => {
          const frontmatter = yaml.parse(node.value);
          frontmatter.date = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`;
          node.value = yaml.stringify(frontmatter).trim();
        });
      })
      .use(remarkStringify)
      .process(file);

    await fs.writeFile(
      `contents/${post._raw.sourceFilePath}`,
      vfile.toString()
    );
    console.log(styleText("green", `[post-publish] Published post ${slug}.`));
  });

command.parse();
