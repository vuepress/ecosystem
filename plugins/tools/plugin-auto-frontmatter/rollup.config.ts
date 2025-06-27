import { rollupBundle } from '../../../scripts/rollup.js'

export default rollupBundle('node/index', {
  external: ['chokidar', 'micromatch', 'p-map', 'js-yaml', 'gray-matter'],
})
