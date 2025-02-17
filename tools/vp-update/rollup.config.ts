import { rollupBundle } from '../../scripts/rollup.js'

export default rollupBundle('index', {
  external: [/^node:/, 'commander', 'semver'],
  dts: false,
})
