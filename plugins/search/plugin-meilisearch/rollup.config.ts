import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {}),
  ...rollupBundle(
    { base: 'client', files: ['components/MeiliSearch', 'config'] },
    {
      external: [
        'meilisearch-docsearch',
        'meilisearch-docsearch/css/button',
        'meilisearch-docsearch/css/modal',
      ],
      dtsExternal: [
        'meilisearch-docsearch/css/button',
        'meilisearch-docsearch/css/modal',
      ],
      moduleSideEffects: (id) =>
        id.endsWith('.css') || id.startsWith('meilisearch-docsearch/css'),
    },
  ),
]
