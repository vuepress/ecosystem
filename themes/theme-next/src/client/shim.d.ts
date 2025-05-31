declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const comp: ComponentOptions
  export default comp
}

declare module '@internal/sidebar' {
  import type { ResolvedSidebarItem } from '../shared/resolved/sidebar.js'

  export const sidebarData: Record<string, ResolvedSidebarItem[]>
}
