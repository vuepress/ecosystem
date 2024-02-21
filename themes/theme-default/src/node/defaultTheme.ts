import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { containerPlugin } from '@vuepress/plugin-container'
import { copyCodePlugin } from '@vuepress/plugin-copy-code'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { gitPlugin } from '@vuepress/plugin-git'
import { linksCheckPlugin } from '@vuepress/plugin-links-check'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { seoPlugin } from '@vuepress/plugin-seo'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import type { Page, Theme } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import { fs, getDirname, path } from 'vuepress/utils'
import type {
  DefaultThemeLocaleOptions,
  DefaultThemePageData,
  DefaultThemePluginsOptions,
} from '../shared/index.js'
import {
  assignDefaultLocaleOptions,
  resolveContainerPluginOptions,
} from './utils/index.js'

const __dirname = getDirname(import.meta.url)

export interface DefaultThemeOptions extends DefaultThemeLocaleOptions {
  /**
   * deployed hostname
   */
  hostname?: string

  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: DefaultThemePluginsOptions
}

export const defaultTheme = ({
  hostname,
  themePlugins = {},
  ...localeOptions
}: DefaultThemeOptions = {}): Theme => {
  assignDefaultLocaleOptions(localeOptions)

  return {
    name: '@vuepress/theme-default',

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),

    alias: {
      // use alias to make all components replaceable
      ...Object.fromEntries(
        fs
          .readdirSync(path.resolve(__dirname, '../client/components'))
          .filter((file) => file.endsWith('.vue'))
          .map((file) => [
            `@theme/${file}`,
            path.resolve(__dirname, '../client/components', file),
          ]),
      ),
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    extendsPage: (page: Page<Partial<DefaultThemePageData>>) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
    },

    plugins: [
      // @vuepress/plugin-active-header-link
      themePlugins.activeHeaderLinks !== false
        ? activeHeaderLinksPlugin({
            headerLinkSelector: 'a.sidebar-item',
            headerAnchorSelector: '.header-anchor',
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-back-to-top
      themePlugins.backToTop !== false
        ? backToTopPlugin(
            isPlainObject(themePlugins.backToTop) ? themePlugins.backToTop : {},
          )
        : [],

      // @vuepress/plugin-copy-code
      themePlugins.copyCode !== false
        ? copyCodePlugin({
            ...(isPlainObject(themePlugins.copyCode)
              ? themePlugins.copyCode
              : {}),
          })
        : [],

      // @vuepress/plugin-container
      themePlugins.container?.tip !== false
        ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'tip'))
        : [],
      themePlugins.container?.warning !== false
        ? containerPlugin(
            resolveContainerPluginOptions(localeOptions, 'warning'),
          )
        : [],
      themePlugins.container?.danger !== false
        ? containerPlugin(
            resolveContainerPluginOptions(localeOptions, 'danger'),
          )
        : [],
      themePlugins.container?.details !== false
        ? containerPlugin({
            type: 'details',
            before: (info) =>
              `<details class="custom-container details">${
                info ? `<summary>${info}</summary>` : ''
              }\n`,
            after: () => '</details>\n',
          })
        : [],
      themePlugins.container?.codeGroup !== false
        ? containerPlugin({
            type: 'code-group',
            before: () => `<CodeGroup>\n`,
            after: () => '</CodeGroup>\n',
          })
        : [],
      themePlugins.container?.codeGroupItem !== false
        ? containerPlugin({
            type: 'code-group-item',
            before: (info) => `<CodeGroupItem title="${info}">\n`,
            after: () => '</CodeGroupItem>\n',
          })
        : [],

      // @vuepress/plugin-external-link-icon
      themePlugins.externalLinkIcon !== false
        ? externalLinkIconPlugin({
            locales: Object.entries(localeOptions.locales || {}).reduce(
              (result, [key, value]) => {
                result[key] = {
                  openInNewWindow:
                    value.openInNewWindow ?? localeOptions.openInNewWindow,
                }
                return result
              },
              {},
            ),
          })
        : [],

      // @vuepress/plugin-git
      themePlugins.git !== false
        ? gitPlugin({
            createdTime: false,
            updatedTime: localeOptions.lastUpdated !== false,
            contributors: localeOptions.contributors !== false,
          })
        : [],

      // @vuepress/plugin-links-check
      themePlugins.linksCheck !== false
        ? linksCheckPlugin(
            isPlainObject(themePlugins.linksCheck)
              ? themePlugins.linksCheck
              : {},
          )
        : [],

      // @vuepress/plugin-medium-zoom
      themePlugins.mediumZoom !== false
        ? mediumZoomPlugin({
            selector:
              '.theme-default-content > img, .theme-default-content :not(a) > img',
            zoomOptions: {},
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-nprogress
      themePlugins.nprogress !== false ? nprogressPlugin() : [],

      // @vuepress/plugin-palette
      palettePlugin({ preset: 'sass' }),

      // @vuepress/plugin-prismjs
      themePlugins.prismjs !== false ? prismjsPlugin() : [],

      // @vuepress/plugin-seo
      hostname && themePlugins.seo !== false
        ? seoPlugin({
            hostname,
            ...(isPlainObject(themePlugins.seo) ? themePlugins.seo : {}),
          })
        : [],

      // @vuepress/plugin-sitemap
      hostname && themePlugins.sitemap !== false
        ? sitemapPlugin({
            hostname,
            ...(isPlainObject(themePlugins.sitemap)
              ? themePlugins.sitemap
              : {}),
          })
        : [],

      // @vuepress/plugin-theme-data
      themeDataPlugin({ themeData: localeOptions }),
    ],
  }
}
