import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig(['cli/index', 'cli/generateScraperConfig'], {
    dts: true,
  }),
  tsdownConfig('node/index'),
  tsdownConfig('client/config', {
    moduleSideEffects: (id: string) =>
      id.endsWith('.css') ||
      id.endsWith('.scss') ||
      id.startsWith('meilisearch-docsearch/css'),
  }),
]
