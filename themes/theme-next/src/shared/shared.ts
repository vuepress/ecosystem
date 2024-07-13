// image ---------------------------------------------------------------------

export type DefaultThemeImage =
  | string
  | { src: string; alt?: string; [prop: string]: any }
  | { light: string; dark: string; alt?: string; [prop: string]: any }

export type FeatureIcon =
  | string
  | {
      src: string
      alt?: string
      width?: string
      height?: string
      wrap?: boolean
    }
  | {
      light: string
      dark: string
      alt?: string
      width?: string
      height?: string
      wrap?: boolean
    }

// home ---------------------------------------------------------------------

export interface HeroAction {
  /**
   * Color theme of the button. Defaults to `brand`.
   *
   * 按钮的颜色主题，默认为 `brand`
   *
   * @default 'brand'
   */
  theme?: 'brand' | 'alt'
  /**
   * Label of the button.
   *
   * 按钮的标签
   */
  text: string
  /**
   * Destination link of the button.
   *
   * 按钮的目标链接
   */
  link: string
  /**
   * Link target attribute.
   *
   * 链接的 target 属性
   */
  target?: string
  /**
   * Link rel attribute.
   *
   * 链接的 rel 属性
   */
  rel?: string
}

export interface Feature {
  /**
   * Show icon on each feature box.
   *
   * 在每个 feature 框中显示图标
   */
  icon?: FeatureIcon
  /**
   * Title of the feature.
   *
   * feature 标题
   */
  title: string
  /**
   * Details of the feature.
   *
   * feature 的详情
   */
  details: string
  /**
   * Link when clicked on feature component. The link can be both internal or external.
   *
   * 点击 feature 组件时的链接，可以是内部链接，也可以是外部链接。
   */
  link?: string
  /**
   * Link text to be shown inside feature component. Best used with `link` option.
   *
   * e.g. `Learn more`, `Visit page`, etc.
   *
   * feature 组件内显示的链接文本，最好与 `link` 选项一起使用。
   *
   * 例如 `Learn more`, `Visit page` 等
   */
  linkText?: string
  /**
   * Link rel attribute for the `link` option.
   *
   * `link` 选项的链接 rel 属性
   */
  rel?: string
  /**
   * Link target attribute for the `link` option.
   *
   * `link` 选项的链接 target 属性
   */
  target?: string
}

// social link ---------------------------------------------------------------

export interface SocialLink {
  icon: SocialLinkIcon
  link: string
  ariaLabel?: string
}

export type SocialLinkIcon =
  | 'discord'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'mastodon'
  | 'npm'
  | 'slack'
  | 'twitter'
  | 'x'
  | 'youtube'
  | { svg: string }

// sponsor -------------------------------------------------------------------

export interface Sponsor {
  name: string
  img: string
  url: string
}

export interface Sponsors {
  tier?: string
  size?: 'xmini' | 'mini' | 'small' | 'medium' | 'big'
  items: Sponsor[]
}

// team ----------------------------------------------------------------------

export interface TeamMember {
  avatar: string
  name: string
  title?: string
  org?: string
  orgLink?: string
  desc?: string
  links?: SocialLink[]
  sponsor?: string
  actionText?: string
}
