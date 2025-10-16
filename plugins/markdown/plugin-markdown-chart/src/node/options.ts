import type { MarkdownItPlantumlOptions } from '@mdit/plugin-plantuml'

export interface MarkdownChartPluginOptions {
  /**
   * Whether to enable chart support
   *
   * 是否启用 chart 图表支持
   *
   * @default false
   */
  chartjs?: boolean

  /**
   * Whether to enable echarts support
   *
   * 是否启用 echarts 图表支持
   *
   * @default false
   */
  echarts?: boolean

  /**
   * Whether to enable flowchart support
   *
   * 是否启用 flowchart 流程图支持
   *
   * @default false
   */
  flowchart?: boolean

  /**
   * Whether to enable markmap support
   *
   * 是否启用 markmap 流程图支持
   *
   * @default false
   */
  markmap?: boolean

  /**
   * Whether to enable mermaid support
   *
   * 是否启用 Mermaid 流程图支持
   *
   * @default false
   */
  mermaid?: boolean

  /**
   * Whether enable plantuml support
   *
   * 是否启用 plantuml 支持
   *
   * @default false
   */
  plantuml?: MarkdownItPlantumlOptions[] | boolean
}
