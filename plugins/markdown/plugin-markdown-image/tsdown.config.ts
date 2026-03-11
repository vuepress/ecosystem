import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig([
  'node/index',
  { 'client/styles/*': './src/client/styles/*.scss' },
])
