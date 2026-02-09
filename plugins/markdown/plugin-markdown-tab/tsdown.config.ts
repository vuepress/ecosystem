import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: ['@mdit/plugin-tab'],
  }),
  tsdownConfig({
    base: 'client',
    files: ['components/CodeTabs', 'components/Tabs', 'index'],
  }),
]
