import type { App } from 'vuepress'
import type { Markdown, MarkdownEnv } from 'vuepress/markdown'
import { createCopyCodeButtonRender } from './createCopyCodeButtonRender.js'
import type { CopyCodeButtonOptions } from './types.js'

/**
 * This plugin should work after `preWrapperPlugin`,
 * and if `preWrapper` is disabled, this plugin should not be called either.
 */
export const copyCodeButtonPlugin = (
  md: Markdown,
  app: App,
  options?: boolean | CopyCodeButtonOptions,
): void => {
  const render = createCopyCodeButtonRender(app, options)

  if (!render) return

  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [, , , env] = args

    const result = fence(...args)
    const { filePathRelative } = env as MarkdownEnv
    // resolve copy code button
    const copyCodeButton = render(filePathRelative ?? '')

    return result.replace('><pre', `>${copyCodeButton}<pre`)
  }
}
