import { importPage } from "nextra/pages";

export async function generateStaticParams() {
  // This will be populated by Nextra's build process
  return [];
}

export async function generateMetadata(props: any) {
  const params = await props.params;
  // Prepend "docs" to match content/docs/ structure
  const fullPath = ["docs", ...params.mdxPath];
  const { metadata } = await importPage(fullPath);
  return metadata;
}

export default async function Page(props: any) {
  const params = await props.params;

  // Prepend "docs" to match content/docs/ structure
  const fullPath = ["docs", ...params.mdxPath];

  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(fullPath);

  return (
    <article>
      <MDXContent {...props} />
    </article>
  );
}
