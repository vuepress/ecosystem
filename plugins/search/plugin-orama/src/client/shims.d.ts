declare module '@internal/pagesComponents' {
  import type { ComponentOptions } from 'vue'

  export const pagesComponents: Record<string, ComponentOptions>
}

declare module '@temp/orama/index.js' {
  export type SearchIndexStore = Record<
    string,
    () => Promise<{ default: string }>
  >

  const database: SearchIndexStore
  export default database
}

declare module '@temp/orama/store.js' {
  export const store: Record<number, string>
}

declare module '@temp/orama/worker-options.js' {
  export const sortStrategy: 'max' | 'total'
}
