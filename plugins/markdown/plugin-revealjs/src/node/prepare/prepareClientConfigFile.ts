import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress'

import type { RevealJsTheme } from '../../shared/index.js'
import { PLUGIN_NAME } from '../utils.js'

const resolve = (module: string): string => getModulePath(module, import.meta)

const CLIENT_ENTRY = resolve(`${PLUGIN_NAME}/client`)

const REVEAL_THEME_CONFIG: [name: RevealJsTheme, fonts?: string[]][] = [
  ['auto'],
  ['beige', ['lato']],
  ['black'],
  ['black-contrast'],
  ['blood', ['ubuntu']],
  ['dracula'],
  ['league'],
  ['moon'],
  ['night', ['montserrat', 'open-sans']],
  ['serif'],
  ['simple', ['lato', 'news-cycle']],
  ['sky', ['open-sans', 'quicksand']],
  ['solarized', ['lato']],
  ['white'],
  ['white-contrast'],
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
      fontNames?.forEach((fontName) => {
        fonts.add(fontName)
      })
    }
  })

  return app.writeTemp(
    'revealjs/config.js',
    `\
import { RevealJs, injectRevealJsConfig } from "${CLIENT_ENTRY}";
${layout ? `import { SlidePage } from "${resolve(`${PLUGIN_NAME}/layouts`)}";\n` : ''}\

import "${resolve('reveal.js/reveal.css')}";
import "${resolve(`${PLUGIN_NAME}/styles/vars.css`)}";
import "${resolve(`${PLUGIN_NAME}/styles/themes/base.css`)}";
${Array.from(
  fonts,
  (name) => `import "${resolve(`${PLUGIN_NAME}/styles/fonts/${name}.css`)}";`,
)

  .join('\n')}
${Array.from(
  themes,
  (name) => `import "${resolve(`${PLUGIN_NAME}/styles/themes/${name}.css`)}";`,
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
