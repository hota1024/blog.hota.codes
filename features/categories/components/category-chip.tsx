import Link from "next/link";

import { cn } from "@/lib/utils";

import { categoryTitle } from "../lib";

export interface CategoryChip {
  className?: string;
  variant?: "default" | "tag";
  category: "tech" | "hobby";
  size?: "small" | "medium";
}

export function CategoryChip({
  className,
  variant = "default",
  category,
  size = "medium",
}: CategoryChip) {
  const node = categoryTitle(category);

  return (
    <Link
      href={`/categories/${category}`}
      className={cn(
        "flex items-center gap-2 rounded-md transition-all",
        size === "small" && "px-2 py-1 text-xs font-bold ",
        size === "medium" && "py-2 px-4 text-sm ",
        category === "tech" &&
          variant === "default" &&
          "bg-blue-500 text-white dark:bg-blue-700",
        category === "hobby" &&
          variant === "default" &&
          "bg-green-500 text-white dark:bg-green-700",
        variant === "tag" && "border hover:bg-accent",
        className
      )}
    >
      {node}
    </Link>
  );
}
