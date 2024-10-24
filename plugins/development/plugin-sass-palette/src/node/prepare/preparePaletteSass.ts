import type { App } from 'vuepress/core'
import { getFileContent, getIdPrefix } from '../utils.js'

export interface PreparePaletteOptions {
  id: string
  defaultPalette?: string
  generator: string
  userPalette: string
}

export const preparePaletteSass = async (
  app: App,
  { id, defaultPalette, generator, userPalette }: PreparePaletteOptions,
): Promise<string> => {
  const contents = await Promise.all([
    defaultPalette ? getFileContent(defaultPalette) : '',
    getFileContent(userPalette),
    getFileContent(generator),
  ])

  return app.writeTemp(
    `sass-palette/${getIdPrefix(id)}palette.scss`,
    `${contents.join('\n')}\n`,
  )
}
