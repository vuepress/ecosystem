import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'
import type { App } from 'vuepress/core'
import { isString } from '../../shared/index.js'
import { getBundlerName } from './getBundlerName.js'

/**
 * Add tags as customElement
 *
 * 将标签添加为自定义元素
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param customElement - Tags recognized as custom element / 识别为自定义元素的标签
 *
 * @example
 * ```ts
 * // Add single custom element
 * addCustomElement(bundlerOptions, app, 'my-element')
 *
 * // Add multiple custom elements
 * addCustomElement(bundlerOptions, app, ['element1', 'element2'])
 *
 * // Add elements matching a pattern
 * addCustomElement(bundlerOptions, app, /^my-/)
 * ```
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

    const { isCustomElement } = (((viteBundlerConfig.vuePluginOptions ??=
      {}).template ??= {}).compilerOptions ??= {})

    /**
     * @see https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue/README.md
     *
     * @param tag - The tag name to check / 要检查的标签名称
     * @returns Whether the tag is a custom element / 是否为自定义元素
     */
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

    const { isCustomElement } = ((webpackBundlerConfig.vue ??=
      {}).compilerOptions ??= {})

    /**
     * @see https://vue-loader.vuejs.org/options.html#compileroptions
     *
     * @param tag - The tag name to check / 要检查的标签名称
     * @returns Whether the tag is a custom element / 是否为自定义元素
     */
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
