import '@/lib/common/env/server-only'

import { envVars } from '@/config/env/server-vars'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { existsSync } from 'node:fs'
import { PageEntry, PageType } from './types'

const BASEDIR = envVars.MDX_RELATIVE_DIR

function listMarkdownFiles(pageType: PageType) {
  const files = fg.sync([`${BASEDIR}/${pageType}/**/*.mdx`, `${BASEDIR}/${pageType}/**/*.md`], {
    cwd: process.cwd(),
    absolute: false,
  })

  return files
}

export function resolveMarkdownFilePath(slug: string, pageType: PageType): string | null {
  const sanitizedSlug = slug.replace(/[.\\]/, '')
  const file1 = `${BASEDIR}/${pageType}/${sanitizedSlug}.mdx`
  const file2 = `${BASEDIR}/${pageType}/${sanitizedSlug}.md`

  if (existsSync(file1)) {
    return file1
  }

  if (existsSync(file2)) {
    return file2
  }

  return null
}

export function parseAllMarkdownPages(pageType: PageType): Array<PageEntry> {
  const files = listMarkdownFiles(pageType)

  return files.map((file) => {
    return parseMarkdownPage(file, pageType)
  })
}

export function parseMarkdownPage(file: string, pageType: PageType): PageEntry {
  {
    const { data, content, excerpt } = matter.read(file, { excerpt: true })
    const slug = file
      .replace(new RegExp(`^${BASEDIR}/${pageType}/`), '')
      .replace(/\.mdx?$/, '')
      .replace(/[_\/]/, '-')

    const properties: Partial<PageEntry['properties']> = {
      ...data,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
      slug,
    }

    return {
      id: slug,
      content: content,
      excerpt: excerpt ?? '',
      type: pageType,
      properties: properties as PageEntry['properties'],
    }
  }
}
