export type NavItem = NavItemWithChildren | NavItemWithLink | string

export interface NavItemWithLink {
  text: string
  link: string

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

  /**
   * Whether to display external link icon.
   * If the navigation link is an external link, the external link icon will be displayed by default. Setting it to `true` will disable the external link icon.
   *
   * 是否显示外部链接图标，如果导航链接是外部链接，默认将显示外部链接图标，设置为 `true` 可以关闭外部链接图标
   */
  noIcon?: boolean

  prefix?: never
  items?: never
  /**
   * @deprecated Use `items` instead
   *
   * @deprecated 使用 `items` 替换
   *  */
  children?: never
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
   * A Regexp string, matching path will be active
   *
   * It's expected to be a regex string as RegExp object isn't serializable
   *
   * 正则表达式字符串，匹配的路径将被激活
   *
   * 由于 RegExp 对象不可序列化，因此我们需要将其定义为字符串。
   */
  activeMatch?: string

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
}
