import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from 'vuepress/client'
import type { PageDataRef } from 'vuepress/client'

import type {
  DefaultTheme,
  ThemePageData,
  ThemeConfig,
} from '../../shared/types.js'

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
  /**
   * Type of the action, as used by the classic theme
   *
   * `primary` is equivalent to `theme: 'brand'`, and `secondary` is equivalent
   * to `theme: 'alt'`.
   *
   * 按钮类型，与经典主题保持一致
   *
   * `primary` 等价于 `theme: 'brand'`，`secondary` 等价于 `theme: 'alt'`。
   *
   * @default 'primary'
   */
  type?: 'primary' | 'secondary'
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
  /**
   * Whether to show the contributors of the page / 是否显示页面贡献者
   *
   * @default true
   */
  contributors?: boolean
  /** Whether to show the edit link / 是否显示编辑链接 */
  editLink?: boolean
  /** Features of the home page / 首页的特性列表 */
  features?: ThemeFeature[]
  /**
   * Whether to show the footer, or the footer text of the page
   *
   * A string renders that text as the footer of the page, replacing the site
   * footer configured by the theme.
   *
   * 是否显示页脚，或页面的页脚文本
   *
   * 字符串会作为页面的页脚渲染，替代主题配置的站点页脚。
   */
  footer?: boolean | string
  /**
   * Whether to render a string footer as HTML
   *
   * 是否将字符串页脚作为 HTML 渲染
   *
   * @default false
   */
  footerHtml?: boolean
  /** Hero section of the home page / 首页的 hero 区域 */
  hero?: ThemeHero
  /**
   * Whether the page is a home page
   *
   * It is the classic-theme equivalent of `type: 'home'`.
   *
   * 页面是否为首页
   *
   * 它是 `type: 'home'` 在经典主题中的等价写法。
   */
  home?: boolean
  /** Alternative text of the classic hero image / 经典主题 hero 图片的替代文本 */
  heroAlt?: string
  /** Image of the classic hero / 经典主题的 hero 图片 */
  heroImage?: string
  /** Dark image of the classic hero / 经典主题 hero 图片的暗色版本 */
  heroImageDark?: string
  /**
   * Name of the classic hero
   *
   * It defaults to the site title. Set it to `null` to hide the name.
   *
   * 经典主题 hero 的名称
   *
   * 默认使用站点标题，设为 `null` 可隐藏名称。
   */
  heroText?: string | null
  /**
   * Tagline of the classic hero
   *
   * It defaults to the site description. Set it to `null` to hide the tagline.
   *
   * 经典主题 hero 的标语
   *
   * 默认使用站点描述，设为 `null` 可隐藏标语。
   */
  tagline?: string | null
  /** Actions of the classic hero / 经典主题 hero 的按钮 */
  actions?: ThemeHeroAction[]
  /**
   * Layout name of the page, only used as the VuePress layout name (e.g. a
   * custom layout or `NotFound`)
   *
   * VuePress only resolves string layout names, `layout: false` is treated as
   * "not set" and falls back to the theme `Layout`; use `type: 'content'` to
   * render the content without the layout shell.
   *
   * 页面布局名，仅作为 VuePress 的布局名使用（例如自定义布局或 `NotFound`）
   *
   * VuePress 只解析字符串布局名，`layout: false` 会被当作「未设置」并回退到主题的 `Layout`；需要不渲染布局外壳时请使用
   * `type: 'content'`。
   */
  layout?: string
  /** Last update time of the page / 页面的最后更新时间 */
  lastUpdated?: number | boolean
  /** Whether to render the markdown styles / 是否渲染 Markdown 样式 */
  markdownStyles?: boolean
  /** Whether to show the navbar / 是否显示导航栏 */
  navbar?: boolean
  /** Next page config / 下一页配置 */
  next?: ThemePageLinkConfig
  /** Outline config of the page / 页面的大纲配置 */
  outline?: ThemeConfig['outline']
  /** Class name of the page container / 页面容器的类名 */
  pageClass?: string
  /** Previous page config / 上一页配置 */
  prev?: ThemePageLinkConfig
  /**
   * The sidebar items of the page, `'heading'` to generate the sidebar from the
   * page headings, or `false` to disable the sidebar
   *
   * 页面的侧边栏条目，设为 `'heading'` 使用页面标题自动生成侧边栏，或设为 `false` 禁用侧边栏
   */
  sidebar?: DefaultTheme.Sidebar | 'heading' | false
  /**
   * The maximum depth of the sidebar headings, only used when `sidebar` is
   * `'heading'`
   *
   * 侧边栏标题的最大深度，仅在 `sidebar` 为 `'heading'` 时生效
   *
   * @default 2
   */
  sidebarDepth?: number
  /**
   * Page type of the theme, which controls the content layout
   *
   * The theme renders the home page for `home`, the doc page for `doc` (the
   * default), the bare page container for `page`, and only the page content
   * without the layout shell for `content`.
   *
   * 主题的页面类型，用于控制内容布局
   *
   * 主题会为 `home` 渲染首页、为 `doc`（默认值）渲染文档页、为 `page` 渲染空白页面容器， 为 `content`
   * 只渲染页面内容而不渲染布局外壳。
   */
  type?: 'home' | 'doc' | 'page' | 'content'
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
 * Frontmatter of the current page
 *
 * 当前页面的 frontmatter
 *
 * @returns Computed frontmatter / 计算得到的 frontmatter
 */
export const useThemePageFrontmatter = (): ComputedRef<ThemePageFrontmatter> =>
  usePageFrontmatter<ThemePageFrontmatter>()

/**
 * Page type of the current page
 *
 * The default type is `doc`, which is also used when the frontmatter does not
 * set a type. A page with `home: true` is treated as `type: 'home'`.
 *
 * 当前页面的页面类型
 *
 * 默认类型为 `doc`，frontmatter 未设置类型时也会使用该值。设置 `home: true` 的页面会被当作 `type: 'home'`。
 *
 * @returns Computed page type / 计算得到的页面类型
 */
export const usePageType = (): ComputedRef<
  'home' | 'doc' | 'page' | 'content'
> => {
  const frontmatter = useThemePageFrontmatter()

  return computed(
    () => frontmatter.value.type ?? (frontmatter.value.home ? 'home' : 'doc'),
  )
}

const normalizeHeroAction = (action: ThemeHeroAction): ThemeHeroAction => ({
  ...action,
  theme: action.theme ?? (action.type === 'secondary' ? 'alt' : 'brand'),
})

/**
 * Hero section of the current page
 *
 * The nested `hero` frontmatter takes precedence. When it is not set, the flat
 * home frontmatter of the classic theme (`heroText`, `tagline`, `heroImage`, …)
 * is used, with the site title and description as defaults.
 *
 * 当前页面的 hero 区域
 *
 * 嵌套的 `hero` frontmatter 优先。未设置时，会使用经典主题的扁平首页 frontmatter（`heroText`、
 * `tagline`、`heroImage` 等），并以站点标题和描述作为默认值。
 *
 * @returns Computed hero section / 计算得到的 hero 区域
 */
export const useHomeHero = (): ComputedRef<ThemeHero | undefined> => {
  const frontmatter = useThemePageFrontmatter()
  const site = useSiteLocaleData()

  return computed(() => {
    const {
      actions,
      hero,
      heroAlt,
      heroImage,
      heroImageDark,
      heroText,
      home,
      tagline,
      type,
    } = frontmatter.value

    if (hero) {
      return {
        ...hero,
        actions: hero.actions?.map(normalizeHeroAction),
      }
    }

    // oxlint-disable-next-line unicorn/no-useless-undefined
    if (!home && type !== 'home') return undefined

    const name =
      // oxlint-disable-next-line eqeqeq
      heroText === null ? undefined : heroText || site.value.title || 'Hello'
    const text =
      // oxlint-disable-next-line eqeqeq
      tagline === null
        ? undefined
        : tagline || site.value.description || 'Welcome to your VuePress site'

    const alt = heroAlt || name || 'hero'
    const image: DefaultTheme.ThemeableImage | undefined = heroImage
      ? heroImageDark
        ? { light: heroImage, dark: heroImageDark, alt }
        : { src: heroImage, alt }
      : undefined

    return {
      name,
      text,
      image,
      actions: actions?.map((action) => normalizeHeroAction(action)),
    }
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
 * `@vuepress/plugin-git` 提供的时间优先于 frontmatter 中的数字配置；frontmatter 设为 `false`
 * 时不显示最后更新时间。
 *
 * @returns Computed last update time / 计算得到的最后更新时间
 */
export const usePageLastUpdated = (): ComputedRef<number | undefined> => {
  const page = useThemePageData()
  const frontmatter = usePageFrontmatter<ThemePageFrontmatter>()

  return computed(() => {
    const { lastUpdated } = frontmatter.value

    // `lastUpdated: false` in the page frontmatter disables the timestamp
    // even when `@vuepress/plugin-git` provides the update time.
    const value =
      lastUpdated === false
        ? undefined
        : (page.value.git?.updatedTime ?? lastUpdated)

    return typeof value === 'number' ? value : undefined
  })
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
