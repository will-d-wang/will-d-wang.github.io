import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import { withContentLastUpdated } from '../../lib/content-last-updated.mjs'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
    const params = await props.params
    const { metadata } = await importPage(params.mdxPath)
    return withContentLastUpdated(metadata)
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
    const params = await props.params
    const result = await importPage(params.mdxPath)
    const { default: MDXContent, toc, metadata } = result
    return (
        <Wrapper toc={toc} metadata={withContentLastUpdated(metadata)}>
            <MDXContent {...props} params={params} />
        </Wrapper>
    )
}
