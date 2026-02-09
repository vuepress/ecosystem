import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig(
    {
      base: 'cli',
      files: ['index', 'generateScraperConfig'],
    },
    {
      external: ['commander'],
      dts: true,
    },
  ),
  tsdownConfig('node/index', {}),
  tsdownConfig('client/config', {
    external: [
      'meilisearch-docsearch',
      'meilisearch-docsearch/css/button',
      'meilisearch-docsearch/css/modal',
    ],
    dtsExternal: [
      'meilisearch-docsearch/css/button',
      'meilisearch-docsearch/css/modal',
    ],
    moduleSideEffects: (id: string) =>
      id.endsWith('.css') || id.startsWith('meilisearch-docsearch/css'),
  }),
]
