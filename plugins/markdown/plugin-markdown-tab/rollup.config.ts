import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['@mdit/plugin-tab'],
  }),
  ...rollupBundle({
    base: 'client',
    files: ['components/CodeTabs', 'components/Tabs', 'index'],
  }),
]
