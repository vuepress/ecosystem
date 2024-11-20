import { rollupBundle } from '../../../scripts/rollup.js'

export default rollupBundle('node/index', {
  external: ['prismjs', 'prismjs/components/index.js'],
})
