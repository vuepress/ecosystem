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
   */
  collapsed?: boolean

  /**
   * Customize text that appears on the footer of previous/next page.
   */
  docFooterText?: string

  rel?: string
  target?: string
}
