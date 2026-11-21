/* oxlint-disable typescript/no-explicit-any, typescript/no-namespace -- Ported from VitePress types, kept as-is for API parity */
import type { UseDarkOptions } from '@vueuse/core'
import type { Ref } from 'vue'

/**
 * A head entry as `[tag, attrs]` or `[tag, attrs, innerHTML]`
 *
 * 头部条目，格式为 `[tag, attrs]` 或 `[tag, attrs, innerHTML]`
 */
export type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]

/**
 * The section headers extracted from a page
 *
 * 从页面中提取的标题
 */
export interface Header {
  /** The level of the header, `1` to `6` / 标题级别，`1` 到 `6` */
  level: number

  /** The title of the header / 标题文本 */
  title: string

  /** The slug of the header / 标题的锚点 */
  slug: string

  /** The link of the header / 标题的链接 */
  link: string

  /** The children of the header / 子标题 */
  children?: Header[]
}

/**
 * The data of a page, including the extra fields added by the theme
 *
 * This is the native VuePress page data shape (returned by `usePageData()`)
 * plus the fields injected by the theme. It is the payload passed to the
 * VitePress-style callbacks of the theme options (for example `nav[].link` and
 * `editLink.pattern`).
 *
 * 页面数据，包含主题添加的额外字段
 *
 * 这是 VuePress 原生页面数据形状（`usePageData()` 的返回值）加上主题注入的字段。 主题配置里 VitePress 风格的回调（例如
 * `nav[].link`、`editLink.pattern`）会收到它作为参数。
 */
export interface ThemePageData {
  /** Path of the page / 页面路径 */
  path: string

  /** Title of the page / 页面标题 */
  title: string

  /** Language of the page / 页面语言 */
  lang: string

  /** Frontmatter of the page / 页面 frontmatter */
  frontmatter: Record<string, any>

  /** Path of the page relative to the source directory / 页面相对于源目录的路径 */
  filePathRelative?: string

  /** Git information of the page / 页面的 Git 信息 */
  git?: {
    /** Creation time / 创建时间 */
    createdTime?: number
    /** Last update time / 最后更新时间 */
    updatedTime?: number
  }

  /** Any other page data field / 其他页面数据字段 */
  [key: string]: unknown
}

/**
 * Appearance option of the theme
 *
 * 主题外观选项
 */
export type AppearanceOptions =
  | boolean
  | 'dark'
  | 'force-dark'
  | 'force-auto'
  | (UseDarkOptions & { initialValue?: 'dark' })

/**
 * The site-level data for the active locale
 *
 * 当前语言下的站点数据
 */
export interface SiteData {
  /** Base URL the site is deployed at / 站点部署的基础 URL */
  base: string

  /**
   * Whether pages are generated without the trailing `.html` / 是否生成无 `.html`
   * 后缀的页面链接
   */
  cleanUrls?: boolean

  /** Language of the site / 站点语言 */
  lang: string

  /** Text direction of the site / 站点文本方向 */
  dir: 'ltr' | 'rtl' | 'auto'

  /** Title of the site / 站点标题 */
  title: string

  /** Title suffix or template / 标题后缀或模板 */
  titleTemplate?: string | boolean

  /** Description of the site / 站点描述 */
  description: string

  /** Head entries of the site / 站点头部条目 */
  head: HeadConfig[]

  /** Appearance option / 外观选项 */
  appearance?: AppearanceOptions

  /** Theme config of the active locale / 当前语言的站点主题配置 */
  themeConfig: any

  /** Locales of the site / 站点多语言配置 */
  locales: Record<string, any>

  /** Key of the active locale / 当前语言的键 */
  localeIndex?: string
}

/**
 * The locale configs of the site, keyed by locale directory (`'root'` for the
 * default locale)
 *
 * 站点多语言配置，以语言目录为键（默认语言为 `'root'`）
 */
export type LocaleConfig<ThemeConfig = any> = Record<
  string,
  {
    /** The label of the locale in the locale menu / 语言菜单中该语言的标签 */
    label?: string

    /** The link of the locale menu item / 语言菜单中该语言的链接 */
    link?: string

    /** The `lang` attribute of the locale / 该语言的 `lang` 属性 */
    lang?: string

    /** The text direction of the locale / 该语言的文本方向 */
    dir?: 'ltr' | 'rtl' | 'auto'
  } & Partial<ThemeConfig>
>

export namespace DefaultTheme {
  /**
   * The layout state returned by `useLayout`
   *
   * `useLayout` 返回的布局状态
   */
  export interface Layout {
    /** Whether the current page is the home page / 当前页面是否为主页 */
    isHome: Ref<boolean>

    /** The sidebar items of the current page / 当前页面的侧边栏条目 */
    sidebar: Readonly<Ref<SidebarItem[]>>

    /** The sidebar groups of the current page / 当前页面的侧边栏分组 */
    sidebarGroups: Ref<SidebarItem[]>

    /** Whether the current page has a sidebar / 当前页面是否有侧边栏 */
    hasSidebar: Ref<boolean>

    /** Whether the sidebar is enabled / 侧边栏是否启用 */
    isSidebarEnabled: Ref<boolean>

    /** Whether the current page has an aside / 当前页面是否有侧边栏区域 */
    hasAside: Ref<boolean>

    /** Whether the aside is on the left / 侧边栏区域是否在左侧 */
    leftAside: Ref<boolean>

    /** The outline headers of the current page / 当前页面的大纲标题 */
    headers: Readonly<Ref<OutlineItem[]>>

    /** Whether the current page has a local nav / 当前页面是否有本地导航 */
    hasLocalNav: Ref<boolean>
  }

  /**
   * Theme config
   *
   * 主题配置
   */
  export interface Config {
    /** The logo file of the site / 站点 Logo 文件 */
    logo?: ThemeableImage

    /** Overrides the link of the site logo / 覆盖站点 Logo 的链接 */
    logoLink?: string | { link?: string; rel?: string; target?: string }

    /** Custom site title in navbar / 导航栏中的自定义站点标题 */
    siteTitle?: string | false

    /** Custom header levels of outline in the aside component / 侧边栏大纲的自定义标题级别 */
    outline?: Outline | Outline['level'] | false

    /** The nav items / 导航条目 */
    nav?: NavItem[]

    /** The sidebar items / 侧边栏条目 */
    sidebar?: Sidebar

    /**
     * Set to `false` to prevent rendering of aside container / 设为 `false`
     * 以阻止渲染侧边栏区域
     */
    aside?: boolean | 'left'

    /** Info for the edit link / 编辑链接信息 */
    editLink?: EditLink

    /** Whether to show the last updated time / 是否显示最后更新时间 */
    lastUpdated?: LastUpdatedOptions

    /** Set custom prev/next labels / 自定义上一页/下一页标签 */
    docFooter?: DocFooter

    /** The social links / 社交链接 */
    socialLinks?: SocialLink[]

    /** The footer configuration / 页脚配置 */
    footer?: Footer

    /** Accessible label of the dark mode switch / 暗色模式切换的无障碍标签 */
    darkModeSwitchLabel?: string

    /** Accessible title of the light mode switch / 浅色模式切换的标题 */
    lightModeSwitchTitle?: string

    /** Accessible title of the dark mode switch / 暗色模式切换的标题 */
    darkModeSwitchTitle?: string

    /** Accessible label of the mobile sidebar menu / 移动端侧边栏菜单的无障碍标签 */
    sidebarMenuLabel?: string

    /** Label of the return to top button / 返回顶部按钮的标签 */
    returnToTopLabel?: string

    /** Accessible label of the language menu button / 语言菜单按钮的无障碍标签 */
    langMenuLabel?: string

    /** Accessible label of the main navigation landmarks / 主导航区域的无障碍标签 */
    navMenuLabel?: string

    /**
     * Set custom `aria-label` for the mobile menu button / 移动端菜单按钮的自定义
     * `aria-label`
     */
    mobileMenuLabel?: string

    /**
     * Set custom `aria-label` for the overflow menu button / 溢出菜单按钮的自定义
     * `aria-label`
     */
    extraMenuLabel?: string

    /** Label of the skip to content link / 跳到正文链接的标签 */
    skipToContentLabel?: string

    /**
     * Changing locale when current url is `/foo` redirects to `/locale/foo` /
     * 切换语言时是否跳转到对应的页面
     */
    i18nRouting?: boolean

    /** Show external link icon in Markdown links / 是否在 Markdown 链接中显示外部链接图标 */
    externalLinkIcon?: boolean

    /** Color custom containers on a graded severity scale / 是否按严重程度为自定义容器着色 */
    gradedContainers?: boolean

    /** Customize text of 404 page / 自定义 404 页面的文本 */
    notFound?: NotFoundOptions

    /** Locale configs / 多语言配置 */
    locales?: LocaleConfig<Config>

    /** Appearance option / 外观选项 */
    appearance?: AppearanceOptions

    /** Text direction of the site / 站点的文本方向 */
    dir?: 'ltr' | 'rtl' | 'auto'
  }

  // nav -----------------------------------------------------------------------

  /** A nav item / 导航条目 */
  export type NavItem = NavItemComponent | NavItemWithLink | NavItemWithChildren

  /** A nav item rendered by a component / 由组件渲染的导航条目 */
  export interface NavItemComponent {
    /** The component name / 组件名称 */
    component: string

    /** The component props / 组件属性 */
    props?: Record<string, any>
  }

  /** A nav item with a link / 带链接的导航条目 */
  export interface NavItemWithLink {
    /** The text of the item / 条目文本 */
    text: string

    /** The link of the item / 条目链接 */
    link: string | ((payload: ThemePageData) => string)

    /** The children of the item / 条目子项 */
    items?: never

    /** The active match pattern, as a regex string / 激活匹配模式，正则字符串 */
    activeMatch?: string

    /** The `rel` attribute / `rel` 属性 */
    rel?: string

    /** The `target` attribute / `target` 属性 */
    target?: string

    /** Whether to hide the external link icon / 是否隐藏外部链接图标 */
    noIcon?: boolean
  }

  /** A group of nav items / 导航条目分组 */
  export interface NavItemChildren {
    /** The text of the group / 分组文本 */
    text?: string

    /** The items of the group / 分组条目 */
    items: NavItemWithLink[]
  }

  /** A nav item with children / 带子项的导航条目 */
  export interface NavItemWithChildren {
    /** The text of the item / 条目文本 */
    text?: string

    /** The items of the item / 条目子项 */
    items: (NavItemComponent | NavItemChildren | NavItemWithLink)[]

    /** The active match pattern, as a regex string / 激活匹配模式，正则字符串 */
    activeMatch?: string
  }

  // image ---------------------------------------------------------------------

  /** An image that can be themed / 可随主题变化的图片 */
  export type ThemeableImage =
    | string
    | { src: string; alt?: string; [prop: string]: any }
    | { light: string; dark: string; alt?: string; [prop: string]: any }

  /** An icon used by a feature / 特性图标 */
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

  // sidebar -------------------------------------------------------------------

  /** The sidebar config / 侧边栏配置 */
  export type Sidebar = SidebarItem[] | SidebarMulti

  /** The sidebar config of each path / 各路径的侧边栏配置 */
  export type SidebarMulti = Record<
    string,
    SidebarItem[] | { items: SidebarItem[]; base: string }
  >

  /** A sidebar item / 侧边栏条目 */
  export interface SidebarItem {
    /** The text label of the item / 条目文本 */
    text?: string

    /** The link of the item / 条目链接 */
    link?: string

    /** The children of the item / 条目子项 */
    items?: SidebarItem[]

    /** Whether the group is collapsible / 分组是否可折叠 */
    collapsed?: boolean

    /** Base path for the children items / 子项的基础路径 */
    base?: string

    /**
     * Customize text that appears on the footer of previous/next page /
     * 自定义上一页/下一页文本
     */
    docFooterText?: string

    /** The `rel` attribute / `rel` 属性 */
    rel?: string

    /** The `target` attribute / `target` 属性 */
    target?: string
  }

  // edit link -----------------------------------------------------------------

  /** The edit link config / 编辑链接配置 */
  export interface EditLink {
    /** Pattern for edit link / 编辑链接的模式 */
    pattern: string | ((payload: ThemePageData) => string)

    /** Custom text for edit link / 编辑链接的自定义文本 */
    text?: string
  }

  // prev-next -----------------------------------------------------------------

  /** The previous/next page labels / 上一页/下一页标签 */
  export interface DocFooter {
    /** Custom label for previous page button / 上一页按钮的自定义标签 */
    prev?: string | boolean

    /** Custom label for next page button / 下一页按钮的自定义标签 */
    next?: string | boolean
  }

  // social link ---------------------------------------------------------------

  /** A social link / 社交链接 */
  export interface SocialLink {
    /** The icon of the link / 链接图标 */
    icon: SocialLinkIcon

    /** The link of the link / 链接地址 */
    link: string

    /** The `aria-label` attribute / `aria-label` 属性 */
    ariaLabel?: string

    /** The `target` attribute / `target` 属性 */
    target?: string
  }

  /** The icon of a social link / 社交链接的图标 */
  export type SocialLinkIcon = string | { svg: string }

  // footer --------------------------------------------------------------------

  /** The footer config / 页脚配置 */
  export interface Footer {
    /** The message of the footer / 页脚消息 */
    message?: string

    /** The copyright of the footer / 页脚版权信息 */
    copyright?: string
  }

  // team ----------------------------------------------------------------------

  /** A team member / 团队成员 */
  export interface TeamMember {
    /** The avatar of the member / 成员头像 */
    avatar: string

    /** The name of the member / 成员姓名 */
    name: string

    /** The title of the member / 成员头衔 */
    title?: string

    /** The organization of the member / 成员组织 */
    org?: string

    /** The link of the organization / 组织链接 */
    orgLink?: string

    /** The description of the member / 成员描述 */
    desc?: string

    /** The links of the member / 成员链接 */
    links?: SocialLink[]

    /** The sponsor link of the member / 成员的赞助链接 */
    sponsor?: string

    /** The action text of the member / 成员的操作文本 */
    actionText?: string
  }

  // outline -------------------------------------------------------------------

  /** The outline config / 大纲配置 */
  export interface Outline {
    /** The header levels of the outline / 大纲的标题级别 */
    level?: number | [number, number] | 'deep'

    /** The label of the outline / 大纲的标签 */
    label?: string
  }

  /** An outline item / 大纲条目 */
  export type OutlineItem = Omit<Header, 'slug' | 'children'> & {
    /** The element of the header / 标题元素 */
    element: HTMLHeadElement

    /** The children of the item / 子条目 */
    children?: OutlineItem[]
  }

  // last updated --------------------------------------------------------------

  /** The last updated options / 最后更新选项 */
  export interface LastUpdatedOptions {
    /** Set custom last updated text / 自定义最后更新文本 */
    text?: string

    /** Set options for last updated time formatting / 最后更新时间格式化选项 */
    formatOptions?: Intl.DateTimeFormatOptions & { forceLocale?: boolean }
  }

  // not found -----------------------------------------------------------------

  /** The 404 page options / 404 页面选项 */
  export interface NotFoundOptions {
    /** Set custom not found message / 自定义未找到消息 */
    title?: string

    /** Set custom not found description / 自定义未找到描述 */
    quote?: string

    /** Target of the home link / 首页链接目标 */
    link?: string

    /** Set aria label for home link / 首页链接的无障碍标签 */
    linkLabel?: string

    /** Set custom home link text / 自定义首页链接文本 */
    linkText?: string

    /** The 404 code / 404 代码 */
    code?: string
  }
}
