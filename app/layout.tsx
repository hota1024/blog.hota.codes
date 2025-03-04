import "./globals.css";

import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { siteData } from "@/site";

export const metadata: Metadata = {
  title: {
    default: siteData.title,
    template: `%s | ${siteData.title}`,
  },
  openGraph: {
    siteName: siteData.title,
  },
  description: siteData.description,
  alternates: {
    canonical: siteData.siteURL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
