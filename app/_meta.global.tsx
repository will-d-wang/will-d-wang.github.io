import { MetaRecord } from "nextra";

const DOCS_ITEMS: MetaRecord = {
  index: "",
};

export default {
  index: {
    type: "page",
    theme: {
      layout: "full",
      toc: false,
      timestamp: false,
    },
  },
  docs: {
    type: "page",
    title: "Documentation",
    items: DOCS_ITEMS,
  },
  // article: {
  //   type: "page",
  //   theme: {
  //     toc: false,
  //     typesetting: "article",
  //   },
  // },
};
