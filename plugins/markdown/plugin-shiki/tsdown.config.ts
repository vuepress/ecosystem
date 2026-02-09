import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig(
  { base: 'node', files: ['index', 'resolveLang'] },
  {
    external: ['@shikijs/transformers', 'nanoid', 'shiki', 'synckit'],
  },
)
