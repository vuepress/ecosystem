import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type {
  SassLoaderOptions,
  WebpackBundlerOptions,
} from '@vuepress/bundler-webpack'
import {
  getBundlerName,
  isFunction,
  isString,
  mergeViteConfig,
} from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { getIdPrefix } from './utils.js'

type SassLoaderContext =
  Exclude<SassLoaderOptions['additionalData'], string | undefined> extends (
    content: string,
    loaderContext: infer T,
  ) => string
    ? T
    : never

/**
 * Use "additionalData" to make `${getIdPrefix(id)}config` available in scss
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param id Module id
 */
export const injectScssConfigModule = (
  config: unknown,
  app: App,
  id: string,
): void => {
  const bundlerName = getBundlerName(app)

  // For vite
  if (bundlerName === 'vite') {
    const viteBundlerConfig = config as ViteBundlerOptions

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const originalAdditionalData:
      | string
      | ((source: string, file: string) => Promise<string> | string)
      | undefined =
      viteBundlerConfig.viteOptions?.css?.preprocessorOptions?.scss
        .additionalData // eslint-disable-line @typescript-eslint/no-unsafe-member-access

    viteBundlerConfig.viteOptions = mergeViteConfig(
      viteBundlerConfig.viteOptions ?? {},
      {
        css: {
          preprocessorOptions: {
            scss: {
              charset: false,
              additionalData: async (
                source: string,
                file: string,
              ): Promise<string> => {
                let originalContent = isString(originalAdditionalData)
                  ? `${originalAdditionalData}${source}`
                  : isFunction(originalAdditionalData)
                    ? await originalAdditionalData(source, file)
                    : source

                if (
                  !originalContent.match(
                    new RegExp(
                      `@use\\s+(["'])@sass-palette\\/${getIdPrefix(id)}config\\1;`,
                    ),
                  )
                )
                  originalContent = `@use "@sass-palette/${getIdPrefix(id)}config";\n${originalContent}`
                if (
                  !originalContent.match(
                    new RegExp(
                      `@use\\s+(["'])@sass-palette\\/${getIdPrefix(id)}palette\\1;`,
                    ),
                  )
                )
                  originalContent = `@use "@sass-palette/${getIdPrefix(id)}palette";\n${originalContent}`

                return originalContent
              },
            },
          },
        },
      },
    )
  }

  // For webpack
  else if (bundlerName === 'webpack') {
    const webpackBundlerConfig = config as WebpackBundlerOptions

    if (!webpackBundlerConfig.scss) webpackBundlerConfig.scss = {}

    const { additionalData } = webpackBundlerConfig.scss

    const additionalDataHandler = (
      content: string,
      loaderContext: SassLoaderContext,
    ): string => {
      let originalContent = isString(additionalData)
        ? `${additionalData}${content}`
        : isFunction(additionalData)
          ? additionalData(content, loaderContext)
          : content

      if (
        !originalContent.match(
          new RegExp(
            `@use\\s+(["'])@sass-palette\\/${getIdPrefix(id)}config\\1;`,
          ),
        )
      )
        originalContent = `@use "@sass-palette/${getIdPrefix(id)}config";\n${originalContent}`

      if (
        !originalContent.match(
          new RegExp(
            `@use\\s+(["'])@sass-palette\\/${getIdPrefix(id)}palette\\1;`,
          ),
        )
      )
        originalContent = `@use "@sass-palette/${getIdPrefix(id)}palette";\n${originalContent}`

      return originalContent
    }

    webpackBundlerConfig.scss.additionalData = additionalDataHandler
  }
}
