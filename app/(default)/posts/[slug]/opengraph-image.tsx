import { jaModel, Parser } from "budoux";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { getPostTags } from "@/features/posts/lib";
import { formatDate } from "@/lib/date";
import { siteData } from "@/site";

import { type Props } from "./page";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function fetchFont(): Promise<ArrayBuffer | null> {
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap`;

  const css = await (
    await fetch(googleFontsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) return null;
  const res = await fetch(resource[1]);
  return res.arrayBuffer();
}

// Image generation
export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }
  const tags = getPostTags(post);

  const parser = new Parser(jaModel);
  const title = parser.parse(post.title);

  return new ImageResponse(
    (
      <div
        tw="flex flex-col p-10 w-full h-full"
        style={{
          fontFamily: `Noto Sans JP, sans-serif`,
          backgroundImage:
            "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
        }}
      >
        <div tw="flex flex-col justify-center flex-1 bg-black text-white rounded-xl p-10 relative">
          <div tw="flex flex-wrap text-6xl font-black">
            {title.map((seg) => (
              <div key={seg}>{seg}</div>
            ))}
          </div>
          <div tw="flex gap-4 mt-10">
            {tags?.map((tag) => (
              <div
                key={tag.slug}
                tw="flex bg-slate-800 rounded-md p-2 text-2xl px-4 mr-4"
              >
                # {tag.title}
              </div>
            ))}
          </div>
          <div tw="absolute left-10 bottom-10 text-2xl flex items-center">
            @{siteData.sns.x}
            <div
              tw="ml-10 flex text-neutral-300"
              style={{ fontSize: "0.75em" }}
            >
              {post.date ? formatDate(new Date(post.date)) : "未公開"}
            </div>
          </div>
          <div tw="absolute right-10 bottom-10 text-2xl text-neutral-300">
            {siteData.title}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: (await fetchFont())!,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
