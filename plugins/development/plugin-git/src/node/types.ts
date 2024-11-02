import type { Page, PageFrontmatter } from 'vuepress'

export interface GitPluginOptions {
  /**
   * Whether to enable the plugin, If the value is `function`, it will be used to control which pages generate git information.
   *
   * 是否启用插件，如果值为`function`，将用于控制哪些页面生成git信息。
   */
  enabled?: boolean | ((page: Page) => boolean)
  /**
   * Whether to get the created time of a page
   *
   * 是否收集页面创建时间
   */
  createdTime?: boolean

  /**
   * Whether to get the updated time of a page
   *
   * 是否收集页面更新时间
   */
  updatedTime?: boolean

  /**
   * Whether to get the contributors of a page
   *
   * 是否收集页面的贡献者
   */
  contributors?: ContributorsOptions | boolean

  /**
   * Whether to get the changelog of a page
   *
   * 是否收集页面的变更历史记录
   */
  changelogs?: ChangelogOptions | false

  /**
   * @deprecated use `contributors.transform` instead
   * Functions to transform contributors, e.g. remove duplicates ones and sort them
   */
  transformContributors?: (contributors: GitContributor[]) => GitContributor[]
}

export interface ContributorsOptions {
  /**
   * Functions to transform contributors, e.g. remove duplicates ones and sort them
   *
   * 贡献者转换函数，例如去重和排序
   */
  transform?: (
    contributors: GitContributor[],
  ) => GitContributor[] | Promise<GitContributor[]>

  /**
   * The list of contributors configurations
   *
   * 贡献者配置
   */
  list?: ContributorConfig[]

  /**
   * Whether to add avatar in contributor information
   *
   * 是否在贡献者信息中添加头像
   *
   * @default false
   */
  avatar?: boolean
}

export interface ContributorConfig {
  /**
   * Contributor's username on the git hosting service
   *
   * 贡献者在 git 托管服务中的用户名
   */
  username: string
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

export interface ChangelogOptions {
  /**
   * Maximum number of changelogs
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
   * Default: ':repo/commit/:hash'
   *
   * - `:repo` - The url of the git repository
   * - `:hash` - Hash of the commit record
   *
   * 提交记录访问地址模式
   * 默认值：':repo/commit/:hash'
   *
   * - `:repo` - git 仓库的访问地址
   * - `:hash` - 提交记录的 hash
   */
  commitUrlPattern?: string

  /**
   * Issue url pattern
   * Default: ':repo/issues/:issue'
   *
   * - `:repo` - The url of the git repository
   * - `:issue` - Id of the issue
   *
   * issue 访问地址模式
   * 默认值：':repo/issues/:issue'
   *
   * - `:repo` - git 仓库的访问地址
   * - `:issue` - issue 的 id
   */
  issueUrlPattern?: string

  /**
   * Tag url pattern
   * Default: ':repo/releases/tag/:tag'
   *
   * - `:repo` - The url of the git repository
   * - `:tag` - Name of the tag
   *
   * tag 访问地址模式,
   * 默认值：':repo/releases/tag/:tag'
   *
   * - `:repo` - git 仓库的访问地址
   * - `:tag` - tag 的名称
   */
  tagUrlPattern?: string
}

export interface GitPluginFrontmatter extends PageFrontmatter {
  gitInclude?: string[]

  /**
   * Whether to get the contributors of a page
   *
   * - If the value is `false`, it will be ignored
   * - If the value is `string[]`, it will be used as the list of extra contributors
   */
  contributors?: string[] | boolean

  /**
   * Whether to get the changelogs of a page
   */
  changelogs?: boolean
}

export interface GitPluginPageData extends Record<string, unknown> {
  git: GitData
}

export interface GitData {
  /**
   * Unix timestamp in milliseconds of the first commit
   */
  createdTime?: number

  /**
   * Unix timestamp in milliseconds of the last commit
   */
  updatedTime?: number

  /**
   * Contributors of all commits
   */
  contributors?: GitContributor[]

  /**
   * Changelogs of a page
   */
  changelogs?: GitChangelog[]
}

export interface GitContributor {
  name: string
  email: string
  commits: number
  avatar?: string
  url?: string
}

export type GitType = 'bitbucket' | 'gitee' | 'github' | 'gitlab'

export interface RawCommit {
  filepath: string
  /**
   * Commit hash
   */
  hash: string
  /**
   * Unix timestamp in milliseconds
   */
  date: number
  /**
   * Commit message
   */
  message: string
  /**
   * Commit message body
   */
  body: string
  /**
   * Commit refs
   */
  refs: string
  /**
   * Commit author name
   */
  author: string
  /**
   * Commit author email
   */
  email: string
}

export interface MergedRawCommit extends Omit<RawCommit, 'filepath'> {
  filepaths: string[]
}

export interface GitChangelog
  extends Omit<MergedRawCommit, 'body' | 'filepaths' | 'refs'> {
  /**
   * The url of the commit
   */
  commitUrl?: string
  /**
   * The url of the release tag
   */
  tagUrl?: string
}
