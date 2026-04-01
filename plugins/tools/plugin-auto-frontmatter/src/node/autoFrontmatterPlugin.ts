import { watch } from 'chokidar'
import type { Plugin } from 'vuepress/core'
import { path, picomatch, tinyglobby } from 'vuepress/utils'

import {
  findRule,
  generateFileFrontmatter,
  generateFileListFrontmatter,
} from './generateFrontmatter.js'
import { resolveRules } from './resolveRules.js'
import type { AutoFrontmatterPluginOptions } from './types.js'
import { PLUGIN_NAME } from './utils.js'

/**
 * Auto frontmatter plugin
 *
 * @example
 * ```ts
 * export default {
 *   plugins: [
 *     autoFrontmatterPlugin({
 *       filter: '**\/*.md',
 *       handle: (data, context) => {
 *         data.title ??= 'title'
 *         return data
 *       }
 *     })
 *   ]
 * }
 * ```
 */
export const autoFrontmatterPlugin =
  (options: AutoFrontmatterPluginOptions = []): Plugin =>
  (app) => {
    const { pagePatterns } = app.options
    const sourceDir = app.dir.source()
    const rules = resolveRules(options)

    return {
      name: PLUGIN_NAME,

      /**
       * Use hooks to block the execution of other tasks and prioritize the automatic generation of frontmatter.
       * 利用钩子阻塞其他任务执行，先完成 frontmatter 的自动生成
       */
      async extendsMarkdownOptions() {
        const fileList = await tinyglobby.glob(pagePatterns, { cwd: sourceDir })
        await generateFileListFrontmatter(fileList, sourceDir, rules)
      },

      onWatched(_, watchers) {
        const tempDir = app.dir.temp()
        const cacheDir = app.dir.cache()

        const ignorePatterns: string[] = []
        const pagePathPatterns: string[] = []

        for (const pattern of pagePatterns) {
          if (pattern.startsWith('!')) ignorePatterns.push(pattern.slice(1))
          else pagePathPatterns.push(pattern)
        }

        const ignoreMatcher = picomatch(ignorePatterns, { cwd: sourceDir })
        const pageMatcher = picomatch(pagePathPatterns, { cwd: sourceDir })

        const watcher = watch('.', {
          cwd: sourceDir,
          ignored: (filepath, stats) => {
            // This is important so that folders like node_modules will be ignored immediately without traversing their children
            if (ignoreMatcher(filepath)) return true

            if (stats?.isDirectory())
              return filepath === tempDir || filepath === cacheDir

            const isFile = Boolean(stats?.isFile())
            if (
              filepath.includes('.vuepress') ||
              (isFile && !filepath.endsWith('.md'))
            )
              return true

            return isFile && !pageMatcher(path.relative(sourceDir, filepath))
          },
          ignoreInitial: true,
        })
        /**
         * Only need to focus on the newly added files
         * 只需要关注新增的文件
         */
        watcher.on('add', (filepath) => {
          if (!filepath.endsWith('.md')) return

          const relativePath = path.join(filepath) // normalize path
          const rule = findRule(rules, relativePath)
          if (rule)
            void generateFileFrontmatter(relativePath, sourceDir, rule.handle)
        })

        watchers.push(watcher)
      },
    }
  }
