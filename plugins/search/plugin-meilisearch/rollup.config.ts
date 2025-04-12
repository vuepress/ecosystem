import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {}),
  ...rollupBundle(
    { base: 'client', files: ['components/MeiliSearch', 'config'] },
    {
      external: ['meilisearch-docsearch', 'meilisearch-docsearch/css'],
      dtsExternal: ['meilisearch-docsearch/css'],
      moduleSideEffects: (id) =>
        id.endsWith('.css') || id === 'meilisearch-docsearch/css',
    },
  ),
]
