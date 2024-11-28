export type NavItem = NavItemWithChildren | NavItemWithLink | string

export interface NavItemWithLink {
  text: string
  link: string

  prefix?: never

  items?: never

  /**
   * @deprecated Use `items` instead
   *
   * @deprecated 使用 `items` 替换
   *  */
  children?: never

  /**
   * A Regexp string, matching path will be active
   *
   * It's expected to be a regex string as RegExp object isn't serializable
   *
   * 正则表达式字符串，匹配的路径将被激活
   *
   * 由于 RegExp 对象不可序列化，因此我们需要将其定义为字符串。
   */
  activeMatch?: string

  rel?: string
  target?: string
  noIcon?: boolean
}

export interface NavItemChildren {
  /**
   * The text of the dropdown menu
   */
  text?: string

  /**
   * Link prefix of current group
   *
   * 当前分组的页面前缀
   */
  prefix?: string

  /**
   * The items in the dropdown menu
   *
   * 导航栏下拉菜单
   */
  items: (NavItemWithLink | string)[]

  /**
   * @deprecated Use `items` instead
   *
   * @deprecated 使用 `items` 替换
   *  */
  children?: (NavItemWithLink | string)[]
}

export interface NavItemWithChildren {
  text?: string
  /**
   * Link prefix of current group
   *
   * 当前分组的页面前缀
   */
  prefix?: string

  /**
   * The items in the dropdown menu
   *
   * 导航栏下拉菜单
   */
  items: (NavItemChildren | NavItemWithLink | string)[]

  /**
   * @deprecated Use `items` instead
   *
   * @deprecated 使用 `items` 替换
   *  */
  children?: (NavItemChildren | NavItemWithLink | string)[]

  /**
   * A Regexp string, matching path will be active
   *
   * It's expected to be a regex string as RegExp object isn't serializable
   *
   * 正则表达式字符串，匹配的路径将被激活
   *
   * 由于 RegExp 对象不可序列化，因此我们需要将其定义为字符串。
   */
  activeMatch?: string
}
