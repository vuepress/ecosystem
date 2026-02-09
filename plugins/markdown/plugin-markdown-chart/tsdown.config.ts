import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: ['@mdit/plugin-container', '@mdit/plugin-plantuml'],
  }),
  tsdownConfig(
    {
      base: 'client',
      files: [
        'components/ChartJS',
        'components/ECharts',
        'components/FlowChart',
        'components/MarkMap',
        'components/Mermaid',
        'index',
      ],
    },
    {
      external: [
        'chart.js/auto',
        'markmap-lib',
        'markmap-view',
        'markmap-toolbar',
        'echarts',
        'flowchart.ts',
        'mermaid/dist/mermaid.esm.min.mjs',
      ],
    },
  ),
]
