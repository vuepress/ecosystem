import { rollupBundle } from '../../../scripts/rollup.js'

export default rollupBundle('node/index', {
  external: [
    'chokidar',
    'nanoid',
    'picomatch',
    'p-map',
    'js-yaml',
    'gray-matter',
  ],
})
