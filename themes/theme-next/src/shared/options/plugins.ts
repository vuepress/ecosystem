import type { CopyCodePluginOptions } from '@vuepress/plugin-copy-code'
import type { LinksCheckPluginOptions } from '@vuepress/plugin-links-check'
import type { SeoPluginOptions } from '@vuepress/plugin-seo'
import type { ShikiPluginOptions } from '@vuepress/plugin-shiki'
import type { SitemapPluginOptions } from '@vuepress/plugin-sitemap'

export interface DefaultThemePluginsOptions {
  /**
   * Enable @vuepress/plugin-active-header-links or not
   *
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
   * Enable @vuepress/plugin-links-check or not
   */
  linksCheck?: LinksCheckPluginOptions | boolean

  /**
   * Enable @vuepress/plugin-medium-zoom or not
   */
  mediumZoom?: boolean

  /**
   * Enable @vuepress/plugin-nprogress or not
   */
  nprogress?: boolean

  /**
   * Enable @vuepress/plugin-prismjs or not
   */
  shiki?: boolean | ShikiPluginOptions

  /**
   * Enable @vuepress/plugin-seo or not
   */
  seo?: Partial<SeoPluginOptions> | boolean

  /**
   * Enable @vuepress/plugin-sitemap or not
   */
  sitemap?: Partial<SitemapPluginOptions> | boolean
}
