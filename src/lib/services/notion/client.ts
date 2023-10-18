import 'server-only'

import { envVars } from '@/config/envVars'
import { Client } from '@notionhq/client'
import {
  BlockObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'
import { PageEntry, PageProperty, PageStatus, PageType } from './types'

export const notionClient = new Client({
  auth: envVars.NOTION_TOKEN,
})

function getDatabaseId(pageType: PageType) {
  switch (pageType) {
    case PageType.Page:
      return envVars.NOTION_PAGES_DATABASE_ID
    case PageType.Post:
      return envVars.NOTION_BLOG_DATABASE_ID
    default:
      throw new Error(`Unknown page type: ${pageType}`)
  }
}

export const fetchPages = cache((pageType: PageType) => {
  const query: QueryDatabaseParameters = {
    database_id: getDatabaseId(pageType),
    filter: {
      property: PageProperty.Status,
      status: {
        equals: PageStatus.Published,
      },
    },
  }
  console.log('notion: fetchPages', pageType, query)
  return notionClient.databases
    .query(query)
    .then((res) => res.results.map((page) => transformPage(page as PageObjectResponse, pageType)))
})

export const fetchPageBySlug = cache(async (slug: string, pageType: PageType) => {
  console.log('notion: fetchPageBySlug', slug, pageType)
  return notionClient.databases
    .query({
      database_id: getDatabaseId(pageType),
      filter: {
        property: PageProperty.Slug,
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => (res.results[0] ? transformPage(res.results[0] as PageObjectResponse, pageType) : null))
})

export const fetchPageBlocks = cache(async (pageId: string) => {
  console.log('notion: fetchPageBlocks', pageId)
  return notionClient.blocks.children.list({ block_id: pageId }).then((res) => res.results as BlockObjectResponse[])
})

function transformPage(notionPage: PageObjectResponse, pageType: PageType): PageEntry {
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
