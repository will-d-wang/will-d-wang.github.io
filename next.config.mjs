import nextra from "nextra";

const withNextra = nextra({
  search: true,
  defaultShowCopyCode: true,
});

export default withNextra({
  // ... Other Next.js config options
  output: "export",
  // Disable image optimization for static export and the static generated site.
  images: {
    unoptimized: true,
  },
});
