import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { NavItemWithLink } from './navbar.js'
import type { Outline } from './options/index.js'
import type { DefaultThemeImage, Feature, HeroAction } from './shared.js'

export interface DefaultThemePageData extends GitPluginPageData {
  filePathRelative: string | null
}

export interface DefaultThemePageFrontmatter {
  /**
   * Whether is homepage
   *
   * 是否是主页
   */
  home?: boolean
  /**
   * Extra class name for page
   *
   * 页面额外类名
   */
  pageClass?: string
  /**
   * Page layout
   *
   * 页面布局
   *
   * @type { 'doc' | 'page' | 'home' }
   * @default 'doc'
   */
  pageLayout?: false | string
  /**
   * Whether show navbar
   *
   * 是否显示导航
   *
   * @default true
   */
  navbar?: boolean
  /**
   * Whether show footer
   *
   * 是否显示 页脚
   *
   * @default true
   */
  footer?: boolean
  /**
   * Whether show external link icon
   *
   * 是否显示外链图标
   *
   * @default true
   */
  externalLinkIcon?: boolean
}

export interface DefaultThemeHomePageFrontmatter
  extends DefaultThemePageFrontmatter {
  /**
   * Whether use markdown styles
   *
   * 是否使用 markdown 样式
   *
   * @default true
   */
  markdownStyles?: false

  hero?: {
    /**
     * The string shown top of `text`. Comes with brand color
     * and expected to be short, such as product name.
     *
     * `text` 上方的字符，带有品牌颜色, 尽量简短，例如产品名称
     */
    name?: string
    /**
     * The main text for the hero section. This will be defined as `h1` tag.
     *
     * hero 部分的主要文字，被定义为 `h1` 标签
     */
    text?: string
    /**
     * Tagline displayed below `text`.
     *
     * `text` 下方的标语
     */
    tagline?: string
    /**
     * The image is displayed next to the text and tagline area.
     *
     * text 和 tagline 区域旁的图片
     */
    image?: DefaultThemeImage
  }
  /**
   * Action buttons to display in home hero section.
   *
   * 主页 hero 部分的操作按钮
   */
  actions?: HeroAction[]

  /**
   * you can list any number of features you would like to show right after the Hero section
   *
   * 在 Hero 部分之后列出任意数量的 Feature
   */
  features?: Feature[]
}

export interface DefaultThemeNormalPageFrontmatter
  extends DefaultThemePageFrontmatter {
  /**
   * Whether show sidebar
   *
   * 是否显示侧边栏
   *
   * @default true
   */
  sidebar?: boolean
  /**
   * 定义侧边栏组件在 `doc` 布局中的位置
   *
   * @default true
   */
  aside?: boolean | 'left'
  /**
   * Whether show edit link
   *
   * 是否显示编辑链接
   *
   * @default true
   */
  editLink?: boolean
  /**
   * Edit link pattern
   *
   * 页面 编辑链接 的 pattern
   */
  editLinkPattern?: string
  /**
   * Whether show last updated time
   *
   * 是否显示最后更新时间
   *
   * @default true
   */
  lastUpdated?: boolean
  /**
   * Whether show contributors
   *
   * 是否显示贡献者
   *
   * @default true
   */
  contributors?: boolean
  /**
   * 大纲中显示的标题级别。
   *
   * @default [2,3]
   */
  outline?: Outline
  /**
   * Whether show Prev link, or define the Prev link
   *
   * 是否显示 Prev 链接，或定义 Prev 链接
   *
   * @default true
   */
  prev: boolean | string | NavItemWithLink
  /**
   * Whether show Next link, or define the Next link
   *
   * 是否显示 Next 链接，或定义 Next 链接
   *
   * @default true
   */
  next: boolean | string | NavItemWithLink
  /**
   * Whether index current page
   *
   * 是否索引此页面
   *
   * @default true
   */
  index?: boolean

  /**
   * Page order in sidebar
   *
   * 页面在侧边栏的顺序
   *
   * @default 0
   */
  order?: number
  /**
   * Dir config
   *
   * @description Only available at README.md
   *
   * 目录配置
   *
   * @description 仅在 README.md 中可用
   */
  dir?: {
    /**
     * Dir title
     *
     * @default title of README.md
     *
     * 目录标题
     *
     * @default README.md 标题
     */
    text?: string

    /**
     * Whether Dir is collapsible
     *
     * 目录是否可折叠
     *
     * @default true
     */

    collapsible?: boolean

    /**
     * Whether Dir is clickable
     *
     * @description Will set group link to link of README.md
     *
     * 目录是否可点击
     *
     * @description 将会将目录分组的链接设置为 README.md 对应的链接
     *
     * @default false
     */

    link?: boolean

    /**
     * Whether index current dir
     *
     * 是否索引此目录
     *
     * @default true
     */
    index?: boolean

    /**
     * Dir order in sidebar
     *
     * 目录在侧边栏中的顺序
     *
     * @default 0
     */
    order?: number
  }
}
