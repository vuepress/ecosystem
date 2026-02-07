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
  PLUGIN_NAME,
  checkGitRepo,
  getCommits,
  inferGitProvider,
  injectGitOptions,
} from './utils/index.js'

/**
 * Git plugin
 *
 * Git 插件
 *
 * @param [options={}] - Plugin options / 插件选项
 *
 * @example
 * ```ts
 * import { gitPlugin } from '@vuepress/plugin-git'
 *
 * export default {
 *   plugins: [
 *     gitPlugin({
 *       createdTime: true,
 *       updatedTime: true,
 *       contributors: true,
 *       changelog: false
 *     })
 *   ]
 * }
 * ```
 */
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
    const cwd = app.dir.source()
    const isGitRepo = checkGitRepo(cwd)
    const gitProvider = isGitRepo ? inferGitProvider(cwd) : null
    return {
      name: PLUGIN_NAME,

      define: {
        __GIT_CHANGELOG__: Boolean(changelog),
        __GIT_CONTRIBUTORS__: Boolean(contributors),
        __GIT_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          default: gitLocaleInfo,
          config: locales,
        }),
        __GIT_OPTIONS__: injectGitOptions(gitProvider, changelog),
      },

      extendsPage: async (
        page: Page<GitPluginPageData, GitPluginFrontmatter>,
      ) => {
        page.data.git = {}

        if (!isGitRepo || page.filePathRelative == null) {
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
