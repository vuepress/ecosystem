import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['@mdit/plugin-uml'],
  }),
  ...rollupBundle({
    base: 'client',
    files: ['layouts/index', 'index'],
  }),
]
