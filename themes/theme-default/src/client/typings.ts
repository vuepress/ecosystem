import type {
  AutoLinkOptions,
  NavGroup,
  NavbarLinkOptions,
  SidebarGroupOptions,
  SidebarLinkOptions,
} from '../shared/index.js'

export type NavbarItem =
  | NavbarLinkOptions
  | NavGroup<AutoLinkOptions | NavGroup<AutoLinkOptions>>

export type SidebarLinkItem = SidebarLinkOptions

export interface SidebarHeaderItem {
  text: string
  link: string
  children?: SidebarHeaderItem[]
}

export interface SidebarGroupItem extends SidebarGroupOptions {
  prefix?: string
  children: (SidebarHeaderItem | SidebarItem)[]
}

export type SidebarItem = SidebarGroupItem | SidebarLinkItem
