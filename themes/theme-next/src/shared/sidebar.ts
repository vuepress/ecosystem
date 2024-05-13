// sidebar -------------------------------------------------------------------

import type { PageFrontmatter } from 'vuepress/core'
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from './page.js'

export type Sidebar = 'structure' | (string | SidebarItem)[] | SidebarMulti

export type SidebarMulti = Record<
  string,
  | 'structure'
  | (string | SidebarItem)[]
  | { items: 'structure' | (string | SidebarItem)[]; base: string }
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
  items?: 'structure' | (string | SidebarItem)[]

  /**
   * If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default
   *
   * If `false`, group is collapsible but expanded by default
   */
  collapsed?: boolean

  /**
   * Base path for the children items.
   */
  base?: string

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

export type SidebarInfo = SidebarFileInfo | SidebarDirInfo

export type SidebarSorterKeyword =
  | 'readme'
  | 'order'
  | 'date'
  | 'date-desc'
  | 'filename'
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
