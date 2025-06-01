import type { CopyCodePluginOptions } from '@vuepress/plugin-copy-code'
import type { LinksCheckPluginOptions } from '@vuepress/plugin-links-check'
import type { MarkdownHintPluginOptions } from '@vuepress/plugin-markdown-hint'
import type { MarkdownTabPluginOptions } from '@vuepress/plugin-markdown-tab'
import type { SeoPluginOptions } from '@vuepress/plugin-seo'
import type { ShikiPluginOptions } from '@vuepress/plugin-shiki'
import type { SitemapPluginOptions } from '@vuepress/plugin-sitemap'
import type {
  DefaultThemeLocaleOptions,
  SidebarSorter,
} from '../shared/index.js'

export interface DefaultThemePluginsOptions {
  /**
   * Enable @vuepress/plugin-active-header-links or not
   */
  activeHeaderLinks?: boolean

  /**
   * Enable @vuepress/plugin-copy-code or not
   */
  copyCode?: CopyCodePluginOptions | boolean

  /**
   * Enable @vuepress/plugin-git or not
   */
  git?: boolean

  /**
   * Enable @vuepress/plugin-markdown-hint or not
   */
  hint?: MarkdownHintPluginOptions | boolean

  /**
   * Enable @vuepress/plugin-markdown-tab or not
   */
  tab?: MarkdownTabPluginOptions | boolean

  /**
   * Enable @vuepress/plugin-links-check or not
   */
  linksCheck?: LinksCheckPluginOptions | boolean

  /**
   * Enable @vuepress/plugin-photo-swipe or not
   */
  photoSwipe?: boolean

  /**
   * Enable @vuepress/plugin-nprogress or not
   */
  nprogress?: boolean

  /**
   * Enable @vuepress/plugin-shiki or not
   */
  shiki?: ShikiPluginOptions | boolean

  /**
   * Enable @vuepress/plugin-seo or not
   */
  seo?: Partial<SeoPluginOptions> | boolean

  /**
   * Enable @vuepress/plugin-sitemap or not
   */
  sitemap?: Partial<SitemapPluginOptions> | boolean
}

export interface DefaultThemeOptions extends DefaultThemeLocaleOptions {
  /**
   * deployed hostname
   */
  hostname?: string

  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   *
   * 为避免与根`plugins`选项混淆，我们使用`themePlugins`。
   */
  themePlugins?: DefaultThemePluginsOptions

  /**
   * The sidebar sorters. only `'structure'` optional
   *
   * 侧边栏排序。仅支持 `'structure'`
   *
   */
  sidebarSorter?: SidebarSorter
}
