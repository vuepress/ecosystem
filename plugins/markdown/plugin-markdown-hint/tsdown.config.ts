import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: ['@mdit/plugin-alert', '@mdit/plugin-container'],
  }),
  tsdownConfig('client/config'),
]
