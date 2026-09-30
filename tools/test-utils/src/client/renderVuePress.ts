import type { TestClientOptions } from '../shared/types.js'
import { createTestClient } from './createTestClient.js'

/**
 * Create a VuePress test client and render it to an HTML string
 *
 * It works in the `node` environment, so it can be used to assert the rendered
 * markup of every option combination without a DOM.
 *
 * 创建 VuePress 测试客户端并渲染为 HTML 字符串
 *
 * 它可在 `node` 环境下工作，因此无需 DOM 即可断言各种选项组合的渲染结果。
 *
 * @example
 *   const html = await renderVuePress({
 *     content: '<p>Hello</p>',
 *     page: { path: '/', title: 'Home' },
 *   })
 *
 *   expect(html).toContain('<h1>Home</h1>')
 *
 * @param options - Options to create the test client / 创建测试客户端的选项
 * @returns The rendered HTML / 渲染后的 HTML
 */
export const renderVuePress = async (
  options: TestClientOptions = {},
): Promise<string> => (await createTestClient(options)).renderToString()
