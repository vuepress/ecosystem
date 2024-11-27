import type { Page, Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import { path } from 'vuepress/utils'
import type {
  GitPluginFrontmatter,
  GitPluginOptions,
  GitPluginPageData,
} from './options.js'
import { resolveChangelog } from './resolveChangelog.js'
import { resolveContributors } from './resolveContributors.js'
import { checkGitRepo, getCommits, inferGitProvider } from './utils/index.js'

export const gitPlugin =
  ({
    createdTime,
    updatedTime,
    contributors,
    changelog = false,
    filter,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    transformContributors,
  }: GitPluginOptions = {}): Plugin =>
  (app) => {
    const cwd = app.dir.source()
    const isGitRepoValid = checkGitRepo(cwd)
    const gitProvider = isGitRepoValid ? inferGitProvider(cwd) : null

    return {
      name: '@vuepress/plugin-git',

      extendsPage: async (
        page: Page<GitPluginPageData, GitPluginFrontmatter>,
      ) => {
        page.data.git = {}

        if (!isGitRepoValid || page.filePathRelative === null) {
          return
        }

        if (filter && !filter(page)) return

        const { frontmatter } = page

        // skip if all features are disabled
        if (
          !(frontmatter.contributors ?? contributors ?? true) &&
          !(frontmatter.changelog ?? changelog) &&
          createdTime === false &&
          updatedTime === false
        ) {
          return
        }

        const filePaths = [
          page.filePathRelative,
          ...(page.frontmatter.gitInclude ?? []).map((item) =>
            path.join(page.filePathRelative, '..', item),
          ),
        ]

        const commits = await getCommits(filePaths, cwd, {
          contributors: (frontmatter.contributors ?? contributors) !== false,
          changelog: frontmatter.changelog ?? changelog,
        })

        if (commits.length === 0) return

        if (createdTime !== false) {
          page.data.git.createdTime = commits[commits.length - 1].date
        }

        if (updatedTime !== false) {
          page.data.git.updatedTime = commits[0].date
        }

        const contributorsOptions = isPlainObject(contributors)
          ? contributors
          : {}

        if ((frontmatter.contributors ?? contributors) !== false) {
          contributorsOptions.transform ??= transformContributors
          page.data.git.contributors = resolveContributors(
            commits,
            gitProvider,
            contributorsOptions,
            Array.isArray(frontmatter.contributors)
              ? frontmatter.contributors
              : [],
          )
        }

        if (frontmatter.changelog ?? changelog) {
          const changelogOptions = isPlainObject(changelog) ? changelog : {}

          page.data.git.changelog = resolveChangelog(
            app,
            commits,
            changelogOptions,
            gitProvider,
            contributorsOptions.info ?? [],
          )
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
