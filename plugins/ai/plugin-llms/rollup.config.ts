import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
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
