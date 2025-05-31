declare module '@internal/pagesComponents' {
  import type { ComponentOptions } from 'vue'

  export const pagesComponents: Record<string, ComponentOptions>
}

declare module '@temp/slimsearch/index.js' {
  export type SearchIndexStore = Record<
    string,
    () => Promise<{ default: string }>
  >

  const database: SearchIndexStore
  export default database
}

declare module '@temp/slimsearch/store.js' {
  export const store: string[]
}

declare module '@temp/slimsearch/worker-options.js' {
  export const sortStrategy: 'max' | 'total'
}
