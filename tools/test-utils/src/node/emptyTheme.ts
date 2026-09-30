import type { Theme } from 'vuepress/core'

/**
 * An empty VuePress theme for testing
 *
 * It does not provide any layout, and is used to create a test app without
 * pulling in a real theme.
 *
 * 用于测试的空 VuePress 主题
 *
 * 它不提供任何布局，用于在不引入真实主题的情况下创建测试 app。
 *
 * @example
 *   import { emptyTheme } from '@vuepress/test-utils'
 *
 *   const app = await createTestApp({ theme: emptyTheme })
 */
export const emptyTheme: Theme = {
  name: 'vuepress-theme-empty',
}
