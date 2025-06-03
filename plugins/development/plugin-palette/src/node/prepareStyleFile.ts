import type { App } from 'vuepress/core'
import { fs } from 'vuepress/utils'
import type { PalettePluginOptions } from './palettePlugin.js'

/**
 * Prepare style file
 *
 * 准备样式文件
 *
 * @param app - VuePress app instance
 * @param options - prepare options
 * @returns file path of generated style file
 *
 * @example
 * ```ts
 * const stylePath = await prepareStyleFile(app, {
 *   userStyleFile: '.vuepress/styles/index.scss',
 *   tempStyleFile: 'styles/index.scss',
 *   importCode: (filePath) => `@forward 'file:///${filePath}';\n`
 * })
 * ```
 */
export const prepareStyleFile = async (
  app: App,
  {
    userStyleFile,
    tempStyleFile,
    importCode,
  }: Pick<
    Required<PalettePluginOptions>,
    'importCode' | 'tempStyleFile' | 'userStyleFile'
  >,
): Promise<string> => {
  const userStyle = app.dir.source(userStyleFile)

  let content = ''

  if (await fs.pathExists(userStyle)) {
    content += importCode(userStyle)
  }

  return app.writeTemp(tempStyleFile, content)
}
