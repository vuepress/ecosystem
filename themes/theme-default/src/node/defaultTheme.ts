import path from 'node:path'

import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { gitPlugin } from '@vuepress/plugin-git'
import { iconPlugin } from '@vuepress/plugin-icon'
import { linksCheckPlugin } from '@vuepress/plugin-links-check'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownHintPlugin } from '@vuepress/plugin-markdown-hint'
import type { MarkdownHintPluginLocaleData } from '@vuepress/plugin-markdown-hint'
import { markdownRawPlugin } from '@vuepress/plugin-markdown-raw'
import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { seoPlugin } from '@vuepress/plugin-seo'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import {
  createSidebarStructureHelper,
  extendsPageData,
} from '@vuepress/theme-helper'
import type { ThemeObject } from 'vuepress'
import { isString } from 'vuepress/shared'

import type {
  AppearanceOptions,
  EditLink,
  LocaleConfig,
  MarkdownPluginsOptions,
  NavbarOptions,
  SidebarItem,
  SidebarOptions,
  ThemeConfig,
  ThemePluginsOptions,
} from '../shared/types.js'
import {
  normalizeSidebar,
  normalizeThemeConfig,
} from './normalizeThemeOptions.js'

/**
 * The sidebar item of the theme generated from the file structure
 *
 * 根据文件结构生成的主题侧边栏条目
 */
type StructureSidebarItem = SidebarItem & { text: string }

/**
 * Plugin list of the theme
 *
 * 主题的插件列表
 */
type ThemePluginList = NonNullable<ThemeObject['plugins']>

const __dirname = import.meta.dirname

/**
 * Resolve the route-locale path of a VitePress locale key
 *
 * 解析 VitePress 多语言配置键对应的路由多语言路径
 *
 * @param key - VitePress locale key / VitePress 语言配置键
 * @param link - Locale link / 语言链接
 * @returns VuePress route locale path / VuePress 路由多语言路径
 */
const resolveLocalePath = (key: string, link?: string): string => {
  const normalizedKey = key.replaceAll(/^\/+|\/+$/gu, '')
  const localePath =
    link ??
    (normalizedKey === '' || normalizedKey === 'root'
      ? '/'
      : `/${normalizedKey}/`)

  return localePath.endsWith('/') ? localePath : `${localePath}/`
}

/**
 * Convert the VitePress-keyed locales of the theme options to the route-locale
 * paths expected by `@vuepress/plugin-theme-data`
 *
 * 将主题配置中 VitePress 风格的多语言键转换为 `@vuepress/plugin-theme-data` 需要的路由多语言路径
 *
 * @param options - Theme options / 主题配置项
 * @returns Theme data passed to the plugin / 传给插件的主题数据
 */
export const resolveThemeData = (
  options: ThemeOptions,
): Record<string, unknown> => {
  // `hostname` is used by the SEO and sitemap plugins, while `sidebarSorter`
  // may contain functions, neither of them is part of the theme data
  const {
    hostname: _hostname,
    locales,
    sidebarSorter: _sidebarSorter,
    ...rest
  } = options

  if (!locales)
    return normalizeThemeConfig(rest) as unknown as Record<string, unknown>

  return normalizeThemeConfig({
    ...rest,
    locales: Object.fromEntries(
      Object.entries(locales).map(([key, value]) => [
        resolveLocalePath(key, (value as { link?: string } | undefined)?.link),
        normalizeThemeConfig(value as ThemeOptions),
      ]),
    ),
  }) as unknown as Record<string, unknown>
}

/**
 * Resolve the appearance baked into the build template
 *
 * The value is injected into the HTML at build time, so the inline script of
 * the template can apply it before the first paint instead of waiting for the
 * client-side hydration.
 *
 * 解析写入构建模板的外观值
 *
 * 该值在构建期注入 HTML，因此模板里的内联脚本可以在首屏渲染前应用它，而不必等待客户端 hydration。
 *
 * @param appearance - Appearance option / 外观配置
 * @returns The appearance value in the template / 模板中的外观值
 */
export const resolveTemplateAppearance = (
  appearance: AppearanceOptions | undefined,
): 'light' | 'dark' | 'auto' | 'force-dark' | 'force-auto' => {
  if (appearance === false) return 'light'
  if (appearance === 'dark') return 'dark'
  if (appearance === 'force-dark') return 'force-dark'
  if (appearance === 'force-auto') return 'force-auto'
  return typeof appearance === 'object' && appearance.initialValue === 'dark'
    ? 'dark'
    : 'auto'
}

/**
 * Pick the hint container labels from the theme options
 *
 * 从主题配置中提取提示容器的标题文案
 *
 * @param options - Theme options / 主题配置项
 * @returns The labels of the containers / 容器的标题文案
 */
const resolveHintLabels = (
  options: ThemeOptions,
): Partial<MarkdownHintPluginLocaleData> => {
  const labels: Partial<MarkdownHintPluginLocaleData> = {}

  if (options.tip) labels.tip = options.tip
  if (options.warning) labels.warning = options.warning
  if (options.danger) labels.caution = options.danger
  if (options.important) labels.important = options.important
  if (options.note) labels.note = options.note

  return labels
}

/**
 * Resolve the locales of `@vuepress/plugin-markdown-hint` from the theme
 * options
 *
 * 从主题配置中解析 `@vuepress/plugin-markdown-hint` 的语言配置
 *
 * @param options - Theme options / 主题配置项
 * @returns The locales of the plugin, or `undefined` when no label is
 *   customized / 插件的语言配置；未自定义任何文案时返回 `undefined`
 */
export const resolveHintLocales = (
  options: ThemeOptions,
): Record<string, Partial<MarkdownHintPluginLocaleData>> | undefined => {
  const rootLabels = resolveHintLabels(options)
  const locales: Record<string, Partial<MarkdownHintPluginLocaleData>> = {}

  if (Object.keys(rootLabels).length > 0) locales['/'] = rootLabels

  for (const [key, value] of Object.entries(options.locales ?? {})) {
    const labels = resolveHintLabels({ ...options, ...value })

    if (Object.keys(labels).length > 0)
      locales[resolveLocalePath(key, value.link)] = labels
  }

  return Object.keys(locales).length > 0 ? locales : undefined
}

/**
 * Whether the Git plugin should collect the contributors
 *
 * 判断是否需要让 Git 插件收集贡献者信息
 *
 * @param options - Theme options / 主题配置项
 * @returns Whether to collect the contributors / 是否收集贡献者
 */
const resolveContributors = (themeData: ThemeConfig): boolean =>
  themeData.contributors !== false ||
  Object.values(themeData.locales ?? {}).some(
    (locale) => locale.contributors !== false,
  )

/**
 * The context of the template renderer (kept local to avoid depending on
 * `@vuepress/utils` at runtime)
 *
 * 模板渲染器的上下文（保持本地定义，避免在运行时依赖 `@vuepress/utils`）
 */
interface TemplateRendererContext {
  content: string
  head: string
  lang: string
  prefetch: string
  preload: string
  scripts: string
  styles: string
  version: string
}

/**
 * Create the build template renderer which injects the appearance option
 *
 * 创建注入外观配置的构建模板渲染器
 *
 * @param appearance - Appearance option / 外观配置
 * @returns The template renderer / 模板渲染器
 */
const createTemplateBuildRenderer =
  (appearance: AppearanceOptions | undefined) =>
  (template: string, context: TemplateRendererContext): string =>
    template
      .replace(
        'data-appearance="auto"',
        () => `data-appearance="${resolveTemplateAppearance(appearance)}"`,
      )
      .replace('<!--vuepress-ssr-content-->', () => context.content)
      .replace('<!--vuepress-ssr-head-->', () => context.head)
      .replace('{{ lang }}', () => context.lang)
      .replace('<!--vuepress-ssr-prefetch-->', () => context.prefetch)
      .replace('<!--vuepress-ssr-preload-->', () => context.preload)
      .replace('<!--vuepress-ssr-scripts-->', () => context.scripts)
      .replace('<!--vuepress-ssr-styles-->', () => context.styles)
      .replace('{{ version }}', () => context.version)

/**
 * Options of the default theme
 *
 * 默认主题的配置项
 */
export interface ThemeOptions extends Omit<
  ThemeConfig,
  'editLink' | 'locales' | 'navbar' | 'sidebar'
> {
  /**
   * Deployed hostname of the site
   *
   * It enables the SEO and sitemap plugins, which require an absolute URL.
   *
   * 站点的部署域名
   *
   * 它会启用 SEO 与站点地图插件，这两个插件需要绝对链接。
   *
   * @example
   *   'https://example.com'
   */
  hostname?: string

  /**
   * The navbar items, or `false` to hide the navbar
   *
   * String items, the deprecated `children` and `prefix` keys of the classic
   * theme are supported and normalized at build time.
   *
   * 导航栏条目，设为 `false` 以隐藏导航栏
   *
   * 支持 classic 主题的字符串条目与已废弃的 `children`、`prefix` 键，它们会在构建期被归一化。
   */
  navbar?: NavbarOptions

  /**
   * The sidebar items, or `'structure'` to generate them from the file
   * structure
   *
   * String items, the deprecated `children` and `prefix` keys, and `false` in
   * the multi-sidebar config of the classic theme are supported and normalized
   * at build time.
   *
   * 侧边栏条目，或设为 `'structure'` 使用文件结构自动生成侧边栏
   *
   * 支持 classic 主题的字符串条目、已废弃的 `children` 与 `prefix` 键，以及多侧边栏配置中的
   * `false`，它们会在构建期被归一化。
   */
  sidebar?: SidebarOptions

  /**
   * The "edit this page" link
   *
   * The boolean form of the classic theme is accepted and normalized at build
   * time: `true` builds the link from the repository options, `false` disables
   * it.
   *
   * “编辑此页”链接
   *
   * 接受 classic 主题的布尔写法并在构建期归一化：`true` 会根据仓库配置生成链接，`false` 禁用它。
   */
  editLink?: EditLink | boolean

  /** Locale configs / 多语言配置 */
  locales?: LocaleConfig<ThemeOptions>
}

/**
 * Create the markdown plugin list wired by the theme
 *
 * 创建主题接线的 Markdown 插件列表
 *
 * @param options - Theme options / 主题配置项
 * @param plugins - Plugin options / 插件配置项
 * @returns The plugin list / 插件列表
 */
const resolveMarkdownPlugins = (
  options: ThemeOptions,
  plugins: MarkdownPluginsOptions,
): ThemePluginList => [
  ...(plugins.shiki === false
    ? []
    : [
        shikiPlugin({
          themes: { light: 'github-light', dark: 'github-dark' },
          ...(typeof plugins.shiki === 'object' ? plugins.shiki : {}),
        }),
      ]),
  ...(plugins.ext === false
    ? []
    : [
        markdownExtPlugin({
          // `v-pre` is the VitePress built-in container, it is provided by the
          // markdown extensions plugin
          vPre: true,
          ...(typeof plugins.ext === 'object' ? plugins.ext : {}),
        }),
      ]),
  ...(plugins.raw === false
    ? []
    : [
        markdownRawPlugin({
          // isolate the page styles from the `raw` container by default, so
          // that the container works out of the box. VitePress leaves the
          // isolation to the site (it is opt-in there).
          isolateStyles: true,
          ...(typeof plugins.raw === 'object' ? plugins.raw : {}),
        }),
      ]),
  ...(plugins.hint === false
    ? []
    : [
        markdownHintPlugin({
          alert: true,
          hint: true,
          locales: resolveHintLocales(options),
          ...(typeof plugins.hint === 'object' ? plugins.hint : {}),
        }),
      ]),
  ...(plugins.tab === false
    ? []
    : [
        markdownTabPlugin({
          codeTabs: true,
          ...(typeof plugins.tab === 'object' ? plugins.tab : {}),
        }),
      ]),
]

/**
 * Create the plugin list wired by the theme
 *
 * 创建主题接线的插件列表
 *
 * @param options - Theme options / 主题配置项
 * @param plugins - Plugin options / 插件配置项
 * @param hostname - Deployed hostname / 部署域名
 * @returns The plugin list / 插件列表
 */
const resolveThemePlugins = (
  options: ThemeOptions,
  themeData: ThemeConfig,
  plugins: ThemePluginsOptions,
  markdownPlugins: MarkdownPluginsOptions,
  hostname?: string,
): ThemePluginList => [
  themeDataPlugin({ themeData: resolveThemeData(options) }),
  ...(plugins.copyCode === false
    ? []
    : [
        copyCodePlugin({
          // the content root carries the `vp-content` attribute so plugins
          // can scope their selectors to the page content, like
          // theme-default does
          selector: '[vp-content] div[class*="language-"] pre',
          ...(typeof plugins.copyCode === 'object' ? plugins.copyCode : {}),
        }),
      ]),
  ...(plugins.git === false
    ? []
    : [
        gitPlugin({
          createdTime: false,
          updatedTime:
            typeof themeData.lastUpdated === 'object'
              ? true
              : (themeData.lastUpdated ?? true),
          contributors: resolveContributors(themeData),
          changelog: false,
          ...(typeof plugins.git === 'object' ? plugins.git : {}),
        }),
      ]),
  ...resolveMarkdownPlugins(options, markdownPlugins),
  ...(plugins.activeHeaderLinks === false
    ? []
    : [
        activeHeaderLinksPlugin({
          // the plugin keeps `route.hash` in sync with the section being
          // read, the theme only reflects it in the outline
          headerLinkSelector: '.outline-link',
        }),
      ]),
  ...(plugins.backToTop === false
    ? []
    : [
        backToTopPlugin({
          // the label of the button comes from the locales of the plugin
          ...(typeof plugins.backToTop === 'object' ? plugins.backToTop : {}),
        }),
      ]),
  ...(plugins.linksCheck === false
    ? []
    : [
        linksCheckPlugin({
          ...(typeof plugins.linksCheck === 'object' ? plugins.linksCheck : {}),
        }),
      ]),
  ...(plugins.icon === false
    ? []
    : [
        iconPlugin({
          // `assets: 'iconify'` uses the runtime iconify web component,
          // the icon set packages are loaded by the client from the
          // iconify CDN. The component name is fixed: the theme renderers
          // depend on the props and the DOM of `VPIcon`.
          assets: 'iconify',
          ...(typeof plugins.icon === 'object' ? plugins.icon : {}),
          component: 'VPIcon',
        }),
      ]),
  ...(plugins.mediumZoom === false
    ? []
    : [
        mediumZoomPlugin(
          typeof plugins.mediumZoom === 'object' ? plugins.mediumZoom : {},
        ),
      ]),
  ...(plugins.nprogress === false ? [] : [nprogressPlugin()]),
  // the SEO and sitemap plugins require an absolute hostname, so they are
  // only wired when the theme is configured with one, like theme-classic
  ...(hostname && plugins.seo !== false
    ? [
        seoPlugin({
          hostname,
          ...(typeof plugins.seo === 'object' ? plugins.seo : {}),
        }),
      ]
    : []),
  ...(hostname && plugins.sitemap !== false
    ? [
        sitemapPlugin({
          hostname,
          ...(typeof plugins.sitemap === 'object' ? plugins.sitemap : {}),
        }),
      ]
    : []),
]

/**
 * Create the new theme, which ports the default theme of VitePress
 *
 * 创建新主题，它移植了 VitePress 的默认主题
 *
 * @example
 *   import { defaultTheme } from '@vuepress/theme-default'
 *   import { defineUserConfig } from 'vuepress'
 *
 *   export default defineUserConfig({
 *     theme: defaultTheme({}),
 *   })
 *
 * @param options - Theme options / 主题配置项
 * @returns The theme plugin / 主题插件
 */
export const defaultTheme = (options: ThemeOptions = {}): ThemeObject => {
  const { hostname, sidebarSorter, ...themeOptions } = options

  // normalize the classic options once, the plugin wiring and the theme data
  // both read the normalized result
  const themeData = resolveThemeData(options) as unknown as ThemeConfig
  const plugins: ThemePluginsOptions = themeData.themePlugins ?? {}
  const markdownPlugins: MarkdownPluginsOptions =
    themeData.markdownPlugins ?? {}

  const sidebarHelper = createSidebarStructureHelper<StructureSidebarItem>({
    themeData: resolveThemeData(themeOptions),
    childrenKey: 'items',
    prefixKey: 'base',
    sorter: sidebarSorter,
  })

  return {
    name: '@vuepress/theme-default',

    // the default theme exposes its style entry instead of a Sass palette,
    // users can override the CSS variables there
    userStyle: '.vuepress/styles/index.css',

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),

    templateBuildRenderer: createTemplateBuildRenderer(options.appearance),

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    extendsPage: (page) => {
      extendsPageData(page)

      // normalize the frontmatter sidebar written in the classic theme syntax,
      // so that the client only deals with the normalized items
      if (page.frontmatter.sidebar) {
        page.data.frontmatter.sidebar = normalizeSidebar(
          page.frontmatter.sidebar as SidebarOptions,
        )
      }

      // save the icon into the route meta, so that the navbar and the sidebar
      // fill the icon of the items that only define a link
      if (isString(page.frontmatter.icon))
        page.routeMeta.icon = page.frontmatter.icon
    },

    // the client reads the sidebar generated from the file structure from a
    // generated module, which must exist even when no sidebar uses
    // `'structure'`, so the data is always prepared
    onPrepared: (app) => sidebarHelper.prepare(app),

    onWatched: (app, watchers): void => {
      sidebarHelper.watch(app, watchers)
    },

    plugins: resolveThemePlugins(
      options,
      themeData,
      plugins,
      markdownPlugins,
      hostname,
    ),
  }
}
