import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { readFileSync } from 'node:fs'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import { getContentPublishedAt, withContentLastUpdated } from '../../lib/content-last-updated.mjs'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
    const params = await props.params
    const { metadata } = await importPage(params.mdxPath)
    return withContentLastUpdated(metadata)
}

const Wrapper = getMDXComponents().wrapper
const Heading = getMDXComponents().h1
const dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
})

export default async function Page(props) {
    const params = await props.params
    const result = await importPage(params.mdxPath)
    const { default: MDXContent, toc, metadata } = result
    const publishedAt = getContentPublishedAt(metadata.filePath)
    const showPublishedAt = publishedAt && !['content/index.mdx', 'content/about.mdx'].includes(metadata.filePath)
    const hasHeading = metadata.filePath && /^#\s+\S/m.test(readFileSync(metadata.filePath, 'utf8'))
    const publishedByline = showPublishedAt && (
        <p className="x:mt-2 x:text-sm x:text-gray-600 x:dark:text-gray-400">
            Published on <time dateTime={publishedAt}>{dateFormatter.format(new Date(publishedAt))}</time>
        </p>
    )
    const PageHeading = (headingProps) => (
        <>
            <Heading {...headingProps} />
            {publishedByline}
        </>
    )
    return (
        <Wrapper toc={toc} metadata={withContentLastUpdated(metadata)}>
            {showPublishedAt && !hasHeading && <><Heading>{metadata.title}</Heading>{publishedByline}</>}
            <MDXContent {...props} params={params} components={showPublishedAt && hasHeading ? { h1: PageHeading } : undefined} />
        </Wrapper>
    )
}
