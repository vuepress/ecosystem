import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig(
  ['cli/index', 'cli/generateScraperConfig', 'node/index', 'client/config'],
  {
    moduleSideEffects: (id: string) =>
      id.endsWith('.css') ||
      id.endsWith('.scss') ||
      id.startsWith('meilisearch-docsearch/css'),
  },
)
