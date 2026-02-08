import type { IncludeEnv } from '@mdit/plugin-include'
import { include } from '@mdit/plugin-include'
import { deepAssign } from '@vuepress/helper'
import type { RuleCore } from 'markdown-it/lib/parser_core.mjs'
import type { Plugin } from 'vuepress/core'
import type { MarkdownEnv } from 'vuepress/markdown'
import { path } from 'vuepress/utils'
import type { MarkdownIncludePluginOptions } from './options.js'

declare module 'vuepress/markdown' {
  interface MarkdownOptions {
    include?: MarkdownIncludePluginOptions
  }
}

/**
 * Markdown include plugin
 *
 * Markdown 导入插件
 *
 * @example
 * ```ts
 * import { markdownIncludePlugin } from '@vuepress/plugin-markdown-include'
 *
 * export default {
 *   plugins: [
 *     markdownIncludePlugin({
 *       deep: true,
 *       useComment: true,
 *     }),
 *   ],
 * }
 * ```
 */
export const markdownIncludePlugin =
  (options: MarkdownIncludePluginOptions): Plugin =>
  (app) => {
    const source = app.dir.source()

    const opts = deepAssign({}, app.options.markdown.include, options)
    app.options.markdown.include = opts

    return {
      name: '@vuepress/plugin-markdown-include',

      extendsMarkdown: (md) => {
        md.use(include, {
          currentPath: (env: MarkdownEnv) => env.filePath,
          ...opts,
        })

        // @ts-expect-error: __rules__ is private
        const coreRules = md.core.ruler.__rules__ as {
          name: string
          enabled: boolean
          fn: RuleCore
          alt: string[]
        }[]

        const originalImportRule = coreRules.find(
          (rule) => rule.name === 'md_import',
        )!.fn

        // replace the original import rule to add included files as page deps
        md.core.ruler.at('md_import', (state) => {
          originalImportRule(state)

          const env = state.env as IncludeEnv & MarkdownEnv
          const { includedFiles = [], filePathRelative } = env

          if (includedFiles.length) {
            ;(((env.frontmatter ??= {}).gitInclude as string[] | undefined) ??=
              []).push(
              ...includedFiles.map((file) =>
                path.relative(
                  path.resolve(source, filePathRelative, '..'),
                  path.resolve(source, filePathRelative, file),
                ),
              ),
            )
          }
        })
      },
      extendsPage: ({ deps, markdownEnv }) => {
        const { includedFiles = [] } = markdownEnv as IncludeEnv

        // mark included files as page deps
        deps.push(...includedFiles)
      },
    }
  }
