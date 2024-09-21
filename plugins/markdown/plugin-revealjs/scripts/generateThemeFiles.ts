import { compileStringAsync } from 'sass-embedded'
import { fs, getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

const styleDir = path.resolve(__dirname, '../src/client/styles')
const themeDir = path.resolve(styleDir, 'themes')
const outputDir = path.resolve(__dirname, '../lib/client/styles')

const themeFiles = fs.readdirSync(themeDir)

fs.ensureDirSync(outputDir)

await Promise.all(
  themeFiles.map(async (file) => {
    if (fs.statSync(file).isDirectory()) return

    const filename = path.basename(file, '.scss')

    compileStringAsync(themeContent, {
      loadPaths: [styleDir],
      style: 'compressed',
    }).then(({ css }) => {
      fs.writeFileSync(path.resolve(outputDir, `${filename}.css`), css)
    })
  }),
)
