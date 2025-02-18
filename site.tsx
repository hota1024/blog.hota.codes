import { ListIcon, TagsIcon, UserIcon } from "lucide-react";

import { SiteData } from "@/lib/site";

export const siteData: SiteData = {
  title: "ほたのテックブログ",
  description: "Web 技術や低レイヤーに関する記事を書いています。",
  siteURL: "https://blog.hota.codes",
  author: "hota1024",
  x: "hota1024",
  github: "hota1024",
  githubRepo: "hota1024/blog.hota.codes",

  headerLinks: [
    {
      icon: <UserIcon />,
      text: "Portfolio",
      href: "https://hota.codes",
    },
    {
      icon: <ListIcon />,
      text: "Posts",
      href: "/posts",
    },
    {
      icon: <TagsIcon />,
      text: "Tags",
      href: "/tags",
    },
  ],
  sns: {
    x: "hota1024",
    github: "hota1024",
  },
};
