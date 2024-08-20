import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'
import type { App } from 'vuepress/core'
import { isString } from '../../shared/index.js'
import { getBundlerName } from './getBundlerName.js'

/**
 * Add tags as customElement
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const addCustomElement = (
  bundlerOptions: unknown,
  app: App,
  customElement: RegExp | string[] | string,
): void => {
  const customElements = isString(customElement)
    ? [customElement]
    : customElement
  const bundlerName = getBundlerName(app)

  // for vite
  if (bundlerName === 'vite') {
    const viteBundlerConfig = bundlerOptions as ViteBundlerOptions

    // eslint-disable-next-line no-multi-assign
    const { isCustomElement } = (((viteBundlerConfig.vuePluginOptions ??=
      {}).template ??= {}).compilerOptions ??= {})

    viteBundlerConfig.vuePluginOptions.template.compilerOptions.isCustomElement =
      (tag: string): boolean | void => {
        if (
          customElements instanceof RegExp
            ? customElements.test(tag)
            : customElements.includes(tag)
        )
          return true

        return isCustomElement?.(tag)
      }
  }

  // for webpack
  else if (bundlerName === 'webpack') {
    const webpackBundlerConfig = bundlerOptions as WebpackBundlerOptions

    // eslint-disable-next-line no-multi-assign
    const { isCustomElement } = ((webpackBundlerConfig.vue ??=
      {}).compilerOptions ??= {})

    webpackBundlerConfig.vue.compilerOptions.isCustomElement = (
      tag: string,
    ): boolean | void => {
      if (
        customElements instanceof RegExp
          ? customElements.test(tag)
          : customElements.includes(tag)
      )
        return true

      return isCustomElement?.(tag)
    }
  }
}
