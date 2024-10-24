import type { IncludeEnv } from '@mdit/plugin-include'
import { include } from '@mdit/plugin-include'
import type { Plugin } from 'vuepress/core'
import type { MarkdownEnv } from 'vuepress/markdown'
import { path } from 'vuepress/utils'
import type { MarkdownIncludePluginOptions } from './options.js'

export const markdownIncludePlugin =
  (options: MarkdownIncludePluginOptions): Plugin =>
  (app) => {
    const source = app.dir.source()

    return {
      name: '@vuepress/plugin-markdown-include',

      extendsMarkdown: (md) => {
        md.use(include, {
          currentPath: (env: MarkdownEnv) => env.filePath,
          ...options,
        })
      },
      extendsPage: (page): void => {
        const { markdownEnv, frontmatter, filePathRelative } = page
        const { includedFiles = [] } = markdownEnv as IncludeEnv

        // mark included files as page deps
        page.deps.push(...includedFiles)

        // add included files as git deps
        ;((frontmatter.gitInclude as string[] | undefined) ??= []).push(
          ...includedFiles.map((file) =>
            path.relative(
              path.resolve(source, filePathRelative, '..'),
              path.resolve(source, filePathRelative, file),
            ),
          ),
        )
      },
    }
  }
