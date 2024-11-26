import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { gitPlugin } from '@vuepress/plugin-git'
import { linksCheckPlugin } from '@vuepress/plugin-links-check'
import { markdownHintPlugin } from '@vuepress/plugin-markdown-hint'
import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe'
import type { SeoPluginOptions } from '@vuepress/plugin-seo'
import { seoPlugin } from '@vuepress/plugin-seo'
import type { ShikiPluginOptions } from '@vuepress/plugin-shiki'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import type { SitemapPluginOptions } from '@vuepress/plugin-sitemap'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import type { App, PluginConfig } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import type {
  DefaultThemeLocaleOptions,
  DefaultThemePluginsOptions,
} from '../../shared/index.js'
import { resolveThemeData } from '../config/index.js'

interface PluginsOptions {
  hostname?: string
  themePlugins: DefaultThemePluginsOptions
  localeOptions: DefaultThemeLocaleOptions
}

export const getPlugins = (
  app: App,
  { hostname, themePlugins, localeOptions }: PluginsOptions,
): PluginConfig => {
  const plugins: PluginConfig = []
  const isProd = app.env.isBuild

  if (themePlugins.activeHeaderLinks !== false) {
    plugins.push(
      activeHeaderLinksPlugin({
        headerLinkSelector: 'a.outline-link',
        headerAnchorSelector: '.header-anchor',
        // should greater than page transition duration
        delay: 300,
      }),
    )
  }

  if (themePlugins.tab !== false) {
    plugins.push(
      markdownTabPlugin({
        ...(isPlainObject(themePlugins.tab)
          ? themePlugins.tab
          : { tabs: true, codeTabs: true }),
      }),
    )
  }

  if (themePlugins.copyCode !== false) {
    plugins.push(
      copyCodePlugin({
        selector: '.vp-content div[class*="language-"] pre',
        ...(isPlainObject(themePlugins.copyCode) ? themePlugins.copyCode : {}),
      }),
    )
  }

  if (themePlugins.hint !== false) {
    plugins.push(
      markdownHintPlugin({
        hint: true,
        alert: true,
        ...(isPlainObject(themePlugins.hint) ? themePlugins.hint : {}),
      }),
    )
  }

  if (themePlugins.git !== false) {
    plugins.push(
      gitPlugin({
        createdTime: false,
        updatedTime: localeOptions.lastUpdated !== false,
        contributors: localeOptions.contributors !== false,
      }),
    )
  }

  if (themePlugins.linksCheck !== false) {
    plugins.push(
      linksCheckPlugin(
        isPlainObject(themePlugins.linksCheck) ? themePlugins.linksCheck : {},
      ),
    )
  }

  if (themePlugins.photoSwipe !== false) {
    plugins.push(
      photoSwipePlugin({
        selector: '.vp-content > img, .vp-content :not(a) > img',
        // should greater than page transition duration
        delay: 300,
      }),
    )
  }

  if (themePlugins.nprogress !== false) {
    plugins.push(nprogressPlugin())
  }

  if (themePlugins.shiki !== false) {
    const shikiOptions = isPlainObject(themePlugins.shiki)
      ? themePlugins.shiki
      : {}
    const defaultOptions: ShikiPluginOptions = {
      notationDiff: true,
      notationErrorLevel: true,
      notationFocus: true,
      notationHighlight: true,
      themes: { light: 'github-light', dark: 'github-dark' },
    }
    if ('theme' in shikiOptions) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      delete (defaultOptions as any).themes
    }
    plugins.push(shikiPlugin({ ...defaultOptions, ...shikiOptions }))
  }

  if ((themePlugins.seo ?? isProd) !== false) {
    const seoOptions = isPlainObject(themePlugins.seo) ? themePlugins.seo : {}
    seoOptions.hostname ||= hostname
    if (seoOptions.hostname)
      plugins.push(seoPlugin(seoOptions as SeoPluginOptions))
  }

  if ((themePlugins.sitemap ?? isProd) !== false) {
    const sitemapOptions = isPlainObject(themePlugins.sitemap)
      ? themePlugins.sitemap
      : {}
    sitemapOptions.hostname ||= hostname
    if (sitemapOptions.hostname)
      plugins.push(sitemapPlugin(sitemapOptions as SitemapPluginOptions))
  }

  // @vuepress/plugin-theme-data
  plugins.push(
    themeDataPlugin({ themeData: resolveThemeData(app, localeOptions) }),
  )

  return plugins
}
