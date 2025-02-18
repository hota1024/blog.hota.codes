import { PropsWithChildren } from "react";

import { Footer } from "./footer";
import { Header } from "./header";

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-dvh flex-col gap-10 lg:gap-16">
      <Header />

      <main className="mx-auto w-full max-w-screen-lg flex-1">{children}</main>

      <Footer />
    </div>
  );
}
