import nextra from "nextra";

const withNextra = nextra({
  search: true,
  defaultShowCopyCode: true,
  latex: true,
});

export default withNextra({
  // ... Other Next.js config options
  output: "export",
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
    ],
  },
});
