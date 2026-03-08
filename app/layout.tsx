import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head, Banner } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "./globals.css";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextraSearchDialog } from "@/components/nextra-search-dialog";
import { getPagesFromPageMap } from "@/lib/getPagesFromPageMap";

export const metadata: Metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

const banner = (
  <Banner storageKey="some-key">
    Open to Seattle, US or Vancouver, BC • Available for onsite/hybrid.
  </Banner>
);
const navbar = (
  <Navbar
    logo={
      <>
        <Image
          src="/images/general/logo.webp"
          alt="Will D. Wang logo"
          width={48}
          height={48}
          className="mr-2 inline-block"
        />
        <span className="font-semibold">Will D. Wang</span>
      </>
    }
    projectLink="https://github.com/will-d-wang/will-d-wang.github.io"
  />
);
const footer = (
  <Footer className="flex-col items-center md:items-start">
    <div className="nextra-footer-content">
      <p>
        Copyright © {new Date().getFullYear()} Will D. Wang. Powered by{" "}
        <Link
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Next.js
        </Link>
        {" & "}
        <Link
          href="https://nextra.site"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Nextra
        </Link>
        {" & "}
        <Link
          href="https://github.com/phucbm/nextra-docs-starter"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Nextra Docs Starter Template
        </Link>
        . Hosted on{" "}
        <Link
          href="https://pages.github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          GitHub Pages
        </Link>
        .{" "}
      </p>
    </div>
  </Footer>
);

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();
  const pages = await getPagesFromPageMap({
    pageMapArray: pageMap,
    // modify page data if needed
    // filterItem: async (item) => {
    //     return {
    //         ...item,
    //     };
    // }
  });

  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/will-d-wang/will-d-wang.github.io/tree/main"
          footer={footer}
          search={<NextraSearchDialog pages={pages} />}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
