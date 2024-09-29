import { getRealPath } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type { PwaPluginOptions } from './options.js'

const CLIENT_ENTRY = getRealPath('@vuepress/plugin-pwa/client', import.meta.url)

export const prepareConfigFile = (
  app: App,
  options: PwaPluginOptions,
): Promise<string> => {
  let configImport = ''
  const rootComponents: string[] = []

  if (options.showInstall) {
    configImport += `\
import { PwaInstall as _PwaInstall } from "${CLIENT_ENTRY}";
`

    rootComponents.push('PwaInstall')
  }

  if (options.update === 'hint') {
    configImport += `\
import { PwaFoundPopup as _PwaFoundPopup } from "${
      options.foundComponent || CLIENT_ENTRY
    }";
`

    rootComponents.push('PwaFoundPopup')
  } else if (options.update !== 'disable' && options.update !== 'force') {
    configImport += `\
import { PwaReadyPopup as _PwaReadyPopup } from "${
      options.readyComponent || CLIENT_ENTRY
    }";
`

    rootComponents.push('PwaReadyPopup')
  }

  return app.writeTemp(
    `pwa/config.js`,
    `\
import { h }  from "vue";
import { defineClientConfig } from "vuepress/client";
import { setupPwa, setupViewPoint } from "${CLIENT_ENTRY}";
${configImport}
import "${getRealPath('@vuepress/plugin-pwa/styles/vars.css', import.meta.url)}";

const locales = __PWA_LOCALES__;

export default defineClientConfig({
  setup: () => {
    setupPwa(__SW_PATH__, __SW_FORCE_UPDATE__);
    setupViewPoint();
  },
  rootComponents: [
${rootComponents.map((item) => `    () => h(_${item}, { locales }),`).join('\n')}
  ],
});
`,
  )
}
