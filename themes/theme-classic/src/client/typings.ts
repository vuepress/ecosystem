import type {
  AutoLinkOptions,
  NavGroup,
  SidebarGroupOptions,
  SidebarLinkOptions,
} from '../shared/index.js'

/** A resolved navbar link, the text is always filled / 解析后的导航栏链接，文本必定存在 */
export type NavbarLinkItem = AutoLinkOptions & { text: string }

export type NavbarItem = NavbarLinkItem | NavGroup<NavbarItem>

/** A resolved sidebar link, the text is always filled / 解析后的侧边栏链接，文本必定存在 */
export type SidebarLinkItem = SidebarLinkOptions & { text: string }

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
