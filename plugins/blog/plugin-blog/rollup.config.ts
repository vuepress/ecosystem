import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['chokidar'],
  }),
  ...rollupBundle('client/index'),
]
