export interface JSONAuthor {
  name: string
  /** The URL of a site owned by the author. */
  url?: string
  avatar?: string
}

export interface JSONItem {
  /** Unique for that item for that feed over time. */
  id: string
  /** The URL of the resource described by the item. */
  url: string
  title: string
  /** This is the HTML or plain text of the item */
  content_html?: string
  /** A plain text sentence or two describing the item. */
  summary?: string
  /** The URL of the main image for the item. */
  image?: string
  /** Publish date */
  date_published?: string
  /** Last updated at */
  date_modified?: string
  /** Authors */
  authors?: JSONAuthor[]
  /** Categories */
  tags?: string[]
}

export interface JSONContent {
  /** The URL of the version of the format the feed uses. */
  version: 'https://jsonfeed.org/version/1.1'
  /** Name of the feed */
  title: string
  /** The URL of the resource that the feed describes */
  home_page_url: string
  /** The URL of the feed */
  feed_url?: string
  /** Provides more detail, beyond the title, on what the feed is about. */
  description?: string
  /** The URL of an image for the feed suitable to be used in a timeline */
  icon?: string
  /** The URL of an image for the feed suitable to be used in a source list. */
  favicon?: string
  /** Specifies one or more feed authors */
  authors?: JSONAuthor[]
  items?: JSONItem[]
}
