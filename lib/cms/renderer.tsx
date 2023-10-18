import 'server-only'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { ComponentPropsWithoutRef } from 'react'
import { cn } from '../utils'
import components from './available-components'
import { PageEntry } from './types'

type MarkdownPageProps = {
  page: PageEntry
  asExcerpt?: boolean
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export async function MarkdownPage({ page, asExcerpt, className, ...rest }: MarkdownPageProps) {
  return (
    <div className={cn(className)} {...rest}>
      <h2>{page.properties.title}</h2>
      <time>{page.properties.publishedAt?.toLocaleString()}</time>
      <MDXRemote source={asExcerpt ? page.excerpt : page.content} components={components} />
    </div>
  )
}
