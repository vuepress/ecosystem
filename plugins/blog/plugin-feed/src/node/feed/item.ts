import {
  getPageExcerpt,
  getPageText,
  isArray,
  isFunction,
  isLinkAbsolute,
  isLinkWithProtocol,
  isPlainObject,
} from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type { PageFrontmatter } from 'vuepress/shared'
import { isString } from 'vuepress/shared'
import type {
  AuthorInfo,
  FeedAuthor,
  FeedCategory,
  FeedContributor,
  FeedEnclosure,
  FeedFrontmatterOption,
  FeedGetter,
  FeedPage,
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
  private readonly pageOptions: FeedFrontmatterOption
  private readonly frontmatter: PageFrontmatter<FeedPluginFrontmatter>
  private readonly base: string
  private readonly getter: FeedGetter

  public constructor(
    private readonly app: App,
    private readonly options: ResolvedFeedOptions,
    private readonly page: FeedPage,
    private readonly hostname: string,
  ) {
    this.base = this.app.siteData.base
    this.frontmatter = page.frontmatter
    this.getter = options.getter ?? {}
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.pageOptions = this.frontmatter.feed || {}
  }

  /**
   * Feed item title
   */
  public get title(): string {
    if (isFunction(this.getter.title))
      return this.getter.title(this.page, this.app)

    return this.pageOptions.title || this.page.title
  }

  /**
   * The URL of the item.
   */
  public get link(): string {
    if (isFunction(this.getter.link))
      return this.getter.link(this.page, this.app)

    return getUrl(this.hostname, this.base, this.page.path)
  }

  /**
   * Feed item description.
   */
  public get description(): string | null {
    if (isFunction(this.getter.description))
      return this.getter.description(this.page, this.app)

    if (this.pageOptions.description) return this.pageOptions.description

    if (this.frontmatter.description) return this.frontmatter.description

    const pageText = getPageText(this.app, this.page, { length: 180 })

    return pageText.length > 180 ? `${pageText.slice(0, 177)}...` : pageText
  }

  /**
   * A string that uniquely identifies feed item.
   */
  public get guid(): string {
    return this.pageOptions.guid || this.link
  }

  /**
   * Authors of feed item.
   */
  public get author(): FeedAuthor[] {
    if (isFunction(this.getter.author))
      return this.getter.author(this.page, this.app)

    if (isArray(this.pageOptions.author)) return this.pageOptions.author

    if (isPlainObject(this.pageOptions.author)) return [this.pageOptions.author]

    return this.frontmatter.author
      ? getFeedAuthor(this.frontmatter.author)
      : this.options.channel?.author
        ? getFeedAuthor(this.options.channel.author as AuthorInfo)
        : []
  }

  /**
   * Categories of feed item.
   */
  public get category(): FeedCategory[] | null {
    if (isFunction(this.getter.category))
      return this.getter.category(this.page, this.app)

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
  public get enclosure(): FeedEnclosure | null {
    if (isFunction(this.getter.enclosure))
      return this.getter.enclosure(this.page, this.app)

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
  public get pubDate(): Date | null {
    if (isFunction(this.getter.publishDate))
      return this.getter.publishDate(this.page, this.app)

    const { time, date = time } = this.page.frontmatter

    const { createdTime } = this.page.data.git ?? {}

    return date && date instanceof Date
      ? date
      : createdTime
        ? new Date(createdTime)
        : null
  }

  /**
   * Indicates when feed item was updated.
   */
  public get lastUpdated(): Date | null {
    if (isFunction(this.getter.lastUpdateDate))
      return this.getter.lastUpdateDate(this.page, this.app)

    const { updatedTime } = this.page.data.git ?? {}

    return updatedTime ? new Date(updatedTime) : null
  }

  /**
   * Feed item summary
   */
  public get summary(): string | null {
    if (isFunction(this.getter.excerpt))
      return this.getter.excerpt(this.page, this.app)

    if (this.pageOptions.summary) return this.pageOptions.summary

    return getPageExcerpt(this.app, this.page, {
      isCustomElement: this.options.isPreservedElement,
    })
  }

  /**
   * Feed Item content
   */

  public get content(): string {
    if (isFunction(this.getter.content))
      return this.getter.content(this.page, this.app)

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
  public get image(): string | null {
    if (isFunction(this.getter.image))
      return this.getter.image(this.page, this.app)

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
  public get contributor(): FeedContributor[] {
    if (isFunction(this.getter.contributor))
      return this.getter.contributor(this.page, this.app)

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
  public get copyright(): string | null {
    if (isFunction(this.getter.copyright))
      return this.getter.copyright(this.page, this.app)

    if (isString(this.frontmatter.copyright)) return this.frontmatter.copyright
    const firstAuthor = this.author[0]

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (firstAuthor?.name) return `Copyright by ${firstAuthor.name}`

    return null
  }

  public get isValid(): boolean {
    return Boolean(this.title || this.description)
  }
}
