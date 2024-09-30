import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['@mdit/plugin-alert', '@mdit/plugin-container'],
  }),
  ...rollupBundle('client/config'),
]
