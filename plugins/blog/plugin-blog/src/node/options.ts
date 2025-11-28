/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PageExcerptOptions } from '@vuepress/helper'
import type { Page } from 'vuepress/core'

export interface BlogCategoryOptions<
  ExtraPageData extends Record<any, any> = Record<never, never>,
  ExtraPageFrontmatter extends Record<any, any> = Record<string, unknown>,
  ExtraPageFields extends Record<any, any> = Record<never, never>,
> {
  /**
   * Unique category name
   *
   * 唯一的分类名称
   */
  key: string

  /**
   * Function to extract category values from page
   *
   * 从页面中获取分类值的函数
   */
  getter: (
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => string[]

  /**
   * Custom function to sort pages
   *
   * 自定义页面排序函数
   */
  sorter?: (
    pageA: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    pageB: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => number

  /**
   * Path pattern for category page
   *
   * 分类页面路径模式
   *
   * @description `:key` will be replaced by slugified category key
   *
   * `:key` 将被替换为经过 slugify 处理的分类键名
   *
   * @default `/:key/`
   */
  path?: string | false

  /**
   * Layout component name for category page
   *
   * 分类页面的布局组件名称
   *
   * @default "Layout"
   */
  layout?: string

  /**
   * Frontmatter configuration for category page
   *
   * 分类页面的 frontmatter 配置
   */
  frontmatter?: (localePath: string) => Record<string, unknown>

  /**
   * Path pattern for category item pages
   *
   * 分类子项页面路径模式
   *
   * @description `:key` and `:name` will be replaced by slugified values
   *
   * `:key` 和 `:name` 将被替换为经过 slugify 处理的值
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | false | ((name: string) => string)

  /**
   * Layout component name for category item pages
   *
   * 分类子项页面的布局组件名称
   *
   * @default "Layout"
   */
  itemLayout?: string

  /**
   * Frontmatter configuration for category item pages
   *
   * 分类子项页面的 frontmatter 配置
   */
  itemFrontmatter?: (
    name: string,
    localePath: string,
  ) => Record<string, unknown>
}

export interface BlogTypeOptions<
  ExtraPageData extends Record<any, any> = Record<never, never>,
  ExtraPageFrontmatter extends Record<any, any> = Record<string, unknown>,
  ExtraPageFields extends Record<any, any> = Record<never, never>,
> {
  /**
   * Unique type name
   *
   * 唯一的类型名称
   */
  key: string

  /**
   * Filter function to determine if page belongs to this type
   *
   * 用于确定页面是否属于此类型的过滤函数
   */
  filter: (
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => boolean

  /**
   * Custom function to sort pages
   *
   * 自定义页面排序函数
   */
  sorter?: (
    pageA: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    pageB: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => number

  /**
   * Path for type page
   *
   * 类型页面路径
   *
   * @default "/:key/"
   */
  path?: string | false

  /**
   * Layout component name for type page
   *
   * 类型页面的布局组件名称
   *
   * @default "Layout"
   */
  layout?: string

  /**
   * Frontmatter configuration for type page
   *
   * 类型页面的 frontmatter 配置
   */
  frontmatter?: (localePath: string) => Record<string, unknown>
}

export interface BlogPluginPageData {
  /**
   * Page excerpt content
   *
   * 页面摘要内容
   */
  excerpt?: string
}

export interface BlogPluginOptions extends Pick<
  PageExcerptOptions,
  'isCustomElement' | 'keepFenceDom' | 'keepPageTitle'
> {
  /**
   * Function to extract article information from page
   *
   * 从页面中提取文章信息的函数
   */
  getInfo?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => Record<string, unknown>

  /**
   * Function to filter pages for blog articles
   *
   * 用于过滤博客文章页面的函数
   *
   * @default (page) => Boolean(page.filePathRelative) && !page.frontmatter.home
   */
  filter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => boolean

  /**
   * Category configurations
   *
   * 分类配置
   */
  category?: BlogCategoryOptions[]

  /**
   * Type configurations
   *
   * 类型配置
   */
  type?: BlogTypeOptions[]

  /**
   * Key for injecting article info into route meta
   *
   * 注入文章信息到路由元数据的键名
   *
   * @default "_blog"
   */
  metaScope?: string

  /**
   * Function to convert strings to URL-friendly slugs
   *
   * 将字符串转换为 URL 友好格式的函数
   *
   * @default (name) => name.replace(/ _/g, "-").toLowerCase()
   */
  slugify?: (name: string) => string

  /**
   * Whether to generate excerpt for pages
   *
   * 是否为页面生成摘要
   *
   * @default true
   */
  excerpt?: boolean

  /**
   * Separator for manual excerpt in content
   *
   * 内容中手动摘要的分隔符
   *
   * @default "<!-- more -->"
   */
  excerptSeparator?: string
  /**
   * Target length for auto-generated excerpts
   *
   * 自动生成摘要的目标长度
   *
   * @description Excerpt length will be the minimal possible length reaching this value
   *
   * 摘要长度将是达到此值的最小可能长度
   *
   * @default 300
   */
  excerptLength?: number

  /**
   * Function to filter pages for excerpt generation
   *
   * 用于过滤需要生成摘要的页面的函数
   *
   * @description Use this to skip pages that don't need excerpt generation
   *
   * 使用此函数跳过不需要生成摘要的页面
   *
   * @default options.filter
   */
  excerptFilter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => boolean

  /**
   * Whether to enable hot reload in development
   *
   * 是否在开发环境启用热重载
   *
   * @description May impact performance on large sites
   *
   * 在大型站点上可能影响性能
   *
   * @default app.env.isDebug
   */
  hotReload?: boolean
}
