"use client";

import { TableOfContentsIcon } from "lucide-react";
import { useEffect } from "react";
import * as tocbot from "tocbot";

import classes from "./side-toc.module.css";

export function SideToc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: "#post-toc",
      contentSelector: "#post-content",
      headingLabelCallback(headingLabel) {
        return headingLabel.replace(/^#*\n?\s?/, "");
      },
      listClass: classes.list,
      linkClass: classes.link,
      activeLinkClass: classes.activeLink,
      scrollSmoothOffset: -60,
      headingsOffset: 60,
    });

    return () => {
      tocbot.destroy();
    };
  }, []);

  return (
    <div className="sticky top-8 flex flex-col gap-4 rounded-md border p-4">
      <h2 className="flex items-center gap-2 font-semibold">
        <TableOfContentsIcon />
        目次
      </h2>
      <div id="post-toc"></div>
    </div>
  );
}
