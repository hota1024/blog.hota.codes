import { styleText } from "node:util";

import { Command } from "commander";
import * as fs from "fs/promises";

import { allTags } from "../.contentlayer/generated/index.mjs";

const command = new Command()
  .name("post-new")
  .description("Create a new tag")
  .argument("<slug>", "Tag slug")
  .argument("[title]", "Tag title")
  .action(async (slug, title = slug) => {
    const existingTag = allTags.find((tag) => tag.slug === slug);
    if (existingTag) {
      console.error(
        styleText(
          "red",
          `[tag-new] Tag with slug \`${slug}\` already exists at ${styleText(
            "underline",
            `contents/${existingTag._raw.sourceFilePath}`
          )}`
        )
      );
      return;
    }

    const path = `contents/tags/${slug}.mdx`;
    const content =
      ["---", `slug: ${slug}`, `title: ${title}`, "---"].join("\n") + "\n";

    console.log(
      styleText("green", `[tag-new] Created tag ${title} at ${path}.`)
    );
    await fs.writeFile(path, content);
  });

command.parse();
