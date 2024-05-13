declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const comp: ComponentOptions
  export default comp
}

declare module '@internal/navbar' {
  import type { ResolvedNavItem } from '../shared/resolved/navbar.js'

  export const navbarData: Record<string, ResolvedNavItem[]>
}

declare module '@internal/sidebar' {
  import type { ResolvedSidebarItem } from '../shared/resolved/sidebar.js'

  export const sidebarData: Record<string, ResolvedSidebarItem[]>
}
