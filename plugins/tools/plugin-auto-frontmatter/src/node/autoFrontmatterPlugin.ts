import { watch } from 'chokidar'
import type { Plugin } from 'vuepress/core'
import { globby, path } from 'vuepress/utils'
import { createFilter } from './createFilter.js'
import {
  findRule,
  generateFrontmatter,
  generatorFileFrontmatter,
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
export const autoFrontmatterPlugin = (
  options: AutoFrontmatterPluginOptions = [],
): Plugin => {
  return (app) => {
    const { pagePatterns = ['**/*.md', '!.vuepress', '!node_modules'] } =
      app.options
    const cwd = app.dir.source()
    const rules = resolveRules(options)

    return {
      name: PLUGIN_NAME,

      /**
       * Use hooks to block the execution of other tasks and prioritize the automatic generation of frontmatter.
       * 利用钩子阻塞其他任务执行，先完成 frontmatter 的自动生成
       */
      async extendsMarkdownOptions() {
        const fileList = await globby(pagePatterns, { cwd })
        await generateFrontmatter(fileList, cwd, rules)
      },

      onWatched(_, watchers) {
        const filter = createFilter(pagePatterns)
        const watcher = watch('.', {
          cwd,
          ignoreInitial: true,
          ignored: (filepath, stats) => {
            if (
              Boolean(stats?.isFile()) &&
              filepath.endsWith('.md') &&
              !filepath.includes('.vuepress')
            ) {
              return !filter(path.relative(cwd, filepath))
            }
            return true
          },
        })
        /**
         * Only need to focus on the newly added files
         * 只需要关注新增的文件
         */
        watcher.on('add', (filepath) => {
          const relativePath = path.join(filepath) // normalize path
          const rule = findRule(rules, relativePath)
          if (rule)
            void generatorFileFrontmatter(relativePath, cwd, rule.handle)
        })

        watchers.push(watcher)
      },
    }
  }
}
