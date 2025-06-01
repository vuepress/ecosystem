import { extendsEditLinkPage } from '@vuepress/theme-helper'
import { watch } from 'chokidar'
import type { Page, Theme } from 'vuepress/core'
import { fs, getDirname, path } from 'vuepress/utils'
import type { DefaultThemePageData } from '../shared/index.js'
import { extendsBundlerOptions, templateBuildRenderer } from './config/index.js'
import type { DefaultThemeOptions } from './options.js'
import { getPlugins } from './plugins/index.js'
import { prepareSidebarData } from './prepare/index.js'
import { THEME_NAME, logger } from './utils/index.js'

const __dirname = getDirname(import.meta.url)

export const defaultTheme =
  ({
    hostname,
    themePlugins = {},
    sidebarSorter,
    ...localeOptions
  }: DefaultThemeOptions): Theme =>
  (app) => {
    if (app.env.isDebug) {
      logger.info('Plugin Options:', themePlugins)
    }

    return {
      name: THEME_NAME,

      templateBuild: path.resolve(__dirname, '../../templates/build.html'),
      templateBuildRenderer: (bundleOptions, _app) =>
        templateBuildRenderer(bundleOptions, _app, localeOptions),

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
        // use alias to make all composables replaceable
        ...Object.fromEntries(
          fs
            .readdirSync(path.resolve(__dirname, '../client/composables'))
            .filter((file) => file.endsWith('.js'))
            .map((file) => [
              `@theme/${file.substring(0, file.length - 3)}`,
              path.resolve(__dirname, '../client/composables', file),
            ]),
        ),
        // use alias to make all utils replaceable
        ...Object.fromEntries(
          fs
            .readdirSync(path.resolve(__dirname, '../client/utils'))
            .filter((file) => file.endsWith('.js'))
            .map((file) => [
              `@theme/${file.substring(0, file.length - 3)}`,
              path.resolve(__dirname, '../client/utils', file),
            ]),
        ),
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      plugins: getPlugins(app, { hostname, themePlugins, localeOptions }),

      onPrepared: (_app) =>
        prepareSidebarData(_app, localeOptions, sidebarSorter),

      onWatched: (_app, watchers) => {
        const watcher = watch(
          // This ensures the page is generated or updated
          'pages/**/*.vue',
          {
            cwd: _app.dir.temp(),
            ignoreInitial: true,
          },
        )

        watcher.on('add', () => {
          void prepareSidebarData(app, localeOptions, sidebarSorter)
        })
        watcher.on('change', () => {
          void prepareSidebarData(app, localeOptions, sidebarSorter)
        })
        watcher.on('unlink', () => {
          void prepareSidebarData(app, localeOptions, sidebarSorter)
        })

        watchers.push(watcher)
      },

      extendsPage: (page: Page<Partial<DefaultThemePageData>>) => {
        extendsEditLinkPage(page)
        // save title into route meta to generate navbar and sidebar
        page.routeMeta.title = page.title
      },

      extendsBundlerOptions,
    }
  }
