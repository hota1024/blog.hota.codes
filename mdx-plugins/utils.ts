export type MarkdownImageNode = {
  type: "image";
  title: string | null;
  url: string;
  alt: string | null;
};
export function isMarkdownImageNode(node: unknown): node is MarkdownImageNode {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "image"
  );
}

export type HTMLImageElementNode = {
  tagName: "img";
  url: string;
  properties: {
    src: string;
    width: number;
    height: number;
    blurDataURL: string;
  };
} & Element;
export function isHTMLImageElementNode(
  node: unknown
): node is HTMLImageElementNode {
  return (
    typeof node === "object" &&
    node !== null &&
    "tagName" in node &&
    node.tagName === "img"
  );
}
