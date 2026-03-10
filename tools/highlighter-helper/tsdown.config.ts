import { tsdownConfig } from '../../scripts/tsdown.js'

export default tsdownConfig([
  'node/index',
  'client/index',
  { 'client/styles/*': './src/client/styles/*.scss' },
])
