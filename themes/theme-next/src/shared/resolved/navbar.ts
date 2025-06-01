export type ResolvedNavItem =
  | ResolvedNavItemWithChildren
  | ResolvedNavItemWithLink

export interface ResolvedNavItemWithLink {
  text: string
  link: string
  items?: never

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

export interface ResolvedNavItemChildren {
  text?: string
  items: ResolvedNavItemWithLink[]
}

export interface ResolvedNavItemWithChildren {
  text?: string
  items: (ResolvedNavItemChildren | ResolvedNavItemWithLink)[]

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
