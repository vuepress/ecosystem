import type { App } from 'vuepress/core'
import { fs } from 'vuepress/utils'
import type { PalettePluginOptions } from './palettePlugin.js'

/**
 * Prepare palette file
 *
 * 准备调色板文件
 *
 * @param app - VuePress app instance
 * @param options - prepare options
 * @returns file path of generated palette file
 *
 * @example
 * ```ts
 * const palettePath = await preparePaletteFile(app, {
 *   userPaletteFile: '.vuepress/styles/palette.scss',
 *   tempPaletteFile: 'styles/palette.scss',
 *   importCode: (filePath) => `@forward 'file:///${filePath}';\n`
 * })
 * ```
 */
export const preparePaletteFile = async (
  app: App,
  {
    userPaletteFile,
    tempPaletteFile,
    importCode,
  }: Pick<
    Required<PalettePluginOptions>,
    'importCode' | 'tempPaletteFile' | 'userPaletteFile'
  >,
): Promise<string> => {
  const userPalette = app.dir.source(userPaletteFile)

  let content = ''

  if (await fs.pathExists(userPalette)) content += importCode(userPalette)

  return app.writeTemp(tempPaletteFile, content)
}
