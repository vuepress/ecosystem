import { tsdownConfig } from '../../scripts/tsdown.js'

export default tsdownConfig('index', {
  external: [/^node:/, 'commander', 'semver'],
  dts: false,
})
