import path from 'node:path'

import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { gitPlugin } from '@vuepress/plugin-git'
import { iconPlugin } from '@vuepress/plugin-icon'
import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import type { Theme } from 'vuepress'

import type { DefaultTheme } from '../shared/types.js'
import { registerContainers } from './containers.js'

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
  const localePath = link ?? (key === 'root' ? '/' : `/${key}/`)

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
  options: ThemeNewOptions,
): Record<string, unknown> => {
  const { locales, ...rest } = options

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
 * Layout names of VitePress, all mapped to the single `Layout` registered by
 * the theme
 *
 * VitePress 的布局名，全部映射到主题唯一注册的 `Layout` 布局
 */
const vitePressLayoutNames: Record<string, string> = {
  doc: 'Layout',
  home: 'Layout',
  page: 'Layout',
}

/**
 * Options of the new theme
 *
 * 新主题的配置项
 */
export type ThemeNewOptions = DefaultTheme.Config

/**
 * Create the new theme, which ports the default theme of VitePress
 *
 * 创建新主题，它移植了 VitePress 的默认主题
 *
 * @example
 *   import { themeNew } from '@vuepress/theme-new'
 *   import { defineUserConfig } from 'vuepress'
 *
 *   export default defineUserConfig({
 *     theme: themeNew({}),
 *   })
 *
 * @param options - Theme options / 主题配置项
 * @returns The theme plugin / 主题插件
 */
export const themeNew = (options: ThemeNewOptions = {}): Theme => ({
  name: '@vuepress/theme-new',

  templateBuild: path.resolve(__dirname, '../../templates/build.html'),

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  extendsMarkdown: (md, app) => {
    registerContainers(md, app)
  },

  extendsPage: (page) => {
    page.data.filePathRelative = page.filePathRelative
    page.routeMeta.title = page.title

    const frontmatter = page.frontmatter as Record<string, unknown>
    const { layout } = frontmatter

    // VuePress resolves layouts with PascalCase names, while VitePress
    // frontmatter uses lowercase names, so keep the original value for the
    // client and normalize the layout name for the layout resolution
    if (typeof layout === 'string' && layout in vitePressLayoutNames) {
      page.data.originalLayout = layout
      frontmatter.layout = vitePressLayoutNames[layout]
    }
  },

  plugins: [
    themeDataPlugin({ themeData: resolveThemeData(options) }),
    copyCodePlugin({
      // the content root carries the `vp-content` attribute so plugins can
      // scope their selectors to the page content, like theme-default does
      selector: '[vp-content] div[class*="language-"] pre',
    }),
    gitPlugin({
      createdTime: false,
      updatedTime:
        typeof options.lastUpdated === 'object'
          ? true
          : (options.lastUpdated ?? true),
      // the theme does not render contributors or the changelog
      contributors: false,
      changelog: false,
    }),
    shikiPlugin({
      themes: { light: 'github-light', dark: 'github-dark' },
    }),
    nprogressPlugin(),
    markdownTabPlugin({ codeTabs: true }),
    activeHeaderLinksPlugin({
      // the plugin keeps `route.hash` in sync with the section being read,
      // the theme only reflects it in the outline
      headerLinkSelector: '.outline-link',
    }),
    iconPlugin({
      // use the runtime iconify web component, the icon set packages are
      // loaded by the client from the iconify CDN
      assets: 'iconify',
    }),
  ],
})
