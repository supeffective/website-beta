import { cn } from '@/lib/utils'
import bookmarkPlugin from '@notion-render/bookmark-plugin'
import { NotionRenderer } from '@notion-render/client'
import hljsPlugin from '@notion-render/hljs-plugin'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { ComponentPropsWithoutRef } from 'react'
import { notionClient } from './client'

const notionRenderer = new NotionRenderer({
  client: notionClient,
})

notionRenderer.use(hljsPlugin({}))
notionRenderer.use(bookmarkPlugin(undefined))

type NotionBodyProps = {
  blocks: BlockObjectResponse[]
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export async function NotionBody({ blocks, className, ...rest }: NotionBodyProps) {
  const html = await notionRenderer.render(...blocks)
  return <div className={cn('notion-page-body', className)} {...rest} dangerouslySetInnerHTML={{ __html: html }} />
}
