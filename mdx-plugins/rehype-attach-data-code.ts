import { Element } from "hast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * pre ノードに code ノードの内容を data-code として追加する。
 */
export const rehypeAttachDataCode: Plugin = () => {
  return async (tree) => {
    visit(tree, "element", (node: Element) => {
      if (node?.type === "element" && node?.tagName === "pre") {
        const [codeEl] = node.children;

        if (codeEl.type !== "element" || codeEl.tagName !== "code") return;
        const [text] = codeEl.children;

        if (text.type !== "text") return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        node["data-code"] = text.value;
      }
    });
  };
};
