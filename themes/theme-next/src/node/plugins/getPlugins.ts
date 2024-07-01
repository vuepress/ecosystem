import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { gitPlugin } from '@vuepress/plugin-git'
import { linksCheckPlugin } from '@vuepress/plugin-links-check'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe'
import { seoPlugin } from '@vuepress/plugin-seo'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import type { ShikiPluginOptions } from '@vuepress/plugin-shiki'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import type { App, PluginConfig } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import type {
  DefaultThemeLocaleOptions,
  DefaultThemePluginsOptions,
} from '../../shared/index.js'
import { resolveContainerLocales, resolveThemeData } from '../config/index.js'
import { createCodeGroupPlugin } from './codeGroupPlugin.js'
import { createContainerPlugin } from './createContainerPlugin.js'

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

  // ------------------ containers -----------------------------------

  const containerLocales = resolveContainerLocales(app, localeOptions)
  plugins.push(
    ...[
      createContainerPlugin('tip', containerLocales),
      createContainerPlugin('info', containerLocales),
      createContainerPlugin('warning', containerLocales),
      createContainerPlugin('danger', containerLocales),
      createContainerPlugin('caution', containerLocales),
      createContainerPlugin('important', containerLocales),
      createContainerPlugin('details', containerLocales),
      // code-group
      createCodeGroupPlugin(),
    ],
  )

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

  if (themePlugins.copyCode !== false) {
    plugins.push(
      copyCodePlugin({
        selector: '.vp-content div[class*="language-"] pre',
        ...(isPlainObject(themePlugins.copyCode) ? themePlugins.copyCode : {}),
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
      delete (defaultOptions as any).themes
    }
    plugins.push(shikiPlugin({ ...defaultOptions, ...shikiOptions }))
  }

  if (hostname && themePlugins.seo !== false) {
    plugins.push(
      seoPlugin({
        hostname,
        ...(isPlainObject(themePlugins.seo) ? themePlugins.seo : {}),
      }),
    )
  }

  if (hostname && themePlugins.sitemap !== false) {
    plugins.push(
      sitemapPlugin({
        hostname,
        ...(isPlainObject(themePlugins.sitemap) ? themePlugins.sitemap : {}),
      }),
    )
  }

  // @vuepress/plugin-theme-data
  plugins.push(
    themeDataPlugin({ themeData: resolveThemeData(app, localeOptions) }),
  )

  return plugins
}
