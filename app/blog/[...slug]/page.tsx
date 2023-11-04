import { fetchPageBySlug, fetchPages } from '@/lib/common/mdx/client'
import { MarkdownPage } from '@/lib/common/mdx/renderer'
import { PageType } from '@/lib/common/mdx/types'
import { notFound } from 'next/navigation'

const pageType = PageType.Blog

export async function generateStaticParams() {
  const pages = await fetchPages(pageType)

  return pages
    .filter((page) => page.properties.slug)
    .map((page) => {
      // console.log('generateStaticParams blog/', page.properties.slug)
      return {
        params: {
          slug: page.properties.slug,
        },
      }
    })
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const page = await fetchPageBySlug(params.slug.join('/'), pageType)
  if (!page) {
    notFound()
  }

  return <MarkdownPage page={page} />
}
