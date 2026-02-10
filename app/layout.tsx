import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { NextraTheme } from "./_components/nextra-theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Will D Wang's Life Journey",
  description: "Personal blog and documentation",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <NextraTheme pageMap={pageMap}>{children}</NextraTheme>
      </body>
    </html>
  );
}
