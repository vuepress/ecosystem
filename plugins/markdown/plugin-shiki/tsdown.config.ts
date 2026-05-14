import { tsdownConfig } from '../../../scripts/tsdown.ts'

export default tsdownConfig([
  'node/index',
  'node/resolveLang',
  { 'client/styles/*': './src/client/styles/*.scss' },
])
