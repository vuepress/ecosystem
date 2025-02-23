import {
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
  isArray,
} from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import {
  chartjs,
  echarts,
  flowchart,
  markmap,
  mermaid,
  plantuml,
} from './markdown-it-plugins/index.js'
import type { MarkdownChartPluginOptions } from './options.js'
import { prepareConfigFile } from './prepareConfigFile.js'
import { PLUGIN_NAME, isInstalled, logger } from './utils.js'

export const markdownChartPlugin =
  (options: MarkdownChartPluginOptions = {}): Plugin =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const getStatus = (
      key: keyof MarkdownChartPluginOptions,
      pkgs: string[] = [],
    ): boolean => {
      const enabled = Boolean(options[key])
      const pkgInstalled = pkgs.every((pkg) =>
        isInstalled(pkg, Boolean(options[key])),
      )

      return enabled && pkgInstalled
    }

    const status = {
      chartjs: getStatus('chartjs', ['chart.js']),
      echarts: getStatus('echarts', ['echarts']),
      flowchart: getStatus('flowchart', ['flowchart.ts']),
      markmap: getStatus('markmap', [
        'markmap-lib',
        'markmap-toolbar',
        'markmap-view',
      ]),
      mermaid: getStatus('mermaid', ['mermaid']),
    }

    return {
      name: PLUGIN_NAME,

      define: {
        __MC_DELAY__: options.delay ?? 800,
      },

      extendsMarkdown: (md) => {
        if (status.chartjs) md.use(chartjs)
        if (status.echarts) md.use(echarts)
        if (status.flowchart) md.use(flowchart)
        if (isArray(options.plantuml)) md.use(plantuml, options)
        else if (options.plantuml) md.use(plantuml)
        if (status.markmap) md.use(markmap)
        if (status.mermaid) md.use(mermaid)
      },

      extendsBundlerOptions: (bundlerOptions: unknown): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          '@vuepress/helper',
          'fflate',
        ])

        if (status.chartjs) {
          addViteOptimizeDepsExclude(
            bundlerOptions,
            app,
            'chart.js/auto/auto.mjs',
          )
          addViteSsrExternal(bundlerOptions, app, 'chart.js')
        }

        if (status.echarts) {
          addViteOptimizeDepsExclude(bundlerOptions, app, 'echarts')
          addViteSsrExternal(bundlerOptions, app, 'echarts')
        }

        if (status.flowchart) {
          addViteOptimizeDepsExclude(bundlerOptions, app, 'flowchart.ts')
          addViteSsrExternal(bundlerOptions, app, 'flowchart.ts')
        }

        if (status.markmap) {
          addViteOptimizeDepsInclude(bundlerOptions, app, [
            'markmap-lib',
            'markmap-toolbar',
            'markmap-view',
          ])
          addViteSsrExternal(bundlerOptions, app, [
            'markmap-lib',
            'markmap-toolbar',
            'markmap-view',
          ])
        }

        if (status.mermaid) {
          addViteOptimizeDepsExclude(
            bundlerOptions,
            app,
            'mermaid/dist/mermaid.esm.min.mjs',
          )
          addViteSsrExternal(bundlerOptions, app, 'mermaid')
        }
      },

      clientConfigFile: () => prepareConfigFile(app, status),
    }
  }
