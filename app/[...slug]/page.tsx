import { fetchPageBySlug, fetchPages } from '@/lib/utils/mdx/client'
import { MarkdownPage } from '@/lib/utils/mdx/renderer'
import { PageType } from '@/lib/utils/mdx/types'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const pages = await fetchPages(PageType.Page)

  return pages
    .filter((page) => page.properties.slug)
    .map((page) => {
      return {
        params: {
          slug: page.properties.slug,
        },
      }
    })
}

export default async function Page({ params, ...rest }: { params: { slug: string[] } }) {
  const page = await fetchPageBySlug(params.slug.join('/'), PageType.Page)
  if (!page) {
    notFound()
  }

  return <MarkdownPage page={page} />
}
