import { compileStringAsync } from 'sass-embedded'
import { fs, getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

const styleDir = path.resolve(__dirname, '../src/client/styles')
const themeDir = path.resolve(styleDir, 'themes')
const outputDir = path.resolve(__dirname, '../lib/client/styles')

const themeFiles = fs.readdirSync(themeDir)

fs.ensureDirSync(outputDir)

await Promise.all(
  themeFiles.map(async (file) => {
    const filename = path.basename(file, '.scss')
    const themeContent = `
@use 'mixins';
@use 'themes/${filename}';

:root {
  @include mixins.color($code-text-color: ${filename}.$code-text-color, $code-bg-color: ${filename}.$code-bg-color);
}

@include ${filename}.style;
`

    const lightThemeContent = `
@use 'mixins';
@use 'themes/${filename}';

[data-theme='light'] {
  @include mixins.color($code-text-color: ${filename}.$code-text-color, $code-bg-color: ${filename}.$code-bg-color);
  @include ${filename}.style;
}
`

    const darkThemeContent = `
@use 'mixins';
@use 'themes/${filename}';

[data-theme='dark'] {
  @include mixins.color($code-text-color: ${filename}.$code-text-color, $code-bg-color: ${filename}.$code-bg-color);
  @include ${filename}.style;
}
`

    await Promise.all([
      compileStringAsync(themeContent, {
        loadPaths: [styleDir],
        style: 'compressed',
      }).then(({ css }) => {
        fs.writeFileSync(path.resolve(outputDir, `${filename}.css`), css)
      }),
      compileStringAsync(lightThemeContent, {
        loadPaths: [styleDir],
        style: 'compressed',
      }).then(({ css }) => {
        fs.writeFileSync(path.resolve(outputDir, `${filename}.light.css`), css)
      }),
      compileStringAsync(darkThemeContent, {
        loadPaths: [styleDir],
        style: 'compressed',
      }).then(({ css }) => {
        fs.writeFileSync(path.resolve(outputDir, `${filename}.dark.css`), css)
      }),
    ])
  }),
)
