export enum PageType {
  Singleton = 'singleton',
  Page = 'page',
  Post = 'post',
}

export enum PageStatus {
  NotStarted = 'Not Started',
  Draft = 'Draft',
  Published = 'Published',
  Archived = 'Archived',
}

export enum PageProperty {
  Title = 'Title',
  Slug = 'Slug',
  Status = 'Status',
  PublishDate = 'PublishDate',
  MetaTitle = 'MetaTitle',
  MetaDescription = 'MetaDescription',
  MetaRobots = 'MetaRobots',
}

type PageProperties<
  T extends {
    [key in PageProperty]: any
  },
> = T

export type PageEntry = {
  id: string
  type: PageType
  properties: PageProperties<{
    Title: string
    Slug: string
    Status: PageStatus
    PublishDate: Date
    MetaTitle: string | null
    MetaDescription: string | null
    MetaRobots: string[]
  }>
}
