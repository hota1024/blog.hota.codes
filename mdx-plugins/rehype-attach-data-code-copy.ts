import { Element } from "hast";
import { h } from "hastscript";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * pre ノードにコードコピーボタンを追加する。
 */
export const rehypeAttachDataCodeCopy: Plugin = () => {
  return async (tree) => {
    visit(tree, "element", (node: Element) => {
      if (node?.tagName === "figure") {
        if (!("data-rehype-pretty-code-figure" in node.properties)) {
          return;
        }

        const preElement = node.children.at(-1);
        if (preElement?.type !== "element" || preElement.tagName !== "pre") {
          return;
        }

        node.children.push(
          h("button", {
            "data-code-copy": true,
            "data-code": (node as unknown as { "data-code": string })[
              "data-code"
            ],
          })
        );
      }
    });
  };
};
