import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig(
  [
    'node/index',
    'client/layouts/index',
    'client/index',
    {
      'client/styles/fonts/*': './src/client/styles/fonts/*.scss',
      'client/styles/themes/*': './src/client/styles/themes/*.scss',
      'client/styles/vars': './src/client/styles/vars.css',
    },
  ],
  {},
)
