import { fetchPageBySlug, fetchPages } from '@/lib/services/mdx-cms/client'
import { MarkdownPage } from '@/lib/services/mdx-cms/renderer'
import { PageType } from '@/lib/services/mdx-cms/types'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const pages = await fetchPages(PageType.Page)

  return pages
    .filter((page) => page.properties.slug)
    .map((page) => {
      console.log('generateStaticParams', page.properties.slug)
      return {
        params: {
          slug: page.properties.slug,
        },
      }
    })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await fetchPageBySlug(params.slug, PageType.Page)
  if (!page) {
    notFound()
  }

  return <MarkdownPage page={page} />
}