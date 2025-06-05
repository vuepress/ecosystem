import type { PageFrontmatter } from 'vuepress/shared'

/**
 * Git provider
 *
 * Git 提供商
 */
export type KnownGitProvider = 'bitbucket' | 'gitee' | 'github' | 'gitlab'

/**
 * Co-author information
 *
 * 合作作者信息
 */
export interface CoAuthorInfo {
  /**
   * Co-author name
   *
   * 协同作者名称
   */
  name: string
  /**
   * Co-author email
   *
   * 协同作者邮箱
   */
  email: string
}

/**
 * Git contributor information
 *
 * Git 贡献者信息
 */
export interface GitContributorInfo {
  /**
   * Contributor display name
   *
   * 贡献者显示名称
   */
  name: string
  /**
   * Contributor email
   *
   * 贡献者邮箱
   */
  email: string

  /**
   * Contributor username on the git hosting service
   *
   * 贡献者在 git 托管服务中的用户名
   */
  username: string
  /**
   * Number of commits
   *
   * 提交次数
   */
  commits: number
  /**
   * Contributor avatar
   *
   * 贡献者头像
   */
  avatar?: string
  /**
   * The url of the contributor
   *
   * 贡献者访问地址
   */
  url?: string
}

/**
 * Git changelog information
 *
 * Git 变更日志信息
 */
export interface GitChangelogInfo {
  /**
   * Commit hash
   *
   * 提交哈希
   */
  hash: string
  /**
   * Unix timestamp in milliseconds
   *
   * Unix 时间戳，单位毫秒
   */
  time: number
  /**
   * Commit message
   *
   * 提交信息
   */
  message: string
  /**
   * The url of the commit
   *
   * 提交访问地址
   */
  commitUrl?: string
  /**
   * release tag
   *
   * 发布标签
   */
  tag?: string
  /**
   * The url of the release tag
   *
   * 标签访问地址
   */
  tagUrl?: string
  /**
   * Commit author name
   *
   * 提交作者名称
   */
  author: string
  /**
   * Commit author email
   *
   * 提交作者邮箱
   */
  email: string

  /**
   * The co-authors of the commit
   *
   * 提交协同作者列表
   */
  coAuthors?: CoAuthorInfo[]
}

/**
 * Git plugin frontmatter
 *
 * Git 插件 frontmatter
 */
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
   * Whether to get the changelog of a page
   */
  changelog?: boolean
}

/**
 * Git plugin page data
 *
 * Git 插件页面数据
 */
export interface GitPluginPageData extends Record<string, unknown> {
  git: GitData
}

/**
 * Git data
 *
 * Git 数据
 */
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
  contributors?: GitContributorInfo[]

  /**
   * Changelog of a page
   */
  changelog?: GitChangelogInfo[]
}

/**
 * Git locale data
 *
 * Git 多语言数据
 */
export interface GitLocaleData {
  /**
   * Contributors title
   */
  contributors: string

  /**
   * Changelog title
   */
  changelog: string

  /**
   * Word to represent a commit "on" a time
   */
  timeOn: string

  /**
   * Changelog button
   */
  viewChangelog: string

  /**
   * Latest updated
   */
  latestUpdateAt: string
}

/**
 * Git URL pattern
 *
 * Git URL 模式
 */
export interface GitUrlPattern {
  issue?: string
  tag?: string
  commit?: string
}

/**
 * Git inject options
 *
 * Git 注入选项
 */
export interface GitInjectOptions {
  provider?: KnownGitProvider | null
  repo?: string
  pattern?: GitUrlPattern
}
