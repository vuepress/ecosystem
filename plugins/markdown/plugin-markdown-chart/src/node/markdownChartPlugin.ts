import {
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
  deepAssign,
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

declare module 'vuepress/markdown' {
  interface MarkdownOptions {
    chart?: MarkdownChartPluginOptions
  }
}

/**
 * Markdown chart plugin
 *
 * Markdown 图表插件
 *
 * @example
 * ```ts
 * import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'
 *
 * export default {
 *   plugins: [
 *     markdownChartPlugin({
 *       chartjs: true,
 *       echarts: true,
 *       flowchart: true,
 *       markmap: true,
 *       mermaid: true,
 *       plantuml: true,
 *     }),
 *   ],
 * }
 * ```
 */
export const markdownChartPlugin =
  (options: MarkdownChartPluginOptions = {}): Plugin =>
  (app) => {
    const mergedOptions = deepAssign({}, app.options.markdown.chart, options)
    app.options.markdown.chart = mergedOptions

    if (app.env.isDebug) logger.info('Options:', mergedOptions)

    const getStatus = (
      key: keyof MarkdownChartPluginOptions,
      pkgs: string[] = [],
    ): boolean => {
      const enabled = Boolean(mergedOptions[key])
      const pkgInstalled = pkgs.every((pkg) =>
        isInstalled(pkg, Boolean(mergedOptions[key])),
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

      extendsMarkdown: (md) => {
        const {
          DANGEROUS_ALLOW_SCRIPT_EXECUTION,
          DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST,
        } = mergedOptions

        const scriptOptions = {
          allowScripts: DANGEROUS_ALLOW_SCRIPT_EXECUTION ?? false,
          allowAll: DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST === '*',
          allowList: new Set<string>(
            isArray(DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST)
              ? DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST.map((file) => {
                  const result = file
                    // normalize `\` to `/` on Windows
                    .replaceAll('\\', '/')
                    // remove any leading slash
                    .replace(/^\//, '')

                  // ensure markdown extension
                  return result.endsWith('.md') ? result : `${result}.md`
                })
              : [],
          ),
        }

        if (status.chartjs) md.use(chartjs, scriptOptions)
        if (status.echarts) md.use(echarts, scriptOptions)
        if (status.flowchart) md.use(flowchart)
        if (isArray(mergedOptions.plantuml))
          md.use(plantuml, mergedOptions.plantuml)
        else if (mergedOptions.plantuml) md.use(plantuml)
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
