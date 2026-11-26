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
  DefaultTheme,
  ThemeConfig,
  ThemePluginsOptions,
} from '../shared/types.js'

/**
 * The sidebar item of the theme generated from the file structure
 *
 * 根据文件结构生成的主题侧边栏条目
 */
type StructureSidebarItem = DefaultTheme.SidebarItem & { text: string }

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

  if (!locales) return rest

  return {
    ...rest,
    locales: Object.fromEntries(
      Object.entries(locales).map(([key, value]) => [
        resolveLocalePath(key, (value as { link?: string } | undefined)?.link),
        value,
      ]),
    ),
  }
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
  options: ThemeConfig,
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
const resolveContributors = (options: ThemeOptions): boolean =>
  options.contributors !== false ||
  Object.values(options.locales ?? {}).some(
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
export interface ThemeOptions extends ThemeConfig {
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
  plugins: ThemePluginsOptions,
): ThemePluginList => [
  ...(plugins.markdownExt === false
    ? []
    : [
        markdownExtPlugin({
          // `v-pre` is the VitePress built-in container, it is provided by the
          // markdown extensions plugin
          vPre: true,
          ...(typeof plugins.markdownExt === 'object'
            ? plugins.markdownExt
            : {}),
        }),
      ]),
  ...(plugins.markdownRaw === false
    ? []
    : [
        markdownRawPlugin({
          // isolate the page styles from the `raw` container by default, so
          // that the container works out of the box. VitePress leaves the
          // isolation to the site (it is opt-in there).
          isolateStyles: true,
          ...(typeof plugins.markdownRaw === 'object'
            ? plugins.markdownRaw
            : {}),
        }),
      ]),
  ...(plugins.markdownHint === false
    ? []
    : [
        markdownHintPlugin({
          alert: true,
          hint: true,
          locales: resolveHintLocales(options),
          ...(typeof plugins.markdownHint === 'object'
            ? plugins.markdownHint
            : {}),
        }),
      ]),
  ...(plugins.markdownTab === false
    ? []
    : [
        markdownTabPlugin({
          codeTabs: true,
          ...(typeof plugins.markdownTab === 'object'
            ? plugins.markdownTab
            : {}),
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
  plugins: ThemePluginsOptions,
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
            typeof options.lastUpdated === 'object'
              ? true
              : (options.lastUpdated ?? true),
          contributors: resolveContributors(options),
          changelog: false,
          ...(typeof plugins.git === 'object' ? plugins.git : {}),
        }),
      ]),
  ...(plugins.shiki === false
    ? []
    : [
        shikiPlugin({
          themes: { light: 'github-light', dark: 'github-dark' },
          ...(typeof plugins.shiki === 'object' ? plugins.shiki : {}),
        }),
      ]),
  ...resolveMarkdownPlugins(options, plugins),
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
          // iconify CDN
          assets: 'iconify',
          ...(typeof plugins.icon === 'object' ? plugins.icon : {}),
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
  const plugins: ThemePluginsOptions = options.themePlugins ?? {}

  const sidebarHelper = createSidebarStructureHelper<StructureSidebarItem>({
    themeData: resolveThemeData(themeOptions),
    childrenKey: 'items',
    prefixKey: 'base',
    sorter: sidebarSorter,

    // the groups are collapsible by default, and they are collapsed unless
    // the normalized `expanded` state tells them to be expanded
    dirInfoGetter: (info, _page, defaults) => ({
      ...defaults,
      ...(info.collapsible ? { collapsed: !info.expanded } : {}),
    }),
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

    plugins: resolveThemePlugins(themeOptions, plugins, hostname),
  }
}
