import { Category } from "./types";

export function categoryTitle(category: Category) {
  if (category === "tech") {
    return "TECH";
  } else if (category === "hobby") {
    return "HOBBY";
  }

  return "";
}
