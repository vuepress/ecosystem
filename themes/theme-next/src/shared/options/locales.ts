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
   * Custom site title in navbar. If the value is undefined,
   * `userConfig.title` will be used.
   *
   * 自定义导航栏中的站点标题。如果值为 `undefined`，将使用 `userConfig.title`
   */
  siteTitle?: string | false

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
        'initialValue' | 'onChanged' | 'storage' | 'storageKey' | 'storageRef'
      > & { initialValue?: 'dark' })

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
   * Whether to enable page internal aside in `doc` layout.
   * - Set to `false` to prevent rendering of aside container.
   * - Set to `true` to render the aside to the right.
   * - Set to `left` to render the aside to the left.
   *
   * 是否在 `doc` 布局中启用页内侧边栏
   * - 将此值设置为 `false` 可禁用 aside 容器。
   * - 将此值设置为 `true` 将在页面右侧渲染。
   * - 将此值设置为 `left` 将在页面左侧渲染。
   *
   * @default true
   */
  aside?: boolean | 'left'

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
   * The social links to be displayed at the end of the nav bar. Perfect for
   * placing links to social services such as GitHub, Twitter, Facebook, etc.
   *
   * 在导航栏中显示的社交链接， 适合放置与 GitHub， Twitter， Facebook 等社交服务相关的链接
   */
  socialLinks?: SocialLink[]

  /**
   * The footer configuration.
   *
   * 页脚
   */
  footer?: Footer

  /**
   * Customize text of 404 page.
   *
   * 定制404页面的文本。
   */
  notFound?: NotFoundOptions

  /**
   * Page meta - edit link config
   *
   * Whether to show "Edit this page" or not
   *
   * 页面元数据 - 编辑链接
   *
   * 是否显示 "编辑此页"
   *
   * @default true
   */
  editLink?: boolean

  /**
   * Page meta - edit link config
   *
   * The text to replace the default "Edit this page"
   *
   * 页面元数据 - 编辑链接
   *
   * 编辑此页的文本
   *
   * @default 'Edit this page'
   */
  editLinkText?: string

  /**
   * Page meta - edit link config
   *
   * Pattern of edit link
   *
   * 编辑链接的模式匹配
   *
   * `:repo` {@link docsRepo} | `:branch` {@link docsBranch} |  `:path` {@link docsDir}
   *
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string

  /**
   * Page meta - edit link config
   *
   * Set this config if your docs is placed in a different repo
   *
   * 页面元数据 - 编辑链接
   *
   * 如果你的文档位于不同的仓库， 设置此配置
   */
  docsRepo?: string

  /**
   * Page meta - edit link config
   *
   * Set this config if the branch of your docs is not 'main'
   *
   * 页面元数据 - 编辑链接
   *
   * 如果你的文档分支不是 'main'
   */
  docsBranch?: string

  /**
   * Page meta - edit link config
   *
   * Set this config if your docs is placed in sub dir of your `docsRepo`
   *
   * 页面元数据 - 编辑链接
   *
   * 如果你的文档位于 `docsRepo` 下的子目录
   */
  docsDir?: string

  /**
   * Page meta - last updated config
   *
   * Whether to show "Last Updated" or not
   *
   * 页面元数据 - 最后更新时间
   *
   * 是否显示 "最后更新时间"
   */
  lastUpdated?: boolean

  /**
   * Page meta - last updated config
   *
   * The text to replace the default "Last Updated"
   *
   * 页面元数据 - 最后更新时间
   *
   * 最后更新时间的文本
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
   *
   * 页面元数据 - 贡献者
   *
   * 是否显示 "贡献者数据"
   */
  contributors?: boolean

  /**
   * Page meta - contributors config
   *
   * The text to replace the default "Contributors"
   *
   * 页面元数据 - 贡献者
   *
   * 贡献者的文本
   */
  contributorsText?: string

  /**
   * Set custom prev/next labels.
   *
   * 自定义 prev/next
   */
  docFooter?: DocFooter

  /**
   * The sidebar menu label
   *
   * 侧边栏 菜单标签
   *
   * @default 'Menu'
   */
  sidebarMenuLabel?: string

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
   * Local Nav config
   *
   * Local Nav 配置
   *
   * @default 'Return to top'
   */
  returnToTopLabel?: string

  /**
   * Navbar language selection config
   *
   * Text of the language selection dropdown
   *
   * 导航栏语言选择配置
   *
   * 语言选择下拉菜单的文本
   *
   * @default 'Languages'
   */
  selectLanguageText?: string

  /**
   * Navbar language selection config
   *
   * Language name of current locale
   *
   * Displayed inside the language selection dropdown
   *
   * 导航栏语言选择配置
   *
   * 当前区域的语言名称
   *
   * 显示在语言选择下拉菜单中
   */
  selectLanguageName?: string

  /**
   * The carbon ads options. Leave it undefined to disable the ads feature.
   *
   * Carbon广告选项。将其保留为未定义以禁用广告功能。
   */
  carbonAds?: CarbonAdsOptions

  /**
   * Show external link icon in Markdown links.
   *
   * 在Markdown链接中显示外部链接图标。
   *
   * @default true
   */
  externalLinkIcon?: boolean

  /**
   * Configure the scroll offset when the theme has a sticky header.
   * Can be a number or a selector element to get the offset from.
   * Can also be an array of selectors in case some elements will be
   * invisible due to responsive layout. VuePress will fallback to the next
   * selector if a selector fails to match, or the matched element is not
   * currently visible in viewport.
   *
   * 配置主题具有粘性标题时的滚动偏移量。
   * 可以是一个数字或选择器元素以获取偏移量。
   * 也可以是选择器数组，以防某些元素由于响应式布局而不可见。
   * VuePress 将在选择器无法匹配或匹配的元素当前不可见于视口时，回退到下一个选择器。
   */
  scrollOffset?:
    | string[]
    | number
    | string
    | { selector: string[] | string; padding: number }
}

// prev-next -----------------------------------------------------------------

export interface DocFooter {
  /**
   * Custom label for previous page button. Can be set to `false` to disable.
   *
   * 设置上一页按钮的自定义标签。可以设置为 `false` 来禁用。
   *
   * @default 'Previous page'
   */
  prev?: boolean | string

  /**
   * Custom label for next page button. Can be set to `false` to disable.
   *
   * 设置下一页按钮的自定义标签。可以设置为 `false` 来禁用。
   *
   * @default 'Next page'
   */
  next?: boolean | string
}

// footer --------------------------------------------------------------------

export interface Footer {
  message?: string
  copyright?: string
}

// outline -------------------------------------------------------------------

export type Outline = number | 'deep' | [number, number]

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
   * 自定义 页面未找到 消息。
   *
   * @default 'PAGE NOT FOUND'
   */
  title?: string

  /**
   * Set custom not found description.
   *
   * 自定义 页面的未找到 描述。
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
