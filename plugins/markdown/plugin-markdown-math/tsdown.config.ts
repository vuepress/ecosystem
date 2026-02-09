import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: ['@mdit/plugin-katex-slim', '@mdit/plugin-mathjax-slim'],
  }),
  tsdownConfig('client/composables/useKatexCopy', {
    external: ['katex/dist/contrib/copy-tex.min.js'],
  }),
]
