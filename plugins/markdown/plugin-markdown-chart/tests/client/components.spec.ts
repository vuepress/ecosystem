import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { Component } from 'vue'
import { defineComponent, h } from 'vue'

import ChartJS from '../../src/client/components/ChartJS.js'
import ECharts from '../../src/client/components/ECharts.js'
import FlowChart from '../../src/client/components/FlowChart.js'
import MarkMap from '../../src/client/components/MarkMap.js'
import Mermaid from '../../src/client/components/Mermaid.js'

/**
 * Render a chart component with props
 *
 * `renderVuePress()` renders the root component without props, so the component
 * under test is wrapped in a component that passes them.
 *
 * @param component - Component to render / 要渲染的组件
 * @param props - Props to pass / 要传入的 props
 * @returns The rendered HTML / 渲染结果
 */
const render = (
  component: Component,
  props: Record<string, unknown> = {},
): Promise<string> =>
  renderVuePress({
    rootComponent: defineComponent({
      name: 'ChartFixture',
      setup: () => (): ReturnType<typeof h> => h(component, props),
    }),
  })

describe('chart js component', () => {
  it('should render a hidden wrapper and a placeholder during SSR', async () => {
    const html = await render(ChartJS, { config: '{}' })

    expect(html).toContain('class="chartjs-wrapper"')
    expect(html).toContain('display:none')
    expect(html).toContain('<canvas')
    expect(html).toContain('chartjs-loading')
  })

  it('should render the decoded title', async () => {
    const html = await render(ChartJS, { config: '{}', title: 'My%20Chart' })

    expect(html).toContain('class="chartjs-title"')
    expect(html).toContain('My Chart')
  })
})

describe('echarts component', () => {
  it('should render an empty container and a placeholder during SSR', async () => {
    const html = await render(ECharts, { config: '{}' })

    expect(html).toContain('class="echarts-container"')
    expect(html).toContain('echarts-loading')
  })

  it('should render the decoded title', async () => {
    const html = await render(ECharts, { config: '{}', title: 'My%20Chart' })

    expect(html).toContain('class="echarts-title"')
    expect(html).toContain('My Chart')
  })
})

describe('mermaid component', () => {
  it('should render the actions and a placeholder during SSR', async () => {
    const html = await render(Mermaid, { code: 'graph%20TD' })

    expect(html).toContain('class="mermaid-actions"')
    expect(html).toContain('class="preview-button"')
    expect(html).toContain('class="download-button"')
    expect(html).toContain('class="mermaid-wrapper"')
    expect(html).toContain('mermaid-loading')
    // the diagram is only rendered on the client
    expect(html).not.toContain('mermaid-content')
  })
})

describe('markmap component', () => {
  it('should render the svg and a placeholder during SSR', async () => {
    const html = await render(MarkMap, { content: '#%20Root' })

    expect(html).toContain('class="markmap-wrapper"')
    expect(html).toContain('class="markmap-svg"')
    expect(html).toContain('markmap-loading')
  })
})

describe('flowchart component', () => {
  it('should render a hidden wrapper and a placeholder during SSR', async () => {
    const html = await render(FlowChart, { code: 'st=>start: Start' })

    expect(html).toContain('class="flowchart-wrapper vue"')
    expect(html).toContain('display:none')
    expect(html).toContain('flowchart-loading')
  })

  it('should use the given preset as the wrapper class', async () => {
    const html = await render(FlowChart, {
      code: 'st=>start: Start',
      preset: 'ant',
    })

    expect(html).toContain('class="flowchart-wrapper ant"')
  })
})
