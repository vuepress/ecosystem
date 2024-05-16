import type { AutoLinkConfig } from 'vuepress/client'

/**
 * Base nav item, displayed as text
 */
export interface NavItem {
  text: string
  ariaLabel?: string
}

/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T> extends NavItem {
  children: T[]
}

/**
 * Navbar types
 */
// user config
export type NavbarItem = AutoLinkConfig
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[]
// resolved
export type ResolvedNavbarItem = NavbarItem | NavGroup<ResolvedNavbarItem>

/**
 * Sidebar types
 */
// user config
export type SidebarItem = NavItem & Partial<AutoLinkConfig>
export type SidebarGroup = SidebarItem &
  NavGroup<SidebarItem | SidebarGroup | string> & {
    collapsible?: boolean
  }
export type SidebarConfigArray = (SidebarItem | SidebarGroup | string)[]
export type SidebarConfigObjectItem = SidebarConfigArray | 'heading'
export type SidebarConfigObject = Record<string, SidebarConfigObjectItem>
export type SidebarConfig = SidebarConfigArray | SidebarConfigObject
// resolved
export type ResolvedSidebarItem = SidebarItem &
  Partial<NavGroup<ResolvedSidebarItem>> & {
    collapsible?: boolean
  }
