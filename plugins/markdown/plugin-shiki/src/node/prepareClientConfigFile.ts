import { getModulePath } from '@vuepress/helper'
import { bundledThemesInfo } from 'shiki'
import type { App } from 'vuepress'
import { isString } from 'vuepress/shared'

import type { ShikiPluginOptions } from './options.js'
import type { ShikiTheme } from './types.js'
import { PLUGIN_NAME } from './utils.js'

const resolve = (module: string): string => getModulePath(module, import.meta)

/**
 * Names of the themes the styles are generated for
 *
 * The styles are written by `scripts/generateThemeColors.ts`, which generates
 * them for every bundled theme.
 *
 * 已生成样式的主题名称
 *
 * 样式由 `scripts/generateThemeColors.ts` 生成，它会为每个内置主题生成一份。
 */
const BUNDLED_THEMES = new Set(bundledThemesInfo.map(({ id }) => id))

/**
 * Get the name of a theme, when its styles are generated
 *
 * A theme may be a name or an object holding a custom palette. A custom theme
 * has no generated styles, in which case the fallback colors of the plugin are
 * used and the palette has to declare the code block colors itself.
 *
 * 获取主题的名称，仅当其样式已生成时
 *
 * 主题可能是名称，也可能是包含自定义调色板的对象。自定义主题没有生成样式，此时会使用插件的 兜底颜色，调色板需要自行声明代码块颜色。
 *
 * @param theme - Theme of the option / 选项中的主题
 * @returns The name of the theme, or `null` when there is no generated style /
 *   主题的名称，没有生成的样式时返回 `null`
 */
const resolveThemeName = (theme: ShikiTheme | undefined): string | null =>
  isString(theme) && BUNDLED_THEMES.has(theme) ? theme : null

/**
 * Get the names of the themes the styles are generated for
 *
 * A theme used in both modes is a single palette, so a site that only sets one
 * theme uses it in both of them.
 *
 * 获取已生成样式的主题名称
 *
 * 同时用于两种模式的主题是一套调色板，因此只设置一个主题的站点会在两种模式中都使用它。
 *
 * @param options - Plugin options / 插件选项
 * @returns Names of the light and the dark theme, `null` when there is no
 *   generated style / 日间与夜间主题的名称，没有生成的样式时为 `null`
 */
const resolveThemeNames = (
  options: ShikiPluginOptions,
): { dark: string | null; light: string | null } =>
  'themes' in options
    ? {
        dark: resolveThemeName(options.themes.dark),
        light: resolveThemeName(options.themes.light),
      }
    : {
        dark: resolveThemeName(options.theme ?? 'nord'),
        light: resolveThemeName(options.theme ?? 'nord'),
      }

/**
 * Generate the client config file, which registers the components required by
 * the enabled features
 *
 * 生成客户端配置文件，注册已启用功能所需的组件
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param options - Plugin options / 插件选项
 * @returns Path of the generated client config file / 生成的客户端配置文件的路径
 */
// oxlint-disable-next-line max-lines-per-function, complexity, max-statements
export const prepareClientConfigFile = (
  app: App,
  options: ShikiPluginOptions,
): Promise<string> => {
  const {
    lineNumbers = true,
    highlightLines = true,
    collapsedLines = 'disable',
    codeBlockTitle = true,
    notationDiff,
    notationErrorLevel,
    notationFocus,
    notationHighlight,
    notationWordHighlight,
    whitespace,
    twoslash,
  } = options
  const imports: string[] = [
    `import "${resolve('@vuepress/highlighter-helper/styles/base.css')}"`,
    `import "${resolve(`${PLUGIN_NAME}/shiki.css`)}"`,
  ]

  // The colors of the theme are generated for every bundled theme, and they are
  // imported after `shiki.css`, which holds the fallback colors.
  const { dark, light } = resolveThemeNames(options)
  const themeStyles =
    light && light === dark
      ? [`${light}.css`]
      : [
          ...(light ? [`${light}.light.css`] : []),
          ...(dark ? [`${dark}.dark.css`] : []),
        ]

  for (const style of themeStyles)
    imports.push(`import "${resolve(`${PLUGIN_NAME}/styles/${style}`)}"`)

  const enhances: string[] = []
  const setups: string[] = []

  if (lineNumbers !== 'disable') {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/line-numbers.css')}"`,
    )
  }

  if (highlightLines || notationHighlight) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-highlight.css')}"`,
    )
  }

  if (notationDiff) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-diff.css')}"`,
    )
  }

  if (notationErrorLevel) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-error-level.css')}"`,
    )
  }

  if (notationFocus) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-focus.css')}"`,
    )
  }

  if (notationHighlight) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-highlight.css')}"`,
    )
  }

  if (notationWordHighlight) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/notation-word-highlight.css')}"`,
    )
  }

  if (whitespace) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/whitespace.css')}"`,
    )
  }

  if (collapsedLines !== 'disable') {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/collapsed-lines.css')}"`,
      `import { setupCollapsedLines } from "${resolve('@vuepress/highlighter-helper/client')}"`,
    )
    setups.push('setupCollapsedLines()')
  }

  if (codeBlockTitle) {
    imports.push(
      `import "${resolve('@vuepress/highlighter-helper/styles/code-block-title.css')}"`,
    )
  }

  if (twoslash) {
    imports.push(
      `import { enhanceTwoslash } from "${resolve('@vuepress/shiki-twoslash/client')}"`,
      `import "${resolve('@vuepress/shiki-twoslash/twoslash.css')}"`,
    )
    enhances.push('enhanceTwoslash(app)')
  }

  let code = imports.join('\n')

  if (setups.length || enhances.length) {
    code += `
export default {
`

    if (enhances.length) {
      code += `\
  enhance({ app }) {
    ${enhances.join('\n    ')}
  },
`
    }

    if (setups.length) {
      code += `\
  setup() {
    ${setups.join('\n    ')}
  },
`
    }

    code += `\
}
`
  }

  return app.writeTemp('shiki/config.js', code)
}
