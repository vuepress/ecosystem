import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: [
      'byte-size',
      'gray-matter',
      'millify',
      'remark',
      'tokenx',
      'unist-util-remove',
    ],
  }),
]
