import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'
import type { RevealJsTheme } from '../../shared/index.js'
import { PLUGIN_NAME } from '../utils.js'

const CLIENT_ENTRY = getModulePath(`${PLUGIN_NAME}/client`, import.meta)

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
import { RevealJs, injectRevealJsConfig } from "${CLIENT_ENTRY}";
${layout ? `import { SlidePage } from "${getModulePath(`${PLUGIN_NAME}/layouts`, import.meta)}";\n` : ''}\

import "${getModulePath('reveal.js/dist/reveal.css', import.meta)}";
import "${getModulePath(`${PLUGIN_NAME}/styles/base.css`, import.meta)}";
import "${getModulePath(`${PLUGIN_NAME}/styles/vars.css`, import.meta)}";
${Array.from(fonts)
  .map(
    (name) =>
      `import "${getModulePath(`${PLUGIN_NAME}/styles/fonts/${name}.css`, import.meta)}";`,
  )
  .join('\n')}
${Array.from(themes)
  .map(
    (name) =>
      `import "${getModulePath(`${PLUGIN_NAME}/styles/themes/${name}.css`, import.meta)}";`,
  )
  .join('\n')}

export default {
  enhance: ({ app }) => {
    injectRevealJsConfig(app)
    app.component("RevealJs", RevealJs)
  },
${layout ? `  layouts: { "${layout}": SlidePage },\n` : ''}\
};
`,
  )
}
