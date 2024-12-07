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
   *
   * 项目文本
   */
  text?: string

  /**
   * The link of the item.
   *
   * 项目链接
   */
  link?: string

  /**
   * The children of the item.
   *
   * 子项目列表
   *
   */
  items?: (SidebarItem | string)[] | 'structure'

  /**
   * The children of the item.
   * @deprecated Use `items` instead
   *
   * 子项目列表
   * @deprecated 使用 `items` 代替
   */
  children?: (SidebarItem | string)[]

  /**
   * Whether the current group is collapsible
   * - If not specified, group is not collapsible.
   * - If `true`, group is collapsible and collapsed by default
   * - If `false`, group is collapsible but expanded by default
   *
   * 当前子项目列表是否可折叠
   * - 如果未指定，分组不可折叠
   * - 如果为 `true`，分组可折叠且默认折叠
   * - 如果为 `false`，分组可折叠且默认展开
   */
  collapsed?: boolean

  /**
   * prefix path for the children items.
   *
   * 子项目的路径前缀
   */
  prefix?: string

  /**
   * Customize text that appears on the footer of previous/next page.
   *
   * 自定义上一页/下一页页脚显示的文本。
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
