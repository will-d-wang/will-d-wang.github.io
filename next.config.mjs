import nextra from "nextra";

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
});

export default withNextra({
  // output: "export", // Commented out for local development
  images: {
    unoptimized: true,
  },
});
