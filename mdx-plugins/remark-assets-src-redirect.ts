import { Plugin } from "unified";
import { visit } from "unist-util-visit";

import { isMarkdownImageNode } from "./utils";

export const remarkAssetsSrcRedirect: Plugin = () => {
  return (tree) => {
    visit(tree, "image", (node: unknown) => {
      if (!isMarkdownImageNode(node)) {
        return;
      }

      if (node.url.startsWith("/public/")) {
        node.url = node.url.replace("/public/", "/");
      }
    });
  };
};
