import { tsdownConfig } from '../../scripts/tsdown.ts'

export default tsdownConfig([
  'node/index',
  'client/index',
  {
    'client/styles/twoslash': './src/client/styles/twoslash.scss',
  },
])
