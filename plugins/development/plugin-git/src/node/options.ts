import type { LocaleConfig, Page } from 'vuepress'
import type { GitContributorInfo, GitLocaleData } from '../shared/index.js'

/**
 * Contributor information
 *
 * 贡献者信息
 */
export interface ContributorInfo {
  /**
   * Contributor's username on the git hosting service
   *
   * 贡献者在 Git 托管服务中的用户名
   */
  username: string

  /**
   * Contributor name displayed on the page, default is `username`
   *
   * 贡献者显示在页面上的名字， 默认为 `username`
   */
  name?: string

  /**
   * The alias of the contributor,
   * Since contributors may have different usernames saved in their local git configuration
   * compared to their usernames on the hosting service, In this case, aliases can be used to
   * map to the actual usernames.
   *
   * 贡献者别名， 由于贡献者可能在本地 git 配置中保存的 用户名与 托管服务 用户名不一致，
   * 这时候可以通过别名映射到真实的用户名
   */
  alias?: string[] | string

  /**
   * The primary email of the contributor
   *
   * 贡献者在 Git 托管服务中的主邮箱
   */
  email?: string

  /**
   * The alternative emails of the contributor on the Git hosting service,
   * or emails they have used in the past.
   *
   * 贡献者在 Git 托管服务中的备用邮箱，或者曾经使用过的邮箱
   */
  emailAlias?: string[] | string

  /**
   * The avatar url of the contributor.
   *
   * If the git hosting service is `github`, it can be ignored and left blank, as the plugin will automatically fill it in.
   *
   * 贡献者头像地址
   *
   * 如果 git 托管服务为 `github`，则可以忽略不填，由插件自动填充
   */
  avatar?: string

  /**
   * The url of the contributor
   *
   * If the git hosting service is `github`, it can be ignored and left blank, as the plugin will automatically fill it in.
   *
   * 贡献者访问地址
   *
   * 如果 git 托管服务为 `github`，则可以忽略不填，由插件自动填充
   */
  url?: string
}

/**
 * Options for contributors functionality
 *
 * 贡献者功能配置项
 */
export interface ContributorsOptions {
  /**
   * Contributors Information
   *
   * 贡献者信息
   */
  info?: ContributorInfo[]

  /**
   * Whether to add avatar in contributor information
   *
   * 是否在贡献者信息中添加头像
   *
   * @default false
   */
  avatar?: boolean

  /**
   * Avatar url pattern
   * - `:username` - Contributor's username
   *
   * 头像访问地址模式
   * - `:username` - 贡献者的用户名
   *
   * @example 'https://github.com/:username'
   */
  avatarPattern?: string

  /**
   * Functions to transform contributors, e.g. remove duplicates ones and sort them
   *
   * 贡献者转换函数，例如去重和排序
   */
  transform?: (contributors: GitContributorInfo[]) => GitContributorInfo[]
}

/**
 * Options for changelog functionality
 *
 * 变更历史记录功能配置项
 */
export interface ChangelogOptions {
  /**
   * Maximum number of changelog
   *
   * 最大变更记录条数
   */
  maxCount?: number

  /**
   * The url of the git repository, e.g: https://github.com/vuepress/ecosystem
   *
   * git 仓库的访问地址，例如：https://github.com/vuepress/ecosystem
   */
  repoUrl?: string

  /**
   * Commit url pattern
   *
   * - `:repo` - The url of the git repository
   * - `:hash` - Hash of the commit record
   *
   * 提交记录访问地址模式
   *
   * - `:repo` - git 仓库的访问地址
   * - `:hash` - 提交记录的 hash
   *
   * @default ':repo/commit/:hash'
   */
  commitUrlPattern?: string

  /**
   * Issue url pattern
   *
   * - `:repo` - The url of the git repository
   * - `:issue` - Id of the issue
   *
   * issue 访问地址模式
   *
   * - `:repo` - git 仓库的访问地址
   * - `:issue` - issue 的 id
   *
   * @default ':repo/issues/:issue'
   */
  issueUrlPattern?: string

  /**
   * Tag url pattern
   *
   * - `:repo` - The url of the git repository
   * - `:tag` - Name of the tag
   *
   * tag 访问地址模式,
   * 默认值：':repo/releases/tag/:tag'
   *
   * - `:repo` - git 仓库的访问地址
   * - `:tag` - tag 的名称
   *
   * @default ':repo/releases/tag/:tag'
   */
  tagUrlPattern?: string
}

/**
 * Options for @vuepress/plugin-git
 *
 * @vuepress/plugin-git 插件配置项
 */
export interface GitPluginOptions {
  /**
   * Page filter, if it returns `true`, the page will collect git information.
   *
   * 页面过滤器，如果返回 `true` ，该页面将收集 git 信息
   */
  filter?: (page: Page) => boolean
  /**
   * Whether to get the created time of a page
   *
   * 是否收集页面创建时间
   *
   * @default true
   */
  createdTime?: boolean

  /**
   * Whether to get the updated time of a page
   *
   * 是否收集页面更新时间
   *
   * @default true
   */
  updatedTime?: boolean

  /**
   * Whether to get the contributors of a page
   *
   * 是否收集页面的贡献者
   *
   * @default true
   */
  contributors?: ContributorsOptions | boolean

  /**
   * Whether to get the changelog of a page
   *
   * 是否收集页面的变更历史记录
   *
   * @default false
   */
  changelog?: ChangelogOptions | boolean

  /**
   * @deprecated use `contributors.transform` instead
   * Functions to transform contributors, e.g. remove duplicates ones and sort them
   */
  transformContributors?: (
    contributors: GitContributorInfo[],
  ) => GitContributorInfo[]

  /**
   * Localization config
   *
   * 本地化配置
   */
  locales?: LocaleConfig<GitLocaleData>
}
