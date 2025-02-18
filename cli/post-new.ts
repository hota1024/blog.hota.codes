import * as utils from "node:util";
const { styleText } = utils;

import { Command } from "commander";
import * as fs from "fs/promises";
import openFile from "open";

import { allPosts } from "../.contentlayer/generated/index.mjs";

const command = new Command()
  .name("post-new")
  .description("Create a new post")
  .argument("<slug>", "Post slug")
  .argument("[title]", "Post title")
  .option("-c, --category <category>", "Post category")
  .option("-o, --open", "Open the new post in the default editor", false)
  .action(async (slug, title = slug, { category, open }) => {
    const date = new Date();

    const name = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDay().toString().padStart(2, "0")}-${slug}`;
    const mdxPath = `contents/posts/${name}.mdx`;
    const dirPath = `public/post-assets/${name}`;

    const existingPost = allPosts.find((post) => post.slug === slug);
    if (existingPost) {
      console.error(
        styleText(
          "red",
          `[tag-new] Post with slug \`${slug}\` already exists at ${styleText(
            "underline",
            `contents/${existingPost._raw.sourceFilePath}`
          )}`
        )
      );
      return;
    }

    const emoji = await fetch(
      "https://emojihub.yurace.pro/api/random/group/face-positive"
    )
      .then(async (res) => {
        const json = await res.json();
        return String.fromCodePoint(Number(`0x${json.unicode[0].slice(2)}`));
      })
      .catch(() => "🐱");

    const content =
      [
        "---",
        `emoji: ${emoji}`,
        `slug: ${slug}`,
        `title: ${title}`,
        `category: ${category}`,
        `tags:`,
        "---",
        "",
        `# ${title}`,
      ].join("\n") + "\n";

    await Promise.all([
      // Create the post file.
      fs
        .writeFile(mdxPath, content)
        .then(() => {
          console.log(
            styleText(
              "green",
              `[tag-new] Created post file at ${styleText(
                "underline",
                dirPath
              )}`
            )
          );
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.error(
              styleText(
                "red",
                `[tag-new] Error creating post file ${styleText(
                  "underline",
                  mdxPath
                )}: ${error.message}`
              )
            );
          }
        }),
      // Create the post assets directory and add a .gitkeep file.
      fs
        .mkdir(dirPath)
        .then(() => fs.writeFile(`${dirPath}/.gitkeep`, ""))
        .then(() => {
          console.log(
            styleText(
              "green",
              `[tag-new] Created post categorized TECH at ${styleText(
                "underline",
                mdxPath
              )}`
            )
          );
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.error(
              styleText(
                "red",
                `[tag-new] Error creating post assets directory ${styleText(
                  "underline",
                  dirPath
                )}: ${error.message}`
              )
            );
          }
        }),
    ]);

    if (open) {
      console.log(
        styleText("green", `[tag-new] Opening %s in the default editor.`),
        mdxPath
      );
      await openFile(mdxPath);
    }
  });

command.parse();
