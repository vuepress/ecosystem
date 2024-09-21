import type { App } from 'vuepress/core'

import type { RevealJsTheme } from '../../shared/index.js'
import { CLIENT_FOLDER } from '../utils.js'

const REVEAL_THEME_CONFIG: [name: RevealJsTheme, fonts?: string[]][] = [
  ['auto'],
  ['beige', ['lato']],
  ['black'],
  ['blood', ['ubuntu']],
  ['league'],
  ['moon'],
  ['night', ['montserrat', 'open-sans']],
  ['serif'],
  ['simple', ['lato', 'news-cycle']],
  ['sky', ['open-sans', 'quicksand']],
  ['solarized', ['lato']],
  ['white'],
]

export const prepareRevealJsStyles = async (
  app: App,
  revealThemes: RevealJsTheme[],
): Promise<void> => {
  const fonts = new Set<string>(['league-gothic', 'source-sans-pro'])
  const themes = new Set<string>()

  revealThemes.forEach((theme) => {
    const config = REVEAL_THEME_CONFIG.find(([name]) => name === theme)

    if (config) {
      const [themeName, fontNames] = config

      themes.add(themeName)
      fontNames?.forEach((fontName) => fonts.add(fontName))
    }
  })

  await app.writeTemp(
    'revealjs/themes.js',
    `\
${Array.from(fonts)
  .map((name) => `import "${CLIENT_FOLDER}styles/fonts/${name}.css";`)
  .join('\n')}
${Array.from(themes)
  .map((name) => `import "${CLIENT_FOLDER}styles/themes/${name}.css";`)
  .join('\n')}
`,
  )
}
