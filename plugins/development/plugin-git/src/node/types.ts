import type { PageFrontmatter } from 'vuepress'

export interface GitPluginFrontmatter extends PageFrontmatter {
  gitInclude?: string[]
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
}

export interface GitContributor {
  name: string
  email: string
  commits: number
}
