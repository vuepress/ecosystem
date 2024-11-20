import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['@mdit/plugin-katex-slim', '@mdit/plugin-mathjax-slim'],
  }),
  ...rollupBundle('client/composables/useKatexCopy', {
    external: ['katex/dist/contrib/copy-tex.min.js'],
  }),
]
