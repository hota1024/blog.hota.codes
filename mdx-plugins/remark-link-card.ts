import { Properties } from "hast";
import { Link, Paragraph, Parent, PhrasingContent } from "mdast";
import ogs from "open-graph-scraper";
import { JSX } from "react";
import sanitizeHtml from "sanitize-html";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

function h<T extends keyof JSX.IntrinsicElements>(
  type: T,
  attrs: Omit<JSX.IntrinsicElements[T], "className"> & { class?: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any[]
) {
  return {
    type: "element",
    tagName: type,
    data: {
      hName: type,
      hProperties: attrs as Properties,
      hChildren: children,
    },
    properties: attrs,
    children,
  };
}

const text = (value = "") => {
  const sanitized = sanitizeHtml(value);

  return {
    type: "text",
    value: sanitized,
  };
};

export const remarkLinkCard: Plugin = () => {
  return async (tree) => {
    const tasks: Promise<void>[] = [];

    visit(tree, "paragraph", (paragraph: Paragraph, paragraphIdx) => {
      // @ts-expect-error visit の第一引数は Paragraph を受け入れる
      visit(paragraph, "link", (node: Link, _, parent: Parent) => {
        if (parent.children.length === 1) {
          const task = new Promise<void>(async (resolve) => {
            const url = new URL(node.url);
            const ogp = await ogs({ url: node.url });
            if (ogp.error) {
              resolve();
            }

            const ogImage = ogp.result.ogImage?.[0];

            node.children = [
              h(
                "a",
                {
                  class: "link-card-root",
                  href: node.url,
                  target: "_blank",
                },
                [
                  h(
                    "div",
                    {
                      class: "link-card-content",
                    },
                    [
                      h(
                        "div",
                        {
                          class: "link-card-title",
                        },
                        [text(ogp.result.ogTitle)]
                      ),
                      h(
                        "div",
                        {
                          class: "link-card-description",
                        },
                        [
                          text(ogp.result.ogDescription),
                          text(ogp.result.ogDescription),
                        ]
                      ),
                      h(
                        "div",
                        {
                          class: "link-card-site",
                        },
                        [
                          h(
                            "img",
                            {
                              class: "link-card-site-icon",
                              src: `https://www.google.com/s2/favicons?domain=${url.hostname}`,
                              alt: ogp.result.ogSiteName,
                            },
                            []
                          ),
                          h(
                            "div",
                            {
                              class: "link-card-site-hostname",
                            },
                            [text(url.hostname)]
                          ),
                        ]
                      ),
                    ]
                  ),
                  ...[
                    ogImage
                      ? h(
                          "img",
                          {
                            class: "link-card-image",
                            src: ogImage.url,
                            width: ogImage.width,
                            height: ogImage.height,
                            alt: ogImage.alt ?? ogp.result.ogTitle,
                          },
                          []
                        )
                      : [],
                  ],
                ]
              ),
            ] as unknown as PhrasingContent[];

            // @ts-expect-error tree に children がないと怒られるが、実際にはある
            tree.children.splice(paragraphIdx, 1, ...node.children);

            resolve();
          });

          tasks.push(task);
        }
      });
    });

    await Promise.all(tasks);
  };
};
