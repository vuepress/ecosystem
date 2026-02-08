import type { App } from 'vuepress/core'
import type {
  FeedCategory,
  FeedChannelOptions,
  FeedContributor,
} from '../../typings/index.js'
import { getFeedChannelOptions } from '../getFeedChannelOptions.js'
import type { FeedLinks } from '../getFeedLinks.js'
import { getFeedLinks } from '../getFeedLinks.js'
import type { ResolvedFeedOptions } from '../getFeedOptions.js'
import type { FeedItem } from './item.js'

/**
 * Feed store for managing feed items and channel information
 *
 * 用于管理 Feed 项目和频道信息的存储
 */
export class FeedStore {
  public categories = new Set<string>()
  public contributors: FeedContributor[] = []
  public items: FeedItem[] = []

  private readonly contributorKeys = new Set<string>()
  public channel: FeedChannelOptions
  public links: FeedLinks

  public constructor(
    app: App,
    localeOptions: ResolvedFeedOptions,
    localePath: string,
  ) {
    this.channel = getFeedChannelOptions(app, localeOptions, localePath)
    this.links = getFeedLinks(app, localeOptions, localePath)
  }

  /**
   * Add category to store
   *
   * @param category - Category to add / 要添加的分类
   */
  private readonly addCategory = (category: FeedCategory): void => {
    this.categories.add(category.name)
  }

  /**
   * Add contributor to store
   *
   * @param contributor - Contributor to add / 要添加的贡献者
   */
  private readonly addContributor = (contributor: FeedContributor): void => {
    // use keys to avoid adding same contributor
    const key = contributor.email || contributor.name

    if (key && !this.contributorKeys.has(key)) {
      this.contributorKeys.add(key)
      this.contributors.push(contributor)
    }
  }

  /**
   * Add a feed item / 添加一个 Feed 项目
   *
   * @param item - Item to add / 要添加的项目
   */
  public add = (item: FeedItem): void => {
    if (item.isValid) {
      const { category, contributor } = item

      this.items.push(item)
      category?.forEach((cate) => {
        this.addCategory(cate)
      })
      contributor.forEach((cont) => {
        this.addContributor(cont)
      })
    }
  }
}
