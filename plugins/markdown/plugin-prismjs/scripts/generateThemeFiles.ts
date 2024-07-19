// eslint-disable-next-line import/no-extraneous-dependencies
import { compileString } from 'sass'
import { fs, getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

const styleDir = path.resolve(__dirname, '../src/client/styles')
const themeDir = path.resolve(styleDir, 'themes')
const outputDir = path.resolve(__dirname, '../lib/client/styles')

const themeFiles = fs.readdirSync(themeDir)

fs.ensureDirSync(outputDir)

themeFiles.forEach((file) => {
  const filename = path.basename(file, '.scss')
  const lightThemeContent = `
@use 'mixins';
@use 'themes/${filename}';

:root {
  @include mixins.color($code-color: ${filename}.$code-color, $code-bg-color: ${filename}.$code-bg-color);
}

@include ${filename}.style;
`

  const darkThemeContent = `
@use 'mixins';
@use 'themes/${filename}';

[data-theme='dark'] {
  @include mixins.color($code-color: ${filename}.$code-color, $code-bg-color: ${filename}.$code-bg-color);
  @include ${filename}.style;
}
`

  const lightThemeCss = compileString(lightThemeContent, {
    loadPaths: [styleDir],
  }).css

  const darkThemeCss = compileString(darkThemeContent, {
    loadPaths: [styleDir],
  }).css

  fs.writeFileSync(path.resolve(outputDir, `${filename}.css`), lightThemeCss)

  fs.writeFileSync(
    path.resolve(outputDir, `${filename}.dark.css`),
    darkThemeCss,
  )
})
