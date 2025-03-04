import type { PageFrontmatter } from 'vuepress/shared'

/**
 * Co-author information
 */
export interface CoAuthorInfo {
  name: string
  email: string
}

export interface GitContributor {
  /**
   * Contributor display name
   */
  name: string
  /**
   * Contributor email
   */
  email: string

  /**
   * Contributor username on the git hosting service
   */
  username: string
  /**
   * Number of commits
   */
  commits: number
  /**
   * Contributor avatar
   */
  avatar?: string
  /**
   * The url of the contributor
   */
  url?: string
}

export interface GitChangelog {
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
   * The url of the commit
   */
  commitUrl?: string
  /**
   * release tag
   */
  tag?: string
  /**
   * The url of the release tag
   */
  tagUrl?: string
  /**
   * Commit author name
   */
  author: string
  /**
   * Commit author email
   */
  email: string

  /**
   * The co-authors of the commit
   */
  coAuthors?: CoAuthorInfo[]
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
   * Whether to get the changelog of a page
   */
  changelog?: boolean
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
   * Changelog of a page
   */
  changelog?: GitChangelog[]
}

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
