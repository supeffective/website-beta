import 'server-only'

import { envVars } from '@/config/envVars'
import { waitMs } from '@/lib/utils'
import { Client } from '@notionhq/client'
import {
  BlockObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'
import { PageEntry, PageProperty, PageStatus, PageType } from './types'

// Wait 1s between requests to avoid rate limiting issues (Notion API allows 3 requests per second)
const SLOWDOWN_MS = 1000

export const notionClient = new Client({
  auth: envVars.NOTION_TOKEN,
})

export const fetchPages = cache(async (pageType: PageType) => {
  console.log('notion: fetchPages', pageType)
  const query: QueryDatabaseParameters = {
    database_id: _getDatabaseId(pageType),
    filter: {
      property: PageProperty.Status,
      status: {
        equals: PageStatus.Published,
      },
    },
  }
  const pages = await notionClient.databases
    .query(query)
    .then((res) => res.results.map((page) => _transformPage(page as PageObjectResponse, pageType)))

  await waitMs(SLOWDOWN_MS)
  return pages
})

export const fetchPageBySlug = cache(async (slug: string, pageType: PageType) => {
  console.log('notion: fetchPageBySlug', slug)
  const page = await notionClient.databases
    .query({
      database_id: _getDatabaseId(pageType),
      filter: {
        property: PageProperty.Slug,
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => (res.results[0] ? _transformPage(res.results[0] as PageObjectResponse, pageType) : null))

  await waitMs(SLOWDOWN_MS)
  return page
})

export const fetchPageBlocks = cache(async (pageId: string) => {
  console.log('notion: fetchPageBlocks', pageId)
  const blocks = await notionClient.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[])

  await waitMs(SLOWDOWN_MS)
  return blocks
})

function _getDatabaseId(pageType: PageType) {
  switch (pageType) {
    case PageType.Singleton:
      return envVars.NOTION_SINGLETON_PAGES_DATABASE_ID
    case PageType.Page:
      return envVars.NOTION_PAGES_DATABASE_ID
    case PageType.Post:
      return envVars.NOTION_BLOG_DATABASE_ID
    default:
      throw new Error(`Unknown page type: ${pageType}`)
  }
}

function _transformPage(notionPage: PageObjectResponse, pageType: PageType): PageEntry {
  const page: Record<string, any> = {
    id: notionPage.id,
    type: pageType,
    properties: {},
  }
  const pageProps = Object.values(PageProperty)

  Object.entries(notionPage.properties).forEach(([key, value]) => {
    switch (value.type) {
      case 'rich_text':
        page.properties[key] = value.rich_text[0]?.plain_text ?? null
        break
      case 'date':
        const date = value.date?.start ?? value.date?.end
        page.properties[key] = date ? new Date(date) : null
        break
      case 'select':
        page.properties[key] = value.select?.name ?? null
        break
      case 'number':
        page.properties[key] = value.number
        break
      case 'unique_id':
        page.properties[key] = value.unique_id
        break
      case 'multi_select':
        page.properties[key] = value.multi_select.map((item) => item.name)
        break
      case 'status':
        page.properties[key] = value.status
        break
      case 'title':
        page.properties[key] = value.title[0]?.plain_text ?? null
        break
      case 'checkbox':
        page.properties[key] = value.checkbox
        break
      case 'created_time':
        page.properties[key] = new Date(value.created_time)
        break
      case 'last_edited_time':
        page.properties[key] = new Date(value.last_edited_time)
        break
      case 'url':
        page.properties[key] = value.url
        break
      case 'email':
        page.properties[key] = value.email
        break
      default:
        throw new Error(`Unknown property type: ${value.type}`)
    }
  })

  // check if all required properties are present
  pageProps.forEach((prop) => {
    if (page.properties[prop] === undefined) {
      throw new Error(`Missing Page property: ${prop}`)
    }
  })

  return page as PageEntry
}
