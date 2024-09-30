import type { App } from 'vuepress/core'

/**
 * Get current bundler name
 *
 * @param app VuePress Node App
 */
export const getBundlerName = (app: App): string => {
  const { name } = app.options.bundler

  return name.match(/^@vuepress\/bundler-(.*)$/)?.[1] || name
}
