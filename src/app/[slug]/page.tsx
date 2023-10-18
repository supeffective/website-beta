import { fetchPageBlocks, fetchPageBySlug, fetchPages } from '@/lib/services/notion/client'
import { NotionBody } from '@/lib/services/notion/renderer'
import { PageType } from '@/lib/services/notion/types'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const pages = await fetchPages(PageType.Page)

  return pages
    .filter((page) => page.properties.Slug)
    .map((page) => {
      console.log('generateStaticParams', page.properties.Slug)
      return {
        params: {
          slug: page.properties.Slug,
        },
      }
    })
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPageBySlug(params.slug, PageType.Page)
  if (!post) {
    notFound()
  }

  const blocks = await fetchPageBlocks(post.id)

  return <NotionBody blocks={blocks} />
}
