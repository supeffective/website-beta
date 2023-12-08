import '@/lib/utils/env/server-only'

import { cache } from 'react'
import { parseAllMarkdownPages, parseMarkdownPage, resolveMarkdownFilePath } from './parser'
import { PageEntry, PageProperty, PageStatus, PageType } from './types'

export const fetchPages = cache(
  async (pageType: PageType, statuses: PageStatus[] = [PageStatus.Published]): Promise<Array<PageEntry>> => {
    const pages = parseAllMarkdownPages(pageType).sort((a, b) => {
      if (a.properties.publishedAt && b.properties.publishedAt) {
        return b.properties.publishedAt.getTime() - a.properties.publishedAt.getTime()
      }
      return 0
    })
    _validatePages(pages)
    return pages.filter((page) => statuses.includes(page.properties.status))
  },
)

export const fetchPageBySlug = cache(
  async (
    slug: string,
    pageType: PageType,
    statuses: PageStatus[] = [PageStatus.Published],
  ): Promise<PageEntry | undefined> => {
    const file = resolveMarkdownFilePath(slug, pageType)
    if (!file) {
      return undefined
    }
    const page = parseMarkdownPage(file, pageType)
    _validatePages([page])
    if (!statuses.includes(page.properties.status)) {
      return undefined
    }
    return page
  },
)

function _validatePages(pages: PageEntry[]): void {
  // TODO: use Zod
  const pageProps = Object.values(PageProperty)

  // check if all required properties are present
  pages.forEach((page, index) => {
    pageProps.forEach((prop) => {
      if (page.properties[prop] === undefined) {
        throw new Error(`Missing Page property '${prop}' in page '${page.id}'`)
      }
    })
  })
}
