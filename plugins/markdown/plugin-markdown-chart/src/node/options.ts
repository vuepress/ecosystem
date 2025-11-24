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

  /**
   * Allow executing custom scripts inside chart blocks.
   *
   * 允许在图表代码块中执行自定义脚本。
   *
   * # Caution! Enabling this may introduce XSS or remote code risks.
   *
   * # 注意！启用可能带来 XSS 或远程代码风险。
   *
   * @default false
   */
  DANGEROUS_ALLOW_SCRIPT_EXECUTION?: boolean

  /**
   * Allowlist of source files permitted to run chart scripts.
   *
   * 允许执行图表脚本的源文件列表（允许清单）。
   *
   * @description Only effective when `DANGEROUS_ALLOW_SCRIPT_EXECUTION` is set; paths must match real files.
   *
   * 仅在 `DANGEROUS_ALLOW_SCRIPT_EXECUTION` 被设置后生效；路径需与实际文件匹配。
   */
  DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST?: string[] | '*'
}
