import { rollupBundle } from '../../../scripts/rollup.js'

export default rollupBundle('node/index', {
  external: ['magic-string', 'unplugin'],
})
