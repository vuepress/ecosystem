/**
 * Git provider
 */
export type KnownGitProvider = 'bitbucket' | 'gitee' | 'github' | 'gitlab'

/**
 * Co-author information
 */
export interface CoAuthorInfo {
  name: string
  email: string
}

export interface RawCommit {
  /**
   * File path
   */
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

  /**
   * The co-authors of the commit
   */
  coAuthors: CoAuthorInfo[]
}

export interface MergedRawCommit extends Omit<RawCommit, 'filepath'> {
  filepaths: string[]
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
