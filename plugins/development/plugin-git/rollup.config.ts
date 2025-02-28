import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['execa'],
  }),
  ...rollupBundle('client/index'),
]
