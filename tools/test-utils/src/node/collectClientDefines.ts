import type { App } from 'vuepress/core'

/**
 * Collect the client defines of the plugins of the app
 *
 * It processes the `define` hook of every plugin, and merges the results into a
 * single object, which matches what the bundler injects into the client
 * bundle.
 *
 * 收集 app 中所有插件的客户端 define
 *
 * 它会处理每个插件的 `define` 钩子，并将结果合并为单个对象，与 bundler 注入客户端的产物一致。
 *
 * @example
 *   const app = await createTestApp({ plugins: [myPlugin({ foo: 'bar' })] })
 *   const defines = await collectClientDefines(app)
 *
 *   expect(defines).toHaveProperty('__MY_OPTIONS__')
 *
 * @param app - The test app / 测试 app
 * @param isServer - Whether to process the defines for the server bundle /
 *   是否为服务端产物处理 define
 * @returns The merged client defines / 合并后的客户端 define
 */
export const collectClientDefines = async (
  app: App,
  isServer = false,
): Promise<Record<string, unknown>> => {
  const results = await app.pluginApi.hooks.define.process(app, isServer)

  return Object.assign({}, ...results) as Record<string, unknown>
}
