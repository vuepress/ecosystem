import { getFullLocaleConfig } from '@vuepress/helper'
import type { Page, Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import { path } from 'vuepress/utils'
import type {
  GitPluginFrontmatter,
  GitPluginPageData,
} from '../shared/index.js'
import { gitLocaleInfo } from './locales.js'
import type { GitPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'
import { resolveChangelog } from './resolveChangelog.js'
import { resolveContributors } from './resolveContributors.js'
import {
  checkGitRepo,
  getCommits,
  inferGitProvider,
  injectGitOptions,
} from './utils/index.js'

export const gitPlugin =
  ({
    createdTime = true,
    updatedTime = true,
    contributors = true,
    changelog = false,
    filter,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    transformContributors,
    locales = {},
  }: GitPluginOptions = {}): Plugin =>
  (app) => {
    const name = '@vuepress/plugin-git'
    const cwd = app.dir.source()
    const isGitRepoValid = checkGitRepo(cwd)
    const gitProvider = isGitRepoValid ? inferGitProvider(cwd) : null
    return {
      name,

      define: {
        __GIT_LOCALES__: getFullLocaleConfig({
          app,
          name,
          default: gitLocaleInfo,
          config: locales,
        }),
        __GIT_OPTIONS__: injectGitOptions(gitProvider, changelog),
      },

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
          !(frontmatter.contributors ?? contributors) &&
          !(frontmatter.changelog ?? changelog) &&
          !createdTime &&
          !updatedTime
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

        if (createdTime) {
          page.data.git.createdTime = commits[commits.length - 1].time
        }

        if (updatedTime) {
          page.data.git.updatedTime = commits[0].time
        }

        const contributorsOptions = isPlainObject(contributors)
          ? contributors
          : {}

        if (frontmatter.contributors ?? contributors) {
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

      clientConfigFile: () =>
        prepareClientConfigFile(app, { changelog, contributors }),
    }
  }
