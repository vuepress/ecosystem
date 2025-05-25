import { rollupBundle } from '../../../scripts/rollup.js'

export default rollupBundle(
  { base: 'node', files: ['index', 'resolveLang'] },
  {
    external: ['@shikijs/transformers', 'nanoid', 'shiki', 'synckit'],
  },
)
