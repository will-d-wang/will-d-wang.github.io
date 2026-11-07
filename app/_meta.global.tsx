import { MetaRecord } from "nextra";

const DOCS_ITEMS: MetaRecord = {
  index: "Start Here",
  "--guided-paths": { type: "separator", title: "Guided paths" },
  sre: "SRE",
  infrastructure: "Infrastructure",
  devops: "DevOps",
  platform: "Platform Engineering",
  ai: { display: "hidden" },
  "--practice": { type: "separator", title: "Engineering practice" },
  DevSecOps: "Delivery & Operations",
  Tools: "Tools & Runbooks",
  Security: "Security",
  "System-Design": "Systems Design",
  "--foundations": { type: "separator", title: "Foundations" },
  Network: "Networking",
  Database: "Databases",
  Coding: "Programming",
  Algorithms: "Algorithms",
  Hardware: "Computer Hardware",
  "--archive": { type: "separator", title: "More from the archive" },
  OMSCS: "Graduate Coursework",
  "Career-Plan": "Career Notes",
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
  ai: {
    type: "page",
    title: "AI",
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
