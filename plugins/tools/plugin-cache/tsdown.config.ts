import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig('node/index', {
  external: ['ci-info', 'lru-cache'],
})
