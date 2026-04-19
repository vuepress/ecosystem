import type { App } from 'vuepress/core'
import { fs } from 'vuepress/utils'

import type { PalettePluginOptions } from './palettePlugin.js'

/**
 * Prepare style file
 *
 * 准备样式文件
 *
 * @example
 *   const stylePath = await prepareStyleFile(app, {
 *     userStyleFile: '.vuepress/styles/index.scss',
 *     tempStyleFile: 'styles/index.scss',
 *     importCode: (filePath) => `@forward 'file:///${filePath}';\n`,
 *   })
 *
 * @param app - VuePress app instance
 * @param options - Prepare options
 * @returns File path of generated style file
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

  if (await fs.pathExists(userStyle)) content += importCode(userStyle)

  return app.writeTemp(tempStyleFile, content)
}
