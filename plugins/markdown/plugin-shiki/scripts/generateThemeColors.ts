/**
 * Generate the base colors of the code blocks of every bundled Shiki theme
 *
 * Every theme carries its own background and foreground, so the colors are
 * derived from the theme instead of being hardcoded, and the text is kept above
 * the minimum contrast. The result is written to the styles of the package, so
 * that a site imports the colors of the theme it uses instead of them being
 * resolved at build time.
 *
 * Run it with:
 *
 * `pnpm --filter @vuepress/plugin-shiki style`
 *
 * The script runs after the bundle, as it writes into the output of the build.
 *
 * 生成每个内置 Shiki 主题中代码块的基础颜色
 *
 * 每个主题都自带背景与前景颜色，因此颜色由主题推导而不是硬编码，且文字会保持在最低对比度
 * 以上。结果会写入包的样式中，因此站点导入自己所用主题的颜色，而不是在构建时解析它们。
 *
 * 运行方式：
 *
 * `pnpm --filter @vuepress/plugin-shiki style`
 *
 * 该脚本在打包之后运行，因为它会写入构建的产物。
 */

import { formatHex } from 'culori'
import { bundledThemesInfo, createHighlighter } from 'shiki'
import { fs, path } from 'vuepress/utils'

import { getCodeThemeColorsCss, getThemeColors } from './themeColors.js'

const __dirname = import.meta.dirname

/**
 * Directory the styles of the themes are written to
 *
 * 主题样式写入的目录
 */
const OUTPUT_DIR = path.resolve(__dirname, '../dist/client/styles')

/**
 * Variants the colors of a theme are written as
 *
 * A theme is a complete palette, so the same colors are used in both modes, and
 * a site picks the variant matching the mode its theme is used for. The variant
 * without a mode applies to every mode, which is what a site with a single
 * theme uses.
 *
 * 主题颜色写入的变体
 *
 * 主题是一套完整的调色板，因此两种模式使用相同的颜色，站点会选择与其主题所用模式对应的 变体。不带模式的变体适用于所有模式，供使用单一主题的站点使用。
 */
const VARIANTS: { extension: string; selector: string }[] = [
  { extension: '', selector: ':root' },
  { extension: '.light', selector: "[data-theme='light']" },
  { extension: '.dark', selector: "[data-theme='dark']" },
]

const themeNames = bundledThemesInfo.map(({ id }) => id)

// a style named after the plugin would be overwritten by the styles of the
// themes, which would break the fallback colors
if (themeNames.includes('shiki')) throw new Error('A theme is named "shiki"')

const highlighter = await createHighlighter({ langs: [], themes: themeNames })
const resolved = themeNames.map((name) => {
  const theme = highlighter.getTheme(name)
  const colors = getThemeColors(theme)

  if (!colors) {
    throw new Error(
      `The base colors of the "${name}" theme can not be resolved, it may use a color notation the script does not support.`,
    )
  }

  // the text is raised only when the theme does not reach the minimum
  // contrast itself, and a translucent foreground is composited as well
  const adjusted = colors.text !== formatHex(theme.fg)

  return { adjusted, colors, name }
})

highlighter.dispose()

fs.ensureDirSync(OUTPUT_DIR)

await Promise.all(
  resolved.flatMap(({ colors, name }) =>
    VARIANTS.map(({ extension, selector }) =>
      fs.writeFile(
        path.resolve(OUTPUT_DIR, `${name}${extension}.css`),
        getCodeThemeColorsCss(selector, colors),
      ),
    ),
  ),
)

const adjusted = resolved.filter(({ adjusted: isAdjusted }) => isAdjusted)

console.log(
  `Generated the code block colors of ${resolved.length} themes (${resolved.length * VARIANTS.length} files).`,
)

if (adjusted.length > 0) {
  console.log(
    `These themes do not provide their own readable text color, so it was adjusted: ${adjusted
      .map(({ name }) => name)
      .join(', ')}.`,
  )
}
