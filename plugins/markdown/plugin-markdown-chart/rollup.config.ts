import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['@mdit/plugin-container', '@mdit/plugin-plantuml'],
  }),
  ...rollupBundle(
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
