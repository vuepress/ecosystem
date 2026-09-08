import { tsdownConfig } from '../../../scripts/tsdown.ts'

export default tsdownConfig([
  'node/index',
  { 'client/styles/*': './src/client/styles/*.scss' },
])
