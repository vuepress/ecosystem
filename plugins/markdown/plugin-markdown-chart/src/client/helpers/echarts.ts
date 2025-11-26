import type { EChartsOption } from 'echarts'

export interface EChartsConfig {
  /**
   * ECharts global options
   *
   * ECharts 全局选项
   */
  option?: EChartsOption

  /**
   * ECharts setup function
   *
   * ECharts 初始化函数
   */
  setup?: () => Promise<void>

  /**
   * Whether ECharts has been set up
   *
   * ECharts 是否已初始化
   */
  isSetup?: boolean
}

let echartsConfig: EChartsConfig = {}

export const defineEChartsConfig = (config: EChartsConfig): void => {
  echartsConfig = config
}

/**
 * @internal
 */
export const useEChartsConfig = (): EChartsConfig => echartsConfig
