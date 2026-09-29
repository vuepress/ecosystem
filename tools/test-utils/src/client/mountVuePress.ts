import type { VueWrapper } from '@vue/test-utils'

import type { TestClientOptions } from '../shared/types.js'
import type { TestMountOptions } from './createTestClient.js'
import { createTestClient } from './createTestClient.js'

/**
 * Options to mount a VuePress test client
 *
 * 挂载 VuePress 测试客户端的选项
 */
export type MountVuePressOptions = TestClientOptions & TestMountOptions

/**
 * Create a VuePress test client and mount it to the DOM
 *
 * It requires `@vue/test-utils` and a DOM environment (e.g. `happy-dom`).
 *
 * 创建 VuePress 测试客户端并挂载到 DOM
 *
 * 它需要 `@vue/test-utils` 与 DOM 环境（如 `happy-dom`）。
 *
 * @example
 *   // @vitest-environment happy-dom
 *   const wrapper = await mountVuePress({
 *     content: MyComponent,
 *     page: { path: '/', title: 'Home' },
 *   })
 *
 *   await wrapper.find('.my-button').trigger('click')
 *
 * @param options - Options to create and mount the test client / 创建并挂载测试客户端的选项
 * @returns The mounted wrapper / 挂载后的 wrapper
 */
export const mountVuePress = async (
  options: MountVuePressOptions = {},
): Promise<VueWrapper> => {
  const { attachTo, ...clientOptions } = options

  return (await createTestClient(clientOptions)).mount({ attachTo })
}
