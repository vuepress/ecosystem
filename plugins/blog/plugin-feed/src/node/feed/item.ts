import {
  getPageExcerpt,
  getPageText,
  isArray,
  isFunction,
  isLinkAbsolute,
  isLinkWithProtocol,
  isPlainObject,
} from '@vuepress/helper'
import type { GitData } from '@vuepress/plugin-git'
import type { App, Page } from 'vuepress/core'
import { isString } from 'vuepress/shared'
import type { PageFrontmatter } from 'vuepress/shared'
import type {
  AuthorInfo,
  FeedAuthor,
  FeedCategory,
  FeedContributor,
  FeedEnclosure,
  FeedFrontmatterOption,
  FeedGetter,
  FeedPluginFrontmatter,
} from '../../typings/index.js'
import type { ResolvedFeedOptions } from '../getFeedOptions.js'
import {
  getFeedAuthor,
  getFeedCategory,
  getImageMineType,
  getUrl,
} from '../utils/index.js'

export class FeedItem {
  private pageOptions: FeedFrontmatterOption
  private frontmatter: PageFrontmatter<FeedPluginFrontmatter>
  private base: string
  private getter: FeedGetter

  constructor(
    private app: App,
    private options: ResolvedFeedOptions,
    private page: Page<
      { excerpt?: string; git?: GitData },
      FeedPluginFrontmatter
    >,
    private hostname: string,
  ) {
    this.base = this.app.options.base
    this.frontmatter = page.frontmatter
    this.getter = options.getter || {}
    this.pageOptions = this.frontmatter.feed || {}
  }

  /**
   * Feed item title
   */
  get title(): string {
    if (isFunction(this.getter.title)) return this.getter.title(this.page)

    return this.pageOptions.title || this.page.title
  }

  /**
   * The URL of the item.
   */
  get link(): string {
    if (isFunction(this.getter.link)) return this.getter.link(this.page)

    return getUrl(this.hostname, this.base, this.page.path)
  }

  /**
   * Feed item description.
   */
  get description(): string | null {
    if (isFunction(this.getter.description))
      return this.getter.description(this.page)

    if (this.pageOptions.description) return this.pageOptions.description

    if (this.frontmatter.description) return this.frontmatter.description

    const pageText = getPageText(this.app, this.page, { length: 180 })

    return pageText.length > 180 ? `${pageText.slice(0, 177)}...` : pageText
  }

  /**
   * A string that uniquely identifies feed item.
   */
  get guid(): string {
    return this.pageOptions.guid || this.link
  }

  /**
   * Authors of feed item.
   */
  get author(): FeedAuthor[] {
    if (isFunction(this.getter.author)) return this.getter.author(this.page)

    if (isArray(this.pageOptions.author)) return this.pageOptions.author

    if (isPlainObject(this.pageOptions.author)) return [this.pageOptions.author]

    return this.frontmatter.author
      ? getFeedAuthor(this.frontmatter.author)
      : this.options.channel?.author
        ? getFeedAuthor(this.options.channel?.author as AuthorInfo)
        : []
  }

  /**
   * Categories of feed item.
   */
  get category(): FeedCategory[] | null {
    if (isFunction(this.getter.category)) return this.getter.category(this.page)

    if (isArray(this.pageOptions.category)) return this.pageOptions.category

    if (isPlainObject(this.pageOptions.category))
      return [this.pageOptions.category]

    const { categories, category = categories } = this.frontmatter

    return getFeedCategory(category).map((item) => ({ name: item }))
  }

  /**
   * Describes a media object that is attached to feed item.
   *
   * @description rss format only
   */
  get enclosure(): FeedEnclosure | null {
    if (isFunction(this.getter.enclosure))
      return this.getter.enclosure(this.page)

    if (this.image)
      return {
        url: this.image,
        type: getImageMineType(this.image.split('.').pop()),
      }

    return null
  }

  /**
   * Indicates when feed item was published.
   */
  get pubDate(): Date | null {
    if (isFunction(this.getter.publishDate))
      return this.getter.publishDate(this.page)

    const { time, date = time } = this.page.frontmatter

    const { createdTime } = this.page.data.git || {}

    return date && date instanceof Date
      ? date
      : createdTime
        ? new Date(createdTime)
        : null
  }

  /**
   * Indicates when feed item was updated.
   */
  get lastUpdated(): Date {
    if (isFunction(this.getter.lastUpdateDate))
      return this.getter.lastUpdateDate(this.page)

    const { updatedTime } = this.page.data.git || {}

    return updatedTime ? new Date(updatedTime) : new Date()
  }

  /**
   * Feed item summary
   */
  get summary(): string | null {
    if (isFunction(this.getter.excerpt)) return this.getter.excerpt(this.page)

    if (this.pageOptions.summary) return this.pageOptions.summary

    return getPageExcerpt(this.app, this.page, {
      isCustomElement: this.options.isPreservedElement,
    })
  }

  /**
   * Feed Item content
   */

  get content(): string {
    if (isFunction(this.getter.content)) return this.getter.content(this.page)

    if (this.pageOptions.content) return this.pageOptions.content

    return getPageExcerpt(this.app, this.page, {
      isCustomElement: this.options.isPreservedElement,
      separator: '',
      length: Infinity,
    })
  }

  /**
   * Image of feed item
   *
   * @description json format only
   */
  get image(): string | null {
    if (isFunction(this.getter.image)) return this.getter.image(this.page)

    const { hostname, base } = this
    const { banner, cover } = this.frontmatter

    if (banner) {
      if (isLinkAbsolute(banner)) return getUrl(hostname, base, banner)

      if (isLinkWithProtocol(banner)) return banner
    }

    if (cover) {
      if (isLinkAbsolute(cover)) return getUrl(hostname, base, cover)

      if (isLinkWithProtocol(cover)) return cover
    }

    const result = /!\[.*?\]\((.*?)\)/iu.exec(this.page.content)

    if (result) {
      if (isLinkAbsolute(result[1])) return getUrl(hostname, base, result[1])

      if (isLinkWithProtocol(result[1])) return result[1]
    }

    return null
  }

  /**
   * Contributors of feed item.
   *
   * @description atom format only
   */
  get contributor(): FeedContributor[] {
    if (isFunction(this.getter.contributor))
      return this.getter.contributor(this.page)

    if (isArray(this.pageOptions.contributor))
      return this.pageOptions.contributor

    if (isPlainObject(this.pageOptions.contributor))
      return [this.pageOptions.contributor]

    return this.author
  }

  /**
   * Copyright text of feed item.
   *
   * @description atom format only
   */
  get copyright(): string | null {
    if (isFunction(this.getter.copyright))
      return this.getter.copyright(this.page)

    if (isString(this.frontmatter.copyright)) return this.frontmatter.copyright
    const firstAuthor = this.author[0]

    if (firstAuthor?.name) return `Copyright by ${firstAuthor.name}`

    return null
  }

  get isValid(): boolean {
    return Boolean(this.title || this.description)
  }
}
