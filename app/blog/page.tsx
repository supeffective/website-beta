import { fetchPages } from '@/lib/common/mdx/client'
import { PageType } from '@/lib/common/mdx/types'
import Link from 'next/link'

const pageType = PageType.Blog

export default async function Page({ params }: { params: { slug: string } }) {
  const pages = await fetchPages(pageType)

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {pages
          .filter((page) => page.properties.slug)
          .map((page) => {
            return (
              <li key={page.properties.slug}>
                <time>{page.properties.publishedAt?.toLocaleString().split(' ')[0]}</time>{' '}
                <Link href={`/blog/${page.properties.slug}`}>{page.properties.title}</Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
