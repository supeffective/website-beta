export enum PageType {
  Singleton = 'singleton',
  Page = 'page',
  Blog = 'blog',
}

export enum PageStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export enum PageProperty {
  Title = 'title',
  Slug = 'slug',
  Status = 'status',
  PublishedAt = 'publishedAt',
  UpdatedAt = 'updatedAt',
  MetaTitle = 'metaTitle',
  MetaDescription = 'metaDescription',
  Robots = 'robots',
}

type PageProperties<
  T extends {
    [key in PageProperty]: any
  },
> = T

export type PageEntry = {
  id: string
  type: PageType
  content: string
  excerpt: string
  properties: PageProperties<{
    title: string
    slug: string
    status: PageStatus
    publishedAt: Date | null
    updatedAt: Date | null
    metaTitle: string
    metaDescription: string
    robots: string
  }>
}
