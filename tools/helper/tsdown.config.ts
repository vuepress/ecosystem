import { tsdownConfig } from '../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index'),
  tsdownConfig({
    base: 'client',
    files: ['noopComponent', 'noopModule', 'index'],
  }),
  tsdownConfig('shared/index'),
]
