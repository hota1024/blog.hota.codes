import { readFile } from "fs/promises";
import sizeOf from "image-size";
import { getPlaiceholder } from "plaiceholder";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

import { isHTMLImageElementNode } from "./utils";

async function getImage(src: string): Promise<Buffer> {
  if (src.match(/^https?\:\/\//)) {
    const response = await fetch(src);
    const buf = await response.arrayBuffer();

    return Buffer.from(buf);
  }

  if (src.startsWith("/post-assets/") || src.startsWith("/book-assets/")) {
    return readFile(`public${src}`);
  }

  throw new Error(`Unsupported image source: ${src}`);
}

export const rehypePlaiceholder: Plugin = () => {
  return async (tree) => {
    const tasks: Promise<unknown>[] = [];

    visit(tree, "element", (node: unknown) => {
      if (!isHTMLImageElementNode(node)) {
        return;
      }

      const task = new Promise(async (resolve, reject) => {
        const { src } = node.properties;

        try {
          const buf = await getImage(src);
          const size = sizeOf(buf);

          node.properties.width = size.width ?? 0;
          node.properties.height = size.height ?? 0;

          const { base64 } = await getPlaiceholder(buf);
          node.properties.blurDataURL = base64;
        } catch (e) {
          console.error("Handled error in rehypePlaiceholder", e);
          reject(e);
        }

        resolve(void 0);
      });

      tasks.push(task);
    });

    await Promise.all(tasks);
  };
};
