import { rollupBundle } from '../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: [
      '@shikijs/twoslash/core',
      'mdast-util-from-markdown',
      'mdast-util-gfm',
      'mdast-util-to-hast',
      'twoslash',
      'twoslash-vue',
    ],
    dtsExternal: ['@shikijs/twoslash/core'],
  }),
  ...rollupBundle('client/index', {
    external: ['floating-vue'],
  }),
]
