import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index'),
  tsdownConfig(
    {
      base: 'client',
      files: ['config', 'index'],
    },
    {
      external: ['@internal/themeData', '@vue/devtools-api'],
    },
  ),
]
