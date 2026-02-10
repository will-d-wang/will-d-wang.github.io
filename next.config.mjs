import nextra from "nextra";

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
  // Optional: Use contentDirBasePath if you want to serve content from a different path
  // For example: contentDirBasePath: '/docs' would serve content from app/docs/[[...mdxPath]]/page.jsx
  // Currently using the default app directory structure (app/page.mdx, app/blog/page.mdx, etc.)
  // contentDirBasePath: '/docs',
});

export default withNextra({
  // output: "export", // Commented out for local development
  images: {
    unoptimized: true,
  },
});
