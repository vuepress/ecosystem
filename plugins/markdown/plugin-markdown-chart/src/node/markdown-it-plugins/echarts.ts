import { container } from '@mdit/plugin-container'
import { encodeData } from '@vuepress/helper'
import type { PluginSimple } from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'

const echartsRender = (tokens: Token[], index: number): string => {
  const { content, info } = tokens[index]
  const title = info.trim().split(':', 2)[1]

  return `<ECharts config="${encodeData(content)}"${
    title ? ` title="${encodeURIComponent(title)}"` : ''
  }></ECharts>`
}

/**
 * ECharts markdown-it plugin
 *
 * ECharts markdown-it 插件
 */
export const echarts: PluginSimple = (md) => {
  // Handle ```echarts blocks
  const { fence } = md.renderer.rules

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { info } = tokens[index]
    const realInfo = info.split(':', 2)[0]

    if (realInfo === 'echarts') return echartsRender(tokens, index)

    return fence!(...args)
  }

  md.renderer.rules.echarts = echartsRender

  container(md, {
    name: 'echarts',

    openRender: (tokens, index) => {
      const title = tokens[index].info
        .trimStart()
        // 'echarts' length
        .slice(7)
        .trim()

      let config = '{}'
      let isJavaScript = false

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i]

        if (type === 'container_echarts_close') break

        if (!content) continue
        if (type === 'fence')
          if (info === 'json') {
            config = content
          } else if (info === 'js' || info === 'javascript') {
            config = content
            isJavaScript = true
          }

        // Set to an unknown token type
        tokens[i].type = 'echarts_empty'
        // Hide token
        tokens[i].hidden = true
      }

      return `<ECharts config="${encodeData(config)}"${
        title ? ` title="${encodeURIComponent(title)}"` : ''
      }${isJavaScript ? ' type="js"' : ''}>`
    },
    closeRender: () => `</ECharts>`,
  })
}
