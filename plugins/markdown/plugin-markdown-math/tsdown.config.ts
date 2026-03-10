import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig([
  'node/index',
  'client/composables/useKatexCopy',
  { 'client/styles/*': './src/client/styles/*.scss' },
])
