import type { PalettePluginOptions } from './palettePlugin.js'

/**
 * Default options for different palette preset
 *
 * 不同调色板预设的默认配置
 */
export const presetOptions: Record<
  Required<PalettePluginOptions>['preset'],
  Omit<Required<PalettePluginOptions>, 'preset'>
> = {
  css: {
    userPaletteFile: '.vuepress/styles/palette.css',
    tempPaletteFile: 'styles/palette.css',
    importCode: (filePath) => `@import '${filePath}';\n`,
  },
  sass: {
    userPaletteFile: '.vuepress/styles/palette.scss',
    tempPaletteFile: 'styles/palette.scss',
    importCode: (filePath) => `@forward 'file:///${filePath}';\n`,
  },
  less: {
    userPaletteFile: '.vuepress/styles/palette.less',
    tempPaletteFile: 'styles/palette.less',
    importCode: (filePath) => `@import '${filePath}';\n`,
  },
  stylus: {
    userPaletteFile: '.vuepress/styles/palette.styl',
    tempPaletteFile: 'styles/palette.styl',
    importCode: (filePath) => `@require '${filePath}';\n`,
  },
}
