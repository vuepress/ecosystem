import { tsdownConfig } from '../../../scripts/tsdown.ts'

export default tsdownConfig([
  'node/index',
  'client/composables/useKatexCopy',
  { 'client/styles/*': './src/client/styles/*.scss' },
])
