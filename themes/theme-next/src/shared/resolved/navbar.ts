export type ResolvedNavItem =
  | ResolvedNavItemWithChildren
  | ResolvedNavItemWithLink

export interface ResolvedNavItemWithLink {
  text: string
  link: string
  items?: never

  /**
   * `activeMatch` is expected to be a regex string. We can't use actual
   * RegExp object here because it isn't serializable
   *
   * `activeMatch` 应为正则表达式字符串。我们不能在此使用实际的
   * RegExp 对象，因为它不可序列化。
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
   * `activeMatch` is expected to be a regex string. We can't use actual
   * RegExp object here because it isn't serializable
   *
   * `activeMatch` 应为正则表达式字符串。我们不能在此使用实际的
   * RegExp 对象，因为它不可序列化。
   */
  activeMatch?: string
}
