"use client";

import "react-medium-image-zoom/dist/styles.css";
import "../styles/mdx.css";
import "../styles/auto-links.css";
import "../styles/link-card.css";
import "../styles/pretty-code.css";
import "../styles/react-medium-image-zoom.css";

import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { ComponentProps } from "react";
import Zoom from "react-medium-image-zoom";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TipMessage } from "@/features/mdx/components/message";

import { CopyCodeButton } from "./copy-code-button";

export const MdxBody = ({ code }: { code: string }) => {
  const MDXComponent = useMDXComponent(code);

  return (
    <>
      <MDXComponent
        components={{
          img(props: ComponentProps<"img">) {
            let imgNode;

            if (props.src?.match(/^https?\:\/\//)) {
              imgNode = (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={props.className}
                  src={props.src}
                  width={props.width}
                  height={props.height}
                  alt={props.alt}
                />
              );
            } else if (
              "blurDataURL" in props &&
              typeof props.blurDataURL === "string"
            ) {
              imgNode = (
                <Image
                  className={props.className}
                  src={props.src!}
                  width={Number(props.width)}
                  height={Number(props.height)}
                  alt={props.alt!}
                  blurDataURL={props.blurDataURL}
                  placeholder="blur"
                />
              );
            } else {
              imgNode = (
                <Image
                  className={props.className}
                  src={props.src!}
                  width={Number(props.width)}
                  height={Number(props.height)}
                  alt={props.alt!}
                />
              );
            }

            if (props.className?.includes("link-card-image")) {
              return imgNode;
            }

            return (
              <Zoom
                wrapElement="span"
                a11yNameButtonZoom="画像をズームする"
                a11yNameButtonUnzoom="画像のズームをやめる"
              >
                {imgNode}
              </Zoom>
            );
          },
          a(props: ComponentProps<"a">) {
            const isExternal = !!props.href?.match(/^https?\:\/\//);

            if (props.href) {
              return (
                <Link
                  {...props}
                  href={props.href}
                  target={isExternal ? "_blank" : void 0}
                >
                  {props.children}
                </Link>
              );
            }

            return <a {...props} />;
          },
          h1(props: ComponentProps<"h1">) {
            return (
              <h1 className="text-4xl font-black no-underline" {...props} />
            );
          },
          h2(props: ComponentProps<"h2">) {
            return (
              <h2 className="text-3xl font-black no-underline" {...props} />
            );
          },
          h3(props: ComponentProps<"h3">) {
            return <h3 className="text-2xl font-black" {...props} />;
          },
          h4(props: ComponentProps<"h4">) {
            return <h4 className="text-xl font-black" {...props} />;
          },
          h5(props: ComponentProps<"h5">) {
            return <h5 className="text-lg font-black" {...props} />;
          },
          h6(props: ComponentProps<"h6">) {
            return <h6 className="font-black" {...props} />;
          },
          button(props: ComponentProps<"button">) {
            if (!("data-code-copy" in props)) {
              return <button {...props} />;
            }

            return (
              <CopyCodeButton
                code={
                  (props as unknown as { "data-code": string })["data-code"]
                }
              />
            );
          },
          figcaption(props: ComponentProps<"figcaption">) {
            if (!("data-rehype-pretty-code-title" in props)) {
              return <figcaption {...props} />;
            }
            return <figcaption {...props} />;
          },
          table: Table,
          thead: TableHeader,
          tbody: TableBody,
          th: TableHead,
          tr: TableRow,
          td: TableCell,
          Button,
          TipMessage,
        }}
      />
    </>
  );
};
