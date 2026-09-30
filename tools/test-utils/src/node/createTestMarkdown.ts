import type { Markdown, MarkdownOptions } from 'vuepress/markdown'
import { createMarkdown } from 'vuepress/markdown'

/**
 * A markdown-it plugin
 *
 * Markdown-it 插件
 */
export type MarkdownPlugin = Parameters<Markdown['use']>[0]

/**
 * Options to create a test markdown instance
 *
 * 创建测试 markdown 实例的选项
 */
export interface TestMarkdownOptions {
  /**
   * VuePress markdown options
   *
   * VuePress markdown 选项
   */
  markdownOptions?: MarkdownOptions

  /**
   * Markdown-it plugins to be applied
   *
   * 需要应用的 markdown-it 插件
   */
  plugins?: MarkdownPlugin[]
}

/**
 * Create a VuePress markdown-it instance for testing
 *
 * It creates a markdown instance with the default VuePress options, and applies
 * the given markdown-it plugins.
 *
 * To test with a VuePress plugin, use `createTestApp()` and read
 * `app.markdown`, which already includes every markdown extension of the
 * plugins.
 *
 * 创建用于测试的 VuePress markdown-it 实例
 *
 * 它使用 VuePress 默认选项创建 markdown 实例，并应用给定的 markdown-it 插件。
 *
 * 若要测试 VuePress 插件，请使用 `createTestApp()` 并读取 `app.markdown`，其中已包含插件的全部 markdown
 * 扩展。
 *
 * @example
 *   const md = createTestMarkdown()
 *
 *   expect(md.render('# Title', {})).toContain('<h1 id="title">')
 *
 * @param options - Options to create the markdown instance / 创建 markdown 实例的选项
 * @returns The markdown-it instance / markdown-it 实例
 */
export const createTestMarkdown = (
  options: TestMarkdownOptions = {},
): Markdown => {
  const md = createMarkdown(options.markdownOptions)

  for (const plugin of options.plugins ?? []) md.use(plugin)

  return md
}
