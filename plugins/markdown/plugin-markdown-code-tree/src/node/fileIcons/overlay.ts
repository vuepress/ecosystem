import type { IconMap } from './types.js'

/**
 * Hand written patches applied on top of the generated icon table
 *
 * The icon set is generated from a package, which does not cover every file
 * type, so the gaps that are worth filling are listed here. Keep it as small as
 * possible: anything that the icon source already resolves does not belong
 * here.
 *
 * 在生成表之上应用的人工补丁
 *
 * 图标集由包生成，而包并不能覆盖所有文件类型，因此在这里列出值得补齐的缺口。请尽量保持精简： 凡是图标数据源已经能够解析的内容，都不应出现在这里。
 */

/**
 * Icons of file extensions, without the leading dot
 *
 * The icon set does not resolve these extensions, even though it ships a
 * matching icon, because a real VS Code installation resolves a single segment
 * extension with its own language contributions.
 *
 * 文件扩展名对应的图标，不包含前导点
 *
 * 图标集无法解析这些扩展名，因为它通过 VS Code 自身的语言贡献来解析单段扩展名，尽管它已经 自带对应的图标。
 */
export const extensions: IconMap = {
  // `.cjs` is not bridged, while `.mjs` is
  cjs: 'vscode-icons:file-type-js',
  erb: 'vscode-icons:file-type-erb',
  liquid: 'vscode-icons:file-type-liquid',
  njk: 'vscode-icons:file-type-nunjucks',
  postcss: 'vscode-icons:file-type-postcss',
  slim: 'vscode-icons:file-type-slim',
  styl: 'vscode-icons:file-type-light-stylus',
  stylus: 'vscode-icons:file-type-light-stylus',
  tpl: 'vscode-icons:file-type-smarty',
}

/**
 * Icons of file names
 *
 * 文件名对应的图标
 */
export const files: IconMap = {
  '.env.example': 'vscode-icons:file-type-dotenv',
  '.env.local': 'vscode-icons:file-type-dotenv',
}

/**
 * Icons of folder names
 *
 * 文件夹名称对应的图标
 */
export const folders: IconMap = {}
