import type { App } from 'vuepress/core'

/**
 * Get current bundler name
 *
 * 获取当前打包器名称
 *
 * @param app - VuePress Node App / VuePress Node 应用
 *
 * @returns The bundler name / 打包器名称
 *
 * @example
 * ```ts
 * // With @vuepress/bundler-vite
 * getBundlerName(app) // 'vite'
 * // With @vuepress/bundler-webpack
 * getBundlerName(app) // 'webpack'
 * ```
 */
export const getBundlerName = (app: App): string => {
  const { name } = app.options.bundler

  return /^@vuepress\/bundler-(.*)$/.exec(name)?.[1] ?? name
}
