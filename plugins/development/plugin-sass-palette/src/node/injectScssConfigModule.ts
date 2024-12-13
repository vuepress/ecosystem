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

  const configModuleName = `${getIdPrefix(id)}config`
  const configImport = `@use "@sass-palette/${getIdPrefix(id)}config";`
  const configRegExp = new RegExp(
    `@use\\s+(["'])@sass-palette\\/${getIdPrefix(id)}config\\1;`,
  )
  const paletteModuleName = `${getIdPrefix(id)}palette`
  const paletteImport = `@use "@sass-palette/${getIdPrefix(id)}palette";`
  const paletteRegExp = new RegExp(
    `@use\\s+(["'])@sass-palette\\/${getIdPrefix(id)}palette\\1;`,
  )

  // For vite
  if (bundlerName === 'vite') {
    const viteBundlerConfig = config as ViteBundlerOptions

    const originalAdditionalData =
      viteBundlerConfig.viteOptions?.css?.preprocessorOptions?.scss
        ?.additionalData

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
                let originalResult = source

                if (isFunction(originalAdditionalData)) {
                  const result = await originalAdditionalData(source, file)

                  originalResult = isString(result) ? result : result.content
                } else if (isString(originalAdditionalData))
                  originalResult = `${originalAdditionalData}${source}`

                if (
                  originalResult.includes(configModuleName) &&
                  !originalResult.match(configRegExp)
                )
                  originalResult = `${configImport}\n${originalResult}`
                if (
                  originalResult.includes(paletteModuleName) &&
                  !originalResult.match(paletteRegExp)
                )
                  originalResult = `${paletteImport}\n${originalResult}`

                return originalResult
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

    webpackBundlerConfig.scss ??= {}

    const { additionalData } = webpackBundlerConfig.scss

    webpackBundlerConfig.scss.additionalData = (
      content: string,
      loaderContext: SassLoaderContext,
    ): string => {
      let originalContent = isString(additionalData)
        ? `${additionalData}${content}`
        : isFunction(additionalData)
          ? additionalData(content, loaderContext)
          : content

      if (
        originalContent.includes(configModuleName) &&
        !originalContent.match(configRegExp)
      )
        originalContent = `${configImport}\n${originalContent}`

      if (
        originalContent.includes(paletteModuleName) &&
        !originalContent.match(paletteRegExp)
      )
        originalContent = `${paletteImport}\n${originalContent}`

      return originalContent
    }
  }
}
