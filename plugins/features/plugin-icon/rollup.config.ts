import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', { external: ['@mdit/plugin-icon'] }),
  ...rollupBundle('client/index'),
]
