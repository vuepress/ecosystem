// sidebar -------------------------------------------------------------------

import type { PageFrontmatter } from 'vuepress/core'
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from './page.js'

export type Sidebar = (SidebarItem | string)[] | SidebarMulti | 'structure'

export type SidebarMulti = Record<
  string,
  | (SidebarItem | string)[]
  | 'structure'
  | { items: (SidebarItem | string)[] | 'structure'; prefix?: string }
>

export interface SidebarItem {
  /**
   * The text label of the item.
   */
  text?: string

  /**
   * The link of the item.
   */
  link?: string

  /**
   * The children of the item.
   */
  items?: (SidebarItem | string)[] | 'structure'

  /**
   * The children of the item.
   *
   * @deprecated Use `items` instead
   */
  children?: (SidebarItem | string)[]

  /**
   * If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default
   *
   * If `false`, group is collapsible but expanded by default
   */
  collapsed?: boolean

  /**
   * prefix path for the children items.
   */
  prefix?: string

  /**
   * Customize text that appears on the footer of previous/next page.
   */
  docFooterText?: string

  rel?: string
  target?: string
}

export interface SidebarFileInfo {
  type: 'file'
  filename: string

  title: string
  order: number | null
  path?: string | null

  frontmatter: PageFrontmatter<DefaultThemeNormalPageFrontmatter>
  pageData: DefaultThemePageData
}

export interface SidebarDirInfo {
  type: 'dir'
  dirname: string
  children: SidebarInfo[]

  title: string
  order: number | null

  groupInfo: {
    icon?: string
    collapsible?: boolean
    link?: string
  }

  frontmatter: PageFrontmatter<DefaultThemeNormalPageFrontmatter> | null
  pageData: DefaultThemePageData | null
}

export type SidebarInfo = SidebarDirInfo | SidebarFileInfo

export type SidebarSorterKeyword =
  | 'date-desc'
  | 'date'
  | 'filename'
  | 'order'
  | 'readme'
  | 'title'

export type SidebarSorterFunction = (
  infoA: SidebarInfo,
  infoB: SidebarInfo,
) => number

export type SidebarSorter =
  | SidebarSorterFunction
  | SidebarSorterFunction[]
  | SidebarSorterKeyword
  | SidebarSorterKeyword[]
