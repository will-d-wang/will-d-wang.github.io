import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head, Banner } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "./globals.css";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextraSearchDialog } from "@/components/nextra-search-dialog";
import { getPagesFromPageMap } from "@/lib/getPagesFromPageMap";

const SITE_URL = "https://will-d-wang.github.io";
const SITE_TITLE = "Will D. Wang";
const SITE_TAGLINE = `${SITE_TITLE} — DevOps / Platform Engineer`;
const SITE_DESCRIPTION =
  "Member of Technical Staff at OpusClip working across DevOps and Platform Engineering — CI/CD, cloud infrastructure, and AI-assisted developer workflows for backend systems on GCP and Kubernetes.";
const OG_IMAGE = "/images/DinganWang.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TAGLINE,
    template: `%s — ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_TITLE,
  authors: [{ name: SITE_TITLE, url: SITE_URL }],
  creator: SITE_TITLE,
  keywords: [
    "Will D. Wang",
    "Dingan Wang",
    "Platform Engineer",
    "DevOps Engineer",
    "SRE",
    "Kubernetes",
    "CI/CD",
    "GCP",
    "AWS",
    "Azure",
    "OpusClip",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/images/general/logo.webp" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_TITLE,
  alternateName: "Dingan Wang",
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  jobTitle: "Member of Technical Staff — DevOps / Platform Engineer",
  worksFor: {
    "@type": "Organization",
    name: "OpusClip",
    url: "https://www.opus.pro",
  },
  sameAs: [
    "https://github.com/Will-D-Wang",
    "https://linkedin.com/in/will-d-wang",
  ],
};

const banner = (
  <Banner storageKey="some-key">
    Open to AI related Platform Engineer, DevOps, SRE Roles in Seattle(US),
    SF(US), or Vancouver(BC) • Available for onsite/hybrid.
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
      <p>
        Organization logos and icons may be copyrighted trademarks owned by
        their respective organizations.
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
