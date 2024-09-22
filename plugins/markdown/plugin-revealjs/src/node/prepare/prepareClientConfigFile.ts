import { getRealPath } from '@vuepress/helper'
import type { App } from 'vuepress'
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
export const prepareClientConfigFile = async (
  app: App,
  revealThemes: RevealJsTheme[],
  layout: string | false,
): Promise<string> => {
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

  return app.writeTemp(
    'revealjs/config.js',
    `\
import RevealJs from "${CLIENT_FOLDER}components/RevealJs.js";
import { injectRevealJsConfig } from "${CLIENT_FOLDER}helpers/index.js";
${layout ? `import Layout from "${CLIENT_FOLDER}layouts/SlidePage.js";\n` : ''}\

import "${getRealPath('reveal.js/dist/reveal.css', import.meta.url)}";
import "${CLIENT_FOLDER}/styles/base.css";
import "${CLIENT_FOLDER}/styles/vars.css";
${Array.from(fonts)
  .map((name) => `import "${CLIENT_FOLDER}styles/fonts/${name}.css";`)
  .join('\n')}
${Array.from(themes)
  .map((name) => `import "${CLIENT_FOLDER}styles/themes/${name}.css";`)
  .join('\n')}

export default {
  enhance: ({ app }) => {
    injectRevealJsConfig(app)
    app.component("RevealJs", RevealJs)
  },
${layout ? `  layouts: { "${layout}": Layout },\n` : ''}\
};
`,
  )
}
