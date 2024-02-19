import type { App } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { PWAPluginOptions } from './options.js'

const __dirname = getDirname(import.meta.url)

export const prepareConfigFile = (
  app: App,
  options: PWAPluginOptions,
): Promise<string> => {
  let configImport = ''
  const rootComponents: string[] = []

  if (options.showInstall) {
    configImport += `\
import { PWAInstall as _PWAInstall } from "${path.join(__dirname, '../client/components/PWAInstall.js')}";
`

    rootComponents.push('PWAInstall')
  }

  if (options.update === 'hint') {
    configImport += `\
import { SWHintPopup as _SWHintPopup } from "${
      options.hintComponent ||
      path.join(__dirname, '../client/components/SWHintPopup.js')
    }";
`

    rootComponents.push('SWHintPopup')
  } else if (options.update !== 'disable' && options.update !== 'force') {
    configImport += `\
import { SWUpdatePopup as _SWUpdatePopup } from "${
      options.updateComponent ||
      path.join(__dirname, '../client/components/SWUpdatePopup.js')
    }";
`

    rootComponents.push('SWUpdatePopup')
  }

  return app.writeTemp(
    `pwa/config.js`,
    `\
import { h }  from "vue";
import { defineClientConfig } from "vuepress/client";
import { setupPWA } from "${path.join(__dirname, '../client/composables/setupPWA.js')}";
${configImport}
import "${path.join(__dirname, '../client/styles/vars.css')}";

const locales = PWA_LOCALES;

${rootComponents.map((item) => `const ${item} = () => h(_${item}, { locales })`).join('\n')}

export default defineClientConfig({
  setup: () => {
    setupPWA(SW_PATH, SW_FORCE_UPDATE);
  },
  rootComponents: [
${rootComponents.map((item) => `    ${item},`).join('\n')}
  ],
});
`,
  )
}
