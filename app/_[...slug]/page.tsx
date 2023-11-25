import { fetchPageBySlug, fetchPages } from '@/lib/common/mdx/client'
import { MarkdownPage } from '@/lib/common/mdx/renderer'
import { PageType } from '@/lib/common/mdx/types'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const pages = await fetchPages(PageType.Page)

  return pages
    .filter((page) => page.properties.slug)
    .map((page) => {
      // console.log('generateStaticParams', page.properties.slug)
      //
      return {
        params: {
          slug: page.properties.slug,
        },
      }
    })
}

export default async function Page({ params, ...rest }: { params: { slug: string[] } }) {
  // // console.log('/[...slug]', { params, rest })
  // if (!params.slug || !Array.isArray(params.slug) || params.slug.length === 0) {
  //   return null
  // }
  const page = await fetchPageBySlug(params.slug.join('/'), PageType.Page)
  if (!page) {
    notFound()
  }

  return <MarkdownPage page={page} />
}
