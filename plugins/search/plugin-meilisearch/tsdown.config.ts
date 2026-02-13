import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig(['cli/index', 'cli/generateScraperConfig'], {
    dts: true,
  }),
  tsdownConfig(['node/index', 'client/config']),
]
