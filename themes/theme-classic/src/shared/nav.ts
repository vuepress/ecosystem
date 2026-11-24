/** Base nav item, displayed as an icon and a text */
export interface NavItemOptions {
  /**
   * The icon of the item
   *
   * It can be omitted for a link item: the theme falls back to the `icon`
   * frontmatter field of the linked page.
   *
   * 条目图标
   *
   * 链接条目可以省略：主题会回退到目标页面的 `icon` frontmatter 字段。
   */
  icon?: string

  /**
   * The text of the item
   *
   * It can be omitted for a link item: the theme falls back to the title of the
   * linked page, and then to the link itself.
   *
   * 条目文本
   *
   * 链接条目可以省略：主题会回退到目标页面的标题，再回退到链接本身。
   */
  text?: string

  /** The aria label of the item / 条目的无障碍标签 */
  ariaLabel?: string
}

/** Options for `<AutoLink>` */
export interface AutoLinkOptions extends NavItemOptions {
  /** Link of item */
  link: string

  /** Rel of `<a>` tag */
  rel?: string

  /** Target of `<a>` tag */
  target?: string

  /** Regexp mode to be active */
  activeMatch?: string

  /** Whether it's active only when exact match */
  exact?: boolean
}
