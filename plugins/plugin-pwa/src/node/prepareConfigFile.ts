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
import { PWAFoundPopup as _PWAFoundPopup } from "${
      options.foundComponent ||
      path.join(__dirname, '../client/components/PWAFoundPopup.js')
    }";
`

    rootComponents.push('PWAFoundPopup')
  } else if (options.update !== 'disable' && options.update !== 'force') {
    configImport += `\
import { PWAReadyPopup as _PWAReadyPopup } from "${
      options.readyComponent ||
      path.join(__dirname, '../client/components/PWAReadyPopup.js')
    }";
`

    rootComponents.push('PWAReadyPopup')
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
