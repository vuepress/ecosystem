import type { Page, Plugin } from 'vuepress/core'
import { path } from 'vuepress/utils'
import type {
  GitContributor,
  GitPluginFrontmatter,
  GitPluginPageData,
} from './types.js'
import {
  checkGitRepo,
  getContributors,
  getCreatedTime,
  getUpdatedTime,
} from './utils/index.js'

/**
 * Options of @vuepress/plugin-git
 */
export interface GitPluginOptions {
  /**
   * Whether to get the created time of a page
   */
  createdTime?: boolean

  /**
   * Whether to get the updated time of a page
   */
  updatedTime?: boolean

  /**
   * Whether to get the contributors of a page
   */
  contributors?: boolean

  /**
   * Functions to transform contributors, e.g. remove duplicates ones and sort them
   */
  transformContributors?: (contributors: GitContributor[]) => GitContributor[]
}

export const gitPlugin =
  ({
    createdTime,
    updatedTime,
    contributors,
    transformContributors,
  }: GitPluginOptions = {}): Plugin =>
  (app) => {
    const cwd = app.dir.source()
    const isGitRepoValid = checkGitRepo(cwd)

    return {
      name: '@vuepress/plugin-git',

      extendsPage: async (
        page: Page<GitPluginPageData, GitPluginFrontmatter>,
      ) => {
        page.data.git = {}

        if (!isGitRepoValid || page.filePathRelative === null) {
          return
        }

        const filePaths = [
          page.filePathRelative,
          ...(page.frontmatter.gitInclude ?? []).map((item) =>
            path.join(page.filePathRelative, '..', item),
          ),
        ]

        if (createdTime !== false) {
          page.data.git.createdTime = await getCreatedTime(filePaths, cwd)
        }

        if (updatedTime !== false) {
          page.data.git.updatedTime = await getUpdatedTime(filePaths, cwd)
        }

        if (contributors !== false) {
          const result = await getContributors(filePaths, cwd)

          page.data.git.contributors = transformContributors?.(result) ?? result
        }
      },

      // remove `gitInclude` from frontmatter
      onInitialized: () => {
        app.pages.forEach((page) => {
          delete page.frontmatter.gitInclude
        })
      },
    }
  }
