import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: ['@mdit/plugin-demo', '@mdit/helper'],
  }),
  tsdownConfig({ base: 'client', files: ['index', 'config'] }),
]
