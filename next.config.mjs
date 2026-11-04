import nextra from "nextra";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextraPackageDir = path.dirname(require.resolve("nextra/package.json"));
const remarkMermaidPackage = require.resolve(
  "@theguild/remark-mermaid/package.json",
  { paths: [nextraPackageDir] },
);
const remarkMermaidComponent = path
  .relative(
    process.cwd(),
    path.join(path.dirname(remarkMermaidPackage), "dist", "mermaid.js"),
  )
  .replaceAll("\\", "/");

const withNextra = nextra({
  search: true,
  defaultShowCopyCode: true,
  latex: true,
});

export default withNextra({
  // ... Other Next.js config options
  output: "export",
  // Nextra's generated alias uses Windows path separators, which Turbopack
  // interprets as part of the module name instead of a filesystem path.
  turbopack: {
    resolveAlias: {
      "@theguild/remark-mermaid/mermaid": remarkMermaidComponent,
    },
  },
  // Disable image optimization for static export and the static generated site.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "komarev.com",
      },
      {
        protocol: "https",
        hostname: "icon.icepanel.io",
      },
    ],
  },
});
