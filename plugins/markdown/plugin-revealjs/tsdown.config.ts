import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: ['@mdit/plugin-uml'],
  }),
  tsdownConfig({
    base: 'client',
    files: ['layouts/index', 'index'],
  }),
]
