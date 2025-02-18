import { siteData } from "@/site";

export function Footer() {
  return (
    <footer className="flex h-[64px] items-center border-t">
      <div className="mx-auto max-w-screen-lg px-4">
        {"© "}
        {new Date().getFullYear()}
        {" - "}
        Copyright {siteData.author}, All Rights Reserved.
      </div>
    </footer>
  );
}
