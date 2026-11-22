import type { Plugin, Root } from 'postcss'
import selectorParser from 'postcss-selector-parser'

/**
 * Options of the style isolation PostCSS plugin
 *
 * 样式隔离 PostCSS 插件选项
 */
export interface IsolateStylesOptions {
  /**
   * Style files to be isolated, matched with the resolved file path.
   *
   * 需要隔离的样式文件，使用解析后的文件路径匹配。
   *
   * @default [/vp-doc\.css/, /base\.css/]
   */
  includeFiles?: RegExp[]

  /**
   * Style files to be ignored, matched with the resolved file path.
   *
   * 需要忽略的样式文件，使用解析后的文件路径匹配。
   */
  ignoreFiles?: RegExp[]

  /**
   * Selector prefix to be added to the matched selectors.
   *
   * 添加到匹配的选择器上的前缀。
   *
   * @default ':not(:where(.vp-raw, .vp-raw *))'
   */
  prefix?: string
}

// Ported from VitePress:
// https://github.com/vuejs/vitepress/blob/main/src/node/postcss/isolateStyles.ts
const DEFAULT_INCLUDE_FILES: RegExp[] = [/vp-doc\.css/u, /base\.css/u]

const DEFAULT_PREFIX = ':not(:where(.vp-raw, .vp-raw *))'

/**
 * Create a PostCSS plugin that isolates the styles of a page from the content
 * of a `raw` container.
 *
 * 创建一个 PostCSS 插件，使页面样式与 `raw` 容器的内容相互隔离。
 *
 * It prefixes the selectors of the matched style files, so the styles do not
 * apply inside the elements with the `vp-raw` class. This is a port of
 * VitePress `postcssIsolateStyles`, which is not provided by PostCSS itself.
 *
 * 它会为匹配的样式文件的选择器添加前缀，使这些样式不会作用于带有 `vp-raw` 类的元素内部。这是对 VitePress
 * `postcssIsolateStyles` 的移植，该功能并非 PostCSS 自带。
 *
 * @example
 *   // in postcss.config.js
 *   import { postcssIsolateStyles } from '@vuepress/plugin-markdown-raw'
 *
 *   export default {
 *     plugins: [postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] })],
 *   }
 *
 * @param options - Options of the plugin / 插件选项
 * @returns A PostCSS plugin / PostCSS 插件
 */
export const postcssIsolateStyles = ({
  includeFiles = DEFAULT_INCLUDE_FILES,
  ignoreFiles,
  prefix = DEFAULT_PREFIX,
}: IsolateStylesOptions = {}): Plugin => {
  const prefixNodes = selectorParser().astSync(prefix).first.nodes

  return {
    postcssPlugin: 'postcss-isolate-styles',

    Once: (root: Root): void => {
      const file = root.source?.input.file

      const isIncluded =
        includeFiles.length === 0 ||
        !file ||
        includeFiles.some((regExp) => regExp.test(file))

      if (!isIncluded) return

      const isIgnored =
        ignoreFiles !== undefined &&
        ignoreFiles.some((regExp) => (file ? regExp.test(file) : false))

      if (isIgnored) return

      root.walkRules((rule) => {
        if (!rule.selector || rule.selector.includes(prefix)) return

        if (
          rule.parent?.type === 'atrule' &&
          /\bkeyframes$/iu.test(rule.parent.name)
        )
          return

        rule.selector = selectorParser((selectors) => {
          selectors.each((selector) => {
            if (selector.nodes.length === 0) return

            const insertionIndex =
              selector.nodes.findLastIndex((node) => node.type !== 'pseudo') + 1

            selector.nodes.splice(
              insertionIndex,
              0,
              ...prefixNodes.map((node) => node.clone()),
            )
          })
        }).processSync(rule.selector)
      })
    },
  }
}
