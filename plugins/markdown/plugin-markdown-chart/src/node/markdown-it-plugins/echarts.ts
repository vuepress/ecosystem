import { container } from '@mdit/plugin-container'
import { encodeData } from '@vuepress/helper'
import type { PluginWithOptions } from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import { colors } from 'vuepress/utils'

const echartsRender = (tokens: Token[], index: number): string => {
  const { content, info } = tokens[index]
  const [, title] = info.trim().split(':', 2)

  return `<ECharts config="${encodeData(content)}"${
    title ? ` title="${encodeURIComponent(title)}"` : ''
  }></ECharts>`
}

export interface EChartsPluginOptions {
  /**
   * Allow executing custom scripts inside ECharts blocks.
   *
   * 允许在 ECharts 块内执行自定义脚本。
   *
   * @default false
   */
  allowScripts?: boolean

  /**
   * Allow all scripts to be executed inside ECharts blocks.
   *
   * 允许在 ECharts 块内执行所有脚本。
   *
   * @default false
   */
  allowAll?: boolean

  /**
   * List of files allowed to execute scripts inside ECharts blocks.
   *
   * 允许在 ECharts 块内执行脚本的文件列表。
   *
   * @default new Set()
   */
  allowList?: Set<string>
}

/**
 * ECharts markdown-it plugin
 *
 * ECharts markdown-it 插件
 */
export const echarts: PluginWithOptions<EChartsPluginOptions> = (
  md,
  options,
) => {
  const { allowScripts, allowAll, allowList = new Set() } = options ?? {}

  // Handle ```echarts blocks
  const { fence } = md.renderer.rules

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { info } = tokens[index]
    const [realInfo] = info.split(':', 2)

    if (realInfo === 'echarts') return echartsRender(tokens, index)

    return fence!(...args)
  }

  md.renderer.rules.echarts = echartsRender

  container(md, {
    name: 'echarts',

    openRender: (tokens, index, _options, env) => {
      const title = tokens[index].info
        .trimStart()
        // 'echarts' length
        .slice(7)
        .trim()

      let config = '{}'
      let isJavaScript = false
      let isInAllowList = false

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const filePathRelative: string = env?.filePathRelative ?? ''

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i]

        if (type === 'container_echarts_close') {
          if (isJavaScript && !isInAllowList) {
            // eslint-disable-next-line no-console
            console.warn(
              `\
${colors.magenta('[echarts]')}: JavaScript in echarts block is found in ${colors.cyan(filePathRelative)}, ${colors.red('it is ignored for security reasons')}.
To enable the chart, you must manually add it to allowlist, see https://vuepress.vuejs.org/plugin/markdown/markdown-chart/echarts.html for details.
`,
            )
            tokens[i].hidden = true
          }
          break
        }

        if (!content) continue
        if (type === 'fence')
          if (info === 'json') {
            config = content
          } else if (info === 'js' || info === 'javascript') {
            config = content
            isJavaScript = true

            if (allowScripts && (allowAll || allowList.has(filePathRelative))) {
              isInAllowList = true
            }
          }

        // Set to an unknown token type
        tokens[i].type = 'echarts_empty'
        // Hide token
        tokens[i].hidden = true
      }

      if (isJavaScript && !isInAllowList) {
        return ''
      }

      return `<ECharts config="${encodeData(config)}"${
        title ? ` title="${encodeURIComponent(title)}"` : ''
      }${isJavaScript ? ' type="js"' : ''}>`
    },
    closeRender: (tokens, index) => (tokens[index].hidden ? '' : '</ECharts>'),
  })
}
