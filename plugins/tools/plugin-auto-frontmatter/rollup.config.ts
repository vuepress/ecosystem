import { rollupBundle } from '../../../scripts/rollup.js'

export default rollupBundle('node/index', {
  external: ['chokidar', 'picomatch', 'p-map', 'js-yaml', 'gray-matter'],
})
