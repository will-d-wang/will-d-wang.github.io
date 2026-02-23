import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "./globals.css";
import { Metadata } from "next";
import { NextraSearchDialog } from "@/components/nextra-search-dialog";
import { getPagesFromPageMap } from "@/lib/getPagesFromPageMap";

export const metadata: Metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

// const banner = <Banner storageKey="some-key">This template was created with 🩸 and 💦 by <Link href="https://github.com/phucbm">PHUCBM</Link> 🐧</Banner>
const navbar = (
  <Navbar
    logo={
      <>
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
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
        {" & "}
        <a href="https://nextra.site" target="_blank" rel="noopener noreferrer">
          Nextra
        </a>
        . Hosted on{" "}
        <a
          href="https://pages.github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Pages
        </a>
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
        <link rel="shortcut icon" href="/images/general/icon.svg" />
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          // banner={banner}
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/phucbm/nextra-docs-starter/tree/main"
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
