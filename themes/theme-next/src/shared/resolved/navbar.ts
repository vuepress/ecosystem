export type ResolvedNavItem =
  | ResolvedNavItemWithLink
  | ResolvedNavItemWithChildren

export interface ResolvedNavItemWithLink {
  text: string
  link: string
  items?: never

  /**
   * `activeMatch` is expected to be a regex string. We can't use actual
   * RegExp object here because it isn't serializable
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
   */
  activeMatch?: string
}
