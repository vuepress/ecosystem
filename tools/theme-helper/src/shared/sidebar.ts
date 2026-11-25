import type { PageData, PageFrontmatter } from 'vuepress/shared'

/**
 * Options of a directory group, read from the frontmatter of its `README.md`
 *
 * 目录分组的选项，从目录 `README.md` 的 frontmatter 中读取
 */
export interface SidebarDirOptions {
  /**
   * Text of the group, falls back to the title of the `README.md` page
   *
   * 分组的文本，省略时回退到 `README.md` 页面的标题
   */
  text?: string

  /**
   * Icon of the group, falls back to the icon of the `README.md` page
   *
   * 分组的图标，省略时回退到 `README.md` 页面的图标
   */
  icon?: string

  /**
   * Whether the group is collapsible
   *
   * 分组是否可以展开和收起
   *
   * @default true
   */
  collapsible?: boolean

  /**
   * Whether the group is expanded by default, only takes effect when the group
   * is collapsible
   *
   * 分组是否默认展开，仅在分组可以展开和收起时生效
   *
   * @default false
   */
  expanded?: boolean

  /**
   * Whether the `README.md` page is the link of the group instead of a child
   * item
   *
   * `README.md` 页面是否是分组的链接，而不是分组的子项
   *
   * @default false
   */
  link?: boolean

  /**
   * Whether the directory is included in the sidebar
   *
   * 目录是否包含在侧边栏中
   *
   * @default true
   */
  index?: boolean

  /**
   * Order of the group in its parent group
   *
   * Positive values are sorted in ascending order before the items without an
   * order, negative values are sorted in ascending order after them.
   *
   * 分组在其上层分组中的顺序
   *
   * 正数按升序排在未设置顺序的条目之前，负数按升序排在它们之后。
   */
  order?: number
}

/**
 * Page frontmatter fields read by the default sidebar info getters
 *
 * The helper does not require these fields: they are the conventions of the
 * built-in `getSidebarInfo()`, and a theme can read any other frontmatter in
 * its own getters.
 *
 * 默认侧边栏信息获取器读取的页面 frontmatter 字段
 *
 * Helper 并不要求这些字段：它们是内置 `getSidebarInfo()` 的约定，主题可以在自己的获取器中读取任何其它 frontmatter。
 */
export interface SidebarFrontmatter extends PageFrontmatter {
  /**
   * Date of the page, used by the `date` and `date-desc` sorters
   *
   * 页面的日期，用于 `date` 与 `date-desc` 排序器
   */
  date?: Date | string

  /**
   * Options of the directory group, only used in the `README.md` of a directory
   *
   * 目录分组的选项，仅在目录的 `README.md` 中使用
   */
  dir?: SidebarDirOptions

  /**
   * Icon of the item
   *
   * 条目的图标
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
   * Order of the page in its group, `null` when it is not set
   *
   * Positive values are sorted in ascending order before the items without an
   * order, negative values are sorted in ascending order after them.
   *
   * 页面在其分组中的顺序，未设置时为 `null`
   *
   * 正数按升序排在未设置顺序的条目之前，负数按升序排在它们之后。
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
 * Normalized information of a sidebar item generated from the file structure
 *
 * Every page and directory is resolved to the same fields, so that themes only
 * deal with the normalized data and never parse the frontmatter themselves.
 *
 * 根据文件结构生成的侧边栏条目的规范化信息
 *
 * 每个页面和目录都会解析到相同的字段，主题只需处理规范化后的数据，无需自行解析 frontmatter。
 */
export interface SidebarItemInfo {
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
   * Order of the item, `null` when the order is not set
   *
   * 条目的顺序，未设置时为 `null`
   */
  order: number | null

  /**
   * Date of the item, used by the `date` and `date-desc` sorters
   *
   * 条目的日期，用于 `date` 与 `date-desc` 排序器
   */
  date?: Date
}

/**
 * Normalized information of a page
 *
 * 页面的规范化信息
 */
export interface SidebarFileInfo extends SidebarItemInfo {
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
   * Data of the page
   *
   * 页面的数据
   */
  pageData: PageData | null
}

/**
 * Normalized information of a directory group
 *
 * 目录分组的规范化信息
 */
export interface SidebarDirInfo extends SidebarItemInfo {
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
   * Whether the group is collapsible
   *
   * 分组是否可以展开和收起
   */
  collapsible: boolean

  /**
   * Whether the group is expanded by default
   *
   * 分组是否默认展开
   */
  expanded: boolean

  /**
   * Children of the group
   *
   * 分组的子项
   */
  children: SidebarInfo[]

  /**
   * Data of the `README.md` page, `null` when the directory has no `README.md`
   *
   * `README.md` 页面的数据，目录没有 `README.md` 时为 `null`
   */
  pageData: PageData | null
}

/**
 * Normalized information of a sidebar item generated from the file structure
 *
 * 根据文件结构生成的侧边栏条目的规范化信息
 */
export type SidebarInfo = SidebarFileInfo | SidebarDirInfo

/**
 * Sidebar item generated from the file structure
 *
 * The helper always sets `text`. It also sets `link`, `icon`, `collapsible` and
 * `expanded` when they apply: `link` and `icon` when the page or directory has
 * them, and `collapsible` / `expanded` on a directory item. The theme can add
 * its own fields. The children of a group item are attached under the
 * `childrenKey` of the helper / theme.
 *
 * 根据文件结构生成的侧边栏条目
 *
 * Helper 总会设置 `text`。适用时它也会设置 `link`、`icon`、`collapsible` 与
 * `expanded`：页面或目录有链接与图标时设置 `link` 与 `icon`，目录条目还会设置 `collapsible` 与
 * `expanded`。主题可以添加自己的字段。分组条目的子项会挂载在 helper / 主题的 `childrenKey` 下。
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
   * 分组是否可以展开和收起
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

  /**
   * Other fields of the item, defined by the theme
   *
   * 条目的其它字段，由主题定义
   */
  [key: string]: unknown
}

/**
 * Sidebar items generated from the file structure, keyed by the route path
 * scope
 *
 * The shape of the items is defined by the theme, `SidebarStructureItem` is the
 * neutral default shape.
 *
 * 根据文件结构生成的侧边栏条目，以路由路径范围作为键
 *
 * 条目的形状由主题定义，`SidebarStructureItem` 是中立的默认形状。
 */
export type SidebarStructureData<
  Item extends { text: string } = SidebarStructureItem,
> = Record<string, Item[]>

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
