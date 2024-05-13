import type { ThemeData } from '@vuepress/plugin-theme-data'
import type { UseDarkOptions } from '@vueuse/core'
import type { LocaleData } from 'vuepress/shared'
import type { NavItem } from '../navbar.js'
import type { DefaultThemeImage, SocialLink } from '../shared.js'
import type { Sidebar } from '../sidebar.js'

export type DefaultThemeLocaleOptions = DefaultThemeData

export type DefaultThemeData = ThemeData<DefaultThemeLocaleData>

export interface DefaultThemeLocaleData extends LocaleData {
  /**
   * The logo file of the site.
   *
   * 站点 Logo
   *
   * @example '/logo.svg'
   */
  logo?: DefaultThemeImage

  /**
   * Overrides the link of the site logo.
   *
   * 覆盖站点 Logo 的链接
   */
  logoLink?: string | { link?: string; rel?: string; target?: string }

  /**
   * Custom site title in navbar. If the value is undefined,
   * `userConfig.title` will be used.
   *
   * 自定义导航栏中的站点标题。如果值为 `undefined`，将使用 `userConfig.title`
   */
  siteTitle?: string | false

  /**
   * Custom header levels of outline in the aside component.
   *
   * 自定义侧边栏中的标题层级
   *
   * @default [2,3]
   */
  outline?: Outline | false

  /**
   * The title of the outline
   *
   * 侧边栏 标题
   *
   * @default 'On this page'
   */
  outlineTitle?: string

  /**
   * The navbar items.
   *
   * 导航栏
   */
  navbar?: NavItem[]

  /**
   * The sidebar items.
   *
   * 侧边栏
   */
  sidebar?: Sidebar

  /**
   * The sidebar menu label
   *
   * 侧边栏 菜单标签
   * @default 'Menu'
   */
  sidebarMenuLabel?: string

  /**
   * Set to `false` to prevent rendering of aside container.
   *
   * Set to `true` to render the aside to the right.
   *
   * Set to `left` to render the aside to the left.
   *
   * 将此值设置为 `false` 可禁用 aside 容器。
   *
   * 将此值设置为 `true` 将在页面右侧渲染。
   *
   * 将此值设置为 `left` 将在页面左侧渲染。
   *
   * @default true
   */
  aside?: boolean | 'left'

  /**
   * Appearance color mode
   *
   * 是否开启 浅色/深色模式
   *
   * @default true
   */
  appearance?:
    | boolean
    | 'dark'
    | 'force-dark'
    | (Omit<
        UseDarkOptions,
        'initialValue' | 'onChanged' | 'storageRef' | 'storageKey' | 'storage'
      > & { initialValue?: 'dark' })

  /**
   * Can be used to customize the dark mode switch label.
   * This label is only displayed in the mobile view.
   *
   * 用于自定义深色模式开关标签，该标签仅在移动端视图中显示。
   *
   * @default 'Appearance'
   */
  darkModeSwitchLabel?: string

  /**
   * @default 'Switch to light theme'
   */
  lightModeSwitchTitle?: string

  /**
   * @default 'Switch to dark theme'
   */
  darkModeSwitchTitle?: string

  /**
   * Page meta - edit link config
   *
   * Whether to show "Edit this page" or not
   */
  editLink?: boolean

  /**
   * Page meta - edit link config
   *
   * The text to replace the default "Edit this page"
   */
  editLinkText?: string

  /**
   * Page meta - edit link config
   *
   * Pattern of edit link
   *
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string

  /**
   * Page meta - edit link config
   *
   * Use `repo` config by default
   *
   * Set this config if your docs is placed in a different repo
   */
  docsRepo?: string

  /**
   * Page meta - edit link config
   *
   * Set this config if the branch of your docs is not 'main'
   */
  docsBranch?: string

  /**
   * Page meta - edit link config
   *
   * Set this config if your docs is placed in sub dir of your `docsRepo`
   */
  docsDir?: string

  /**
   * Page meta - last updated config
   *
   * Whether to show "Last Updated" or not
   */
  lastUpdated?: boolean

  /**
   * Page meta - last updated config
   *
   * The text to replace the default "Last Updated"
   */
  lastUpdatedText?: string

  /**
   * Set options for last updated time formatting.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
   *
   * @default
   * { dateStyle: 'short', timeStyle: 'short' }
   */
  lastUpdatedFormatOptions?: Intl.DateTimeFormatOptions & {
    forceLocale?: boolean
  }

  /**
   * Page meta - contributors config
   *
   * Whether to show "Contributors" or not
   */
  contributors?: boolean

  /**
   * Page meta - contributors config
   *
   * The text to replace the default "Contributors"
   */
  contributorsText?: string

  /**
   * Set custom prev/next labels.
   */
  docFooter?: DocFooter

  /**
   * The social links to be displayed at the end of the nav bar. Perfect for
   * placing links to social services such as GitHub, Twitter, Facebook, etc.
   */
  socialLinks?: SocialLink[]

  /**
   * The footer configuration.
   */
  footer?: Footer

  /**
   * The container configuration.
   */
  container?: ContainerOptions

  /**
   * @default 'Return to top'
   */
  returnToTopLabel?: string

  /**
   * Navbar language selection config
   *
   * Text of the language selection dropdown
   */
  selectLanguageText?: string

  /**
   * Navbar language selection config
   *
   * Language name of current locale
   *
   * Displayed inside the language selection dropdown
   */
  selectLanguageName?: string

  /**
   * The carbon ads options. Leave it undefined to disable the ads feature.
   */
  carbonAds?: CarbonAdsOptions

  /**
   * Show external link icon in Markdown links.
   *
   * @default false
   */
  externalLinkIcon?: boolean

  /**
   * Customize text of 404 page.
   */
  notFound?: NotFoundOptions

  /**
   * Configure the scroll offset when the theme has a sticky header.
   * Can be a number or a selector element to get the offset from.
   * Can also be an array of selectors in case some elements will be
   * invisible due to responsive layout. VitePress will fallback to the next
   * selector if a selector fails to match, or the matched element is not
   * currently visible in viewport.
   */
  scrollOffset?:
    | number
    | string
    | string[]
    | { selector: string | string[]; padding: number }
}

// prev-next -----------------------------------------------------------------

export interface DocFooter {
  /**
   * Custom label for previous page button. Can be set to `false` to disable.
   *
   * @default 'Previous page'
   */
  prev?: string | boolean

  /**
   * Custom label for next page button. Can be set to `false` to disable.
   *
   * @default 'Next page'
   */
  next?: string | boolean
}

// footer --------------------------------------------------------------------

export interface Footer {
  message?: string
  copyright?: string
}

// outline -------------------------------------------------------------------

export type Outline = number | [number, number] | 'deep'

// carbon ads ----------------------------------------------------------------

export interface CarbonAdsOptions {
  code: string
  placement: string
}

// not found -----------------------------------------------------------------

export interface NotFoundOptions {
  /**
   * Set custom not found message.
   *
   * @default 'PAGE NOT FOUND'
   */
  title?: string

  /**
   * Set custom not found description.
   *
   * @default "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
   */
  quote?: string

  /**
   * Set aria label for home link.
   *
   * @default 'go to home'
   */
  linkLabel?: string

  /**
   * Set custom home link text.
   *
   * @default 'Take me home'
   */
  linkText?: string

  /**
   * @default '404'
   */
  code?: string
}

/**
 * Container options
 */
export interface ContainerOptions {
  infoLabel?: string
  noteLabel?: string
  tipLabel?: string
  warningLabel?: string
  dangerLabel?: string
  detailsLabel?: string
  importantLabel?: string
  cautionLabel?: string
}
