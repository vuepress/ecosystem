import type { PageData, PageFrontmatter } from 'vuepress/shared'

/**
 * Options of a sidebar group generated from a directory
 *
 * 由目录生成的侧边栏分组的选项
 */
export interface SidebarDirOptions {
  /**
   * Text of the group
   *
   * 分组的文本
   */
  text?: string

  /**
   * Icon of the group
   *
   * 分组的图标
   */
  icon?: string

  /**
   * Whether the group is collapsible
   *
   * 分组是否可折叠
   *
   * @default true
   */
  collapsible?: boolean

  /**
   * Whether the group is expanded by default
   *
   * 分组是否默认展开
   *
   * @default false
   */
  expanded?: boolean

  /**
   * Whether the group links to its `README.md`
   *
   * 分组是否链接到其 `README.md`
   *
   * @default false
   */
  link?: boolean

  /**
   * Whether the group is included in the sidebar
   *
   * 分组是否包含在侧边栏中
   *
   * @default true
   */
  index?: boolean

  /**
   * Order of the group in its parent group
   *
   * Positive values are sorted before the items without order, negative values
   * are sorted after them.
   *
   * 分组在其父分组中的顺序
   *
   * 正值会排在未设置顺序的条目之前，负值会排在它们之后。
   *
   * @default 0
   */
  order?: number
}

/**
 * Frontmatter fields that are used by the structure sidebar
 *
 * 侧边栏结构功能使用的 frontmatter 字段
 */
export type SidebarFrontmatter = PageFrontmatter & {
  /**
   * Date of the page, used by the `date` and `date-desc` sorters
   *
   * 页面日期，供 `date` 与 `date-desc` 排序器使用
   */
  date?: Date | string

  /**
   * Options of the directory group, only used in the `README.md` of a directory
   *
   * 目录分组的选项，仅在目录的 `README.md` 中使用
   */
  dir?: SidebarDirOptions

  /**
   * Icon of the page
   *
   * 页面图标
   */
  icon?: string

  /**
   * Whether the page is included in the sidebar
   *
   * 页面是否包含在侧边栏中
   *
   * @default true
   */
  index?: boolean

  /**
   * Order of the page in its group
   *
   * Positive values are sorted before the items without order, negative values
   * are sorted after them.
   *
   * 页面在其分组中的顺序
   *
   * 正值会排在未设置顺序的条目之前，负值会排在它们之后。
   *
   * @default 0
   */
  order?: number

  /**
   * Short title of the page used in the sidebar
   *
   * 侧边栏中页面使用的短标题
   */
  shortTitle?: string
}

/**
 * Information of a page file
 *
 * 页面文件的信息
 */
export interface SidebarFileInfo {
  /**
   * Type of the item
   *
   * 条目类型
   */
  type: 'file'

  /**
   * Name of the file
   *
   * 文件名
   */
  filename: string

  /**
   * Title of the item
   *
   * 条目标题
   */
  title: string

  /**
   * Order of the item, `null` when the order is not set
   *
   * 条目的顺序，未设置时为 `null`
   */
  order: number | null

  /**
   * Route path of the page
   *
   * 页面的路由路径
   */
  path: string

  /**
   * Frontmatter of the page
   *
   * 页面的 frontmatter
   */
  frontmatter: SidebarFrontmatter

  /**
   * Data of the page
   *
   * 页面的数据
   */
  pageData: PageData | null
}

/**
 * Group information of a directory item
 *
 * 目录条目的分组信息
 */
export interface SidebarGroupInfo {
  /**
   * Whether the group is collapsible
   *
   * 分组是否可折叠
   */
  collapsible?: boolean

  /**
   * Whether the group is expanded by default
   *
   * 分组是否默认展开
   */
  expanded?: boolean

  /**
   * Icon of the group
   *
   * 分组图标
   */
  icon?: string

  /**
   * Link of the group
   *
   * 分组链接
   */
  link?: string
}

/**
 * Information of a directory
 *
 * 目录的信息
 */
export interface SidebarDirInfo {
  /**
   * Type of the item
   *
   * 条目类型
   */
  type: 'dir'

  /**
   * Name of the directory
   *
   * 目录名
   */
  dirname: string

  /**
   * Title of the item
   *
   * 条目标题
   */
  title: string

  /**
   * Order of the item, `null` when the order is not set
   *
   * 条目的顺序，未设置时为 `null`
   */
  order: number | null

  /**
   * Group information of the directory
   *
   * 目录的分组信息
   */
  groupInfo: SidebarGroupInfo

  /**
   * Children of the directory
   *
   * 目录的子项
   */
  children: SidebarInfo[]

  /**
   * Frontmatter of the `README.md` page, `null` when the directory has no
   * `README.md`
   *
   * `README.md` 页面的 frontmatter，目录没有 `README.md` 时为 `null`
   */
  frontmatter: SidebarFrontmatter | null

  /**
   * Data of the `README.md` page, `null` when the directory has no `README.md`
   *
   * `README.md` 页面的数据，目录没有 `README.md` 时为 `null`
   */
  pageData: PageData | null
}

/**
 * Information of a sidebar item generated from the file structure
 *
 * 根据文件结构生成的侧边栏条目的信息
 */
export type SidebarInfo = SidebarFileInfo | SidebarDirInfo

/**
 * Sidebar item generated from the file structure
 *
 * 根据文件结构生成的侧边栏条目
 */
export interface SidebarStructureItem {
  /**
   * Text of the item
   *
   * 条目的文本
   */
  text: string

  /**
   * Route path of the item
   *
   * 条目的路由路径
   */
  link?: string

  /**
   * Icon of the item
   *
   * 条目的图标
   */
  icon?: string

  /**
   * Whether the group is collapsible
   *
   * 分组是否可折叠
   */
  collapsible?: boolean

  /**
   * Whether the group is expanded by default
   *
   * 分组是否默认展开
   */
  expanded?: boolean

  /**
   * Children of the item
   *
   * 条目的子项
   */
  children?: SidebarStructureItem[]
}

/**
 * Sidebar items generated from the file structure, keyed by the route path
 * scope
 *
 * 根据文件结构生成的侧边栏条目，以路由路径范围作为键
 */
export type SidebarStructureData = Record<string, SidebarStructureItem[]>

/**
 * Keyword of a built-in sorter
 *
 * 内置排序器的关键词
 */
export type SidebarSorterKeyword =
  | 'readme'
  | 'order'
  | 'date'
  | 'date-desc'
  | 'filename'
  | 'title'

/**
 * Sorter function of the sidebar items
 *
 * 侧边栏条目的排序函数
 */
export type SidebarSorterFunction = (
  infoA: SidebarInfo,
  infoB: SidebarInfo,
) => number

/**
 * Sorter of the sidebar items
 *
 * 侧边栏条目的排序器
 */
export type SidebarSorter =
  | SidebarSorterFunction
  | SidebarSorterKeyword
  | (SidebarSorterKeyword | SidebarSorterFunction)[]
