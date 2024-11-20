import { rollupBundle } from '../../scripts/rollup.js'

export default rollupBundle('index', {
  external: [/^node:/, 'cac', 'semver'],
  dts: false,
})
