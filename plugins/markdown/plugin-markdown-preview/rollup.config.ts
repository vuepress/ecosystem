import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['@mdit/plugin-demo', '@mdit/helper'],
  }),
  ...rollupBundle({ base: 'client', files: ['index', 'config'] }),
]
