import type { DocSearchOptions } from 'meilisearch-docsearch'

export type MeiliSearchDocSearchOptions = Omit<
  DocSearchOptions,
  'container' | 'environment'
>
