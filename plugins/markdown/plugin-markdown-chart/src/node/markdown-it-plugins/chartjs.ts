import { container } from '@mdit/plugin-container'
import { encodeData } from '@vuepress/helper'
import type { PluginSimple } from 'markdown-it'

/**
 * Chart.js markdown-it plugin
 *
 * Chart.js markdown-it 插件
 */
export const chartjs: PluginSimple = (md) => {
  container(md, {
    name: 'chartjs',
    openRender: (tokens, index) => {
      const title = tokens[index].info
        .trimStart()
        // "chartjs" length
        .slice(7)
        .trim()

      let config = '{}'
      let configType = ''

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i]

        if (type === 'container_chartjs_close') break

        if (!content) continue
        if (type === 'fence')
          if (info === 'json') {
            config = encodeData(content)
            configType = 'json'
          } else if (info === 'js' || info === 'javascript') {
            config = encodeData(content)
            configType = 'js'
          }

        // Set to an unknown token type
        tokens[i].type = 'chartjs_empty'
        // Hide token
        tokens[i].hidden = true
      }

      return `<ChartJS config="${config}" ${
        title ? `title="${encodeURIComponent(title)}" ` : ''
      }type="${configType}">`
    },
    closeRender: () => `</ChartJS>`,
  })
}
