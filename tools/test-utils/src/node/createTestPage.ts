import type { App, Page, PageOptions } from 'vuepress/core'
import { createPage } from 'vuepress/core'

/**
 * Create a VuePress page for testing
 *
 * It is a thin wrapper of `createPage` with an empty content by default, so
 * that a page can be created without a source file.
 *
 * 创建用于测试的 VuePress 页面
 *
 * 它是 `createPage` 的轻量封装，默认内容为空，因此无需源文件即可创建页面。
 *
 * @example
 *   const page = await createTestPage(app, {
 *     filePath: 'guide/index.md',
 *     frontmatter: { title: 'Guide' },
 *   })
 *
 * @param app - The test app / 测试 app
 * @param options - Page options / 页面选项
 * @returns The created page / 创建的页面
 */
export const createTestPage = async (
  app: App,
  options: PageOptions = {},
): Promise<Page> => createPage(app, { content: '', ...options })
