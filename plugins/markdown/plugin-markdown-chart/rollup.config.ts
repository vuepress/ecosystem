import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index'),
  ...rollupBundle({
    base: 'client',
    files: [
      'components/ChartJS',
      'components/ECharts',
      'components/FlowChart',
      'components/MarkMap',
      'components/Mermaid',
      'index',
    ],
  }),
]
