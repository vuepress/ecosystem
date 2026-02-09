import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index'),
  tsdownConfig('client/index', {
    external: ['@docsearch/js', 'ts-debounce'],
  }),
]
