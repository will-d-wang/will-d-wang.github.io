import { MetaRecord } from "nextra";

const DOCS_ITEMS: MetaRecord = {
  index: "Start Here",
  sre: "SRE",
  infrastructure: "Infrastructure",
  devops: "DevOps",
  platform: "Platform Engineering",
  ai: "AI for Engineering",
  projects: "Projects (portfolio)",
};

const globalMeta = {
  index: {
    type: "page",
    title: "Home",
    theme: {
      layout: "full",
      toc: false,
      timestamp: false,
    },
  },
  docs: {
    type: "page",
    title: "Learn",
    items: DOCS_ITEMS,
  },
  labs: {
    type: "page",
    title: "Labs",
  },
  "field-notes": {
    type: "page",
    title: "Field Notes",
  },
  about: {
    type: "page",
    title: "About",
    theme: { layout: "full", toc: false, timestamp: false },
  },
};

export default globalMeta;
