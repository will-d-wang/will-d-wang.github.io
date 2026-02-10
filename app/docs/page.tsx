import { importPage } from "nextra/pages";

export async function generateMetadata() {
  const { metadata } = await importPage(["docs"]);
  return metadata;
}

export default async function DocsPage(props: any) {
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(["docs"]);

  return (
    <article>
      <MDXContent {...props} />
    </article>
  );
}
