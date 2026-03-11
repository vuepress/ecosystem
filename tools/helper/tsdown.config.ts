import { tsdownConfig } from '../../scripts/tsdown.js'

export default tsdownConfig([
  'node/index',
  'client/noopComponent',
  'client/noopModule',
  'client/index',
  'shared/index',
  {
    'client/styles/*': './src/client/styles/*.scss',
    'client/styles/transition/*': './src/client/styles/transition/*.scss',
  },
])
