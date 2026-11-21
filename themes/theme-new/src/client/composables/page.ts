import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import type { PageDataRef } from 'vuepress/client'

import type { DefaultTheme, ThemePageData } from '../../shared/types.js'

export type { ThemePageData } from '../../shared/types.js'

/**
 * Link config of the previous/next page in frontmatter
 *
 * Frontmatter 中上一页/下一页的链接配置
 */
export interface ThemePageLink {
  /** Text of the link / 链接文本 */
  text?: string
  /** Link of the link / 链接地址 */
  link?: string
  /** `rel` attribute / `rel` 属性 */
  rel?: string
  /** `target` attribute / `target` 属性 */
  target?: string
}

/**
 * Pages link config in frontmatter
 *
 * Frontmatter 中上一页/下一页的配置
 */
export type ThemePageLinkConfig = string | ThemePageLink | false

/**
 * Action of the hero section in frontmatter
 *
 * Frontmatter 中首页 hero 区域的按钮配置
 */
export interface ThemeHeroAction {
  /** Theme of the action / 按钮主题 */
  theme?: 'brand' | 'alt'
  /** Text of the action / 按钮文本 */
  text: string
  /** Link of the action / 按钮链接 */
  link: string
  /** `target` attribute / `target` 属性 */
  target?: string
  /** `rel` attribute / `rel` 属性 */
  rel?: string
}

/**
 * Hero section config in frontmatter
 *
 * Frontmatter 中首页 hero 区域的配置
 */
export interface ThemeHero {
  /** Name of the hero / hero 区域的名称 */
  name?: string
  /** Text of the hero / hero 区域的文本 */
  text?: string
  /** Tagline of the hero / hero 区域的标语 */
  tagline?: string
  /** Image of the hero / hero 区域的图片 */
  image?: DefaultTheme.ThemeableImage
  /** Actions of the hero / hero 区域的按钮 */
  actions?: ThemeHeroAction[]
}

/**
 * Feature item config in frontmatter
 *
 * Frontmatter 中首页特性列表的配置
 */
export interface ThemeFeature {
  /** Icon of the feature / 特性图标 */
  icon?: DefaultTheme.FeatureIcon
  /** Title of the feature / 特性标题 */
  title: string
  /** Details of the feature / 特性详情 */
  details: string
  /** Link of the feature / 特性链接 */
  link?: string
  /** Text of the link / 链接文本 */
  linkText?: string
  /** `rel` attribute / `rel` 属性 */
  rel?: string
  /** `target` attribute / `target` 属性 */
  target?: string
}

/**
 * Frontmatter of a page rendered by the ported VitePress theme
 *
 * 由移植的 VitePress 主题渲染的页面的 frontmatter
 */
export interface ThemePageFrontmatter {
  /** Whether to show the aside / 是否显示侧边栏区域 */
  aside?: boolean | 'left'
  /** Whether to show the edit link / 是否显示编辑链接 */
  editLink?: boolean
  /** Features of the home page / 首页的特性列表 */
  features?: ThemeFeature[]
  /** Whether to show the footer / 是否显示页脚 */
  footer?: boolean
  /** Hero section of the home page / 首页的 hero 区域 */
  hero?: ThemeHero
  /** Whether the page is the home page / 页面是否为首页 */
  isHome?: boolean
  /** Layout name of the page / 页面布局名 */
  layout?: string | false
  /** Last update time of the page / 页面的最后更新时间 */
  lastUpdated?: number
  /** Whether to render the markdown styles / 是否渲染 Markdown 样式 */
  markdownStyles?: boolean
  /** Whether to show the navbar / 是否显示导航栏 */
  navbar?: boolean
  /** Next page config / 下一页配置 */
  next?: ThemePageLinkConfig
  /** Outline config of the page / 页面的大纲配置 */
  outline?: DefaultTheme.Config['outline']
  /** Class name of the page container / 页面容器的类名 */
  pageClass?: string
  /** Previous page config / 上一页配置 */
  prev?: ThemePageLinkConfig
  /** Whether to show the sidebar / 是否显示侧边栏 */
  sidebar?: boolean
  /** Any other VitePress frontmatter field / 其他 VitePress frontmatter 字段 */
  [key: string]: unknown
}

/**
 * Page data of the current page, including the extra fields added by the theme
 *
 * 当前页面的页面数据，包含主题添加的额外字段
 *
 * @returns The page data ref / 页面数据引用
 */
export const useThemePageData = (): PageDataRef<ThemePageData> =>
  usePageData<ThemePageData>()

/**
 * Frontmatter of the current page, with the original VitePress layout name
 * restored
 *
 * The node side normalizes the VitePress `doc` / `home` / `page` layouts to the
 * VuePress `Layout` layout, so the original name is restored here for the
 * ported components.
 *
 * 当前页面的 frontmatter，并恢复原始的 VitePress 布局名
 *
 * Node 端会将 VitePress 的 `doc` / `home` / `page` 布局归一化为 VuePress 的 `Layout`
 * 布局，因此这里为移植的组件恢复原始布局名。
 *
 * @returns Computed frontmatter / 计算得到的 frontmatter
 */
export const useThemePageFrontmatter =
  (): ComputedRef<ThemePageFrontmatter> => {
    const page = useThemePageData()
    const frontmatter = usePageFrontmatter<ThemePageFrontmatter>()

    return computed(() => {
      const data = frontmatter.value as ThemePageFrontmatter

      return typeof page.value.originalLayout === 'string'
        ? { ...data, layout: page.value.originalLayout }
        : data
    })
  }

/**
 * Path of the current page relative to the source directory
 *
 * 当前页面相对于源目录的路径
 *
 * @returns Computed relative path / 计算得到的相对路径
 */
export const usePageRelativePath = (): ComputedRef<string> => {
  const page = useThemePageData()

  return computed(() => page.value.filePathRelative ?? '')
}

/**
 * Last update time of the current page
 *
 * The time set by `@vuepress/plugin-git` takes precedence over the frontmatter.
 *
 * 当前页面的最后更新时间
 *
 * `@vuepress/plugin-git` 提供的时间优先于 frontmatter 中的配置。
 *
 * @returns Computed last update time / 计算得到的最后更新时间
 */
export const usePageLastUpdated = (): ComputedRef<number | undefined> => {
  const page = useThemePageData()
  const frontmatter = usePageFrontmatter<ThemePageFrontmatter>()

  return computed(
    () => page.value.git?.updatedTime ?? frontmatter.value.lastUpdated,
  )
}

/**
 * Whether the current page is the not found page
 *
 * 当前页面是否为 404 页面
 *
 * @returns Computed not found state / 计算得到的 404 状态
 */
export const usePageIsNotFound = (): ComputedRef<boolean> => {
  const page = useThemePageData()
  const frontmatter = useThemePageFrontmatter()

  return computed(
    () =>
      page.value.path === '/404.html' ||
      frontmatter.value.layout === 'NotFound',
  )
}
