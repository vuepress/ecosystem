// resolved sidebar -------------------------------------------------------------------

export type ResolvedSidebar = ResolvedSidebarItem[] | ResolvedSidebarMulti

export type ResolvedSidebarMulti = Record<
  string,
  ResolvedSidebarItem[] | { items: ResolvedSidebarItem[] }
>

export interface ResolvedSidebarItem {
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
  items?: ResolvedSidebarItem[]

  /**
   * If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default
   *
   * If `false`, group is collapsible but expanded by default
   *
   * 若未指定，分组不可折叠。
   *
   * 若为 `true`，分组可折叠且默认折叠
   *
   * 若为 `false`，分组可折叠但默认展开
   */
  collapsed?: boolean

  /**
   * Customize text that appears on the footer of previous/next page.
   *
   * 自定义上一页/下一页页脚显示的文本。
   */
  docFooterText?: string

  rel?: string
  target?: string
}
