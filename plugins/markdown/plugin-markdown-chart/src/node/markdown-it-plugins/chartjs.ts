import { container } from '@mdit/plugin-container'
import { encodeData } from '@vuepress/helper'
import type { PluginWithOptions } from 'markdown-it'
import { colors } from 'vuepress/utils'

export interface ChartJSPluginOptions {
  /**
   * Allow executing custom scripts inside Chart.js blocks.
   *
   * 允许在 Chart.js 块内执行自定义脚本。
   *
   * @default false
   */
  allowScripts?: boolean

  /**
   * Allow all scripts to be executed inside Chart.js blocks.
   *
   * 允许在 Chart.js 块内执行所有脚本。
   *
   * @default false
   */
  allowAll?: boolean

  /**
   * List of files allowed to execute scripts inside Chart.js blocks.
   *
   * 允许在 Chart.js 块内执行脚本的文件列表。
   *
   * @default new Set()
   */
  allowList?: Set<string>
}

/**
 * Chart.js markdown-it plugin
 *
 * Chart.js markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param options - Plugin options / 插件选项
 */
export const chartjs: PluginWithOptions<ChartJSPluginOptions> = (
  md,
  options,
) => {
  const { allowScripts, allowAll, allowList = new Set() } = options ?? {}

  container(md, {
    name: 'chartjs',
    openRender: (tokens, index, _options, env) => {
      const title = tokens[index].info
        .trimStart()
        // "chartjs" length
        .slice(7)
        .trim()

      let config = '{}'
      let isJavaScript = false
      let isInAllowList = false

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const filePathRelative: string = env?.filePathRelative ?? ''

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i]

        if (type === 'container_chartjs_close') {
          if (isJavaScript && !isInAllowList) {
            // eslint-disable-next-line no-console
            console.warn(
              `\
${colors.magenta('chartjs')}: JavaScript in Chart.js block is found in ${colors.cyan(filePathRelative)}, ${colors.red('it is ignored for security reasons')}.
To enable the chart, you must manually add it to allowlist, see https://vuepress.vuejs.org/plugin/markdown/markdown-charts/chartjs.html for details.
`,
            )
            tokens[i].hidden = true
          }
          break
        }

        if (!content) continue
        if (type === 'fence') {
          if (info === 'json') {
            config = encodeData(content)
          } else if (info === 'js' || info === 'javascript') {
            config = encodeData(content)
            isJavaScript = true

            if (allowScripts && (allowAll || allowList.has(filePathRelative)))
              isInAllowList = true
          }
        }

        // Set to an unknown token type
        tokens[i].type = 'chartjs_empty'
        // Hide token
        tokens[i].hidden = true
      }

      if (isJavaScript && !isInAllowList) return ''

      return `<ChartJS config="${config}"${
        title ? ` title="${encodeURIComponent(title)}"` : ''
      }${isJavaScript ? ' type="js"' : ''}>`
    },
    closeRender: (tokens, index) => (tokens[index].hidden ? '' : '</ChartJS>'),
  })
}
