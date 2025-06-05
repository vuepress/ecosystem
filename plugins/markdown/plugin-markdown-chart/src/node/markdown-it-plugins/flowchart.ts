import { encodeData } from '@vuepress/helper'
import type { PluginSimple } from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'

const SUPPORTED_PRESETS = ['ant', 'pie', 'vue']

const flowchartRender = (tokens: Token[], index: number): string => {
  const token = tokens[index]
  const { content, info } = token
  const preset = info.trim().split(':', 2)[1]

  return `<FlowChart code="${encodeData(content)}" preset="${
    SUPPORTED_PRESETS.includes(preset) ? preset : 'vue'
  }"></FlowChart>`
}

/**
 * Flowchart markdown-it plugin
 *
 * Flowchart markdown-it 插件
 */
export const flowchart: PluginSimple = (md) => {
  // Handle ```flow and ```flowchart blocks
  const { fence } = md.renderer.rules

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { info } = tokens[index]
    const [realInfo] = info.split(':', 2)

    if (realInfo === 'flow' || realInfo === 'flowchart')
      return flowchartRender(tokens, index)

    return fence!(...args)
  }

  md.renderer.rules.flowchart = flowchartRender
}
