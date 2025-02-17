import { getFullLocaleConfig, getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { pwaLocaleInfo } from './locales.js'
import { PLUGIN_NAME } from './logger.js'
import type { PwaPluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const prepareClientConfigFile = (
  app: App,
  options: PwaPluginOptions,
): Promise<string> => {
  let configImport = ''
  const rootComponents: string[] = []

  if (options.showInstall) {
    configImport += `\
import { PwaInstall as _PwaInstall } from "${path.join(__dirname, '../client/components/PwaInstall.js')}";
`

    rootComponents.push('PwaInstall')
  }

  if (options.update === 'hint') {
    configImport += `\
import { PwaFoundPopup as _PwaFoundPopup } from "${
      options.foundComponent ||
      path.join(__dirname, '../client/components/PwaFoundPopup.js')
    }";
`

    rootComponents.push('PwaFoundPopup')
  } else if (options.update !== 'disable' && options.update !== 'force') {
    configImport += `\
import { PwaReadyPopup as _PwaReadyPopup } from "${
      options.readyComponent ||
      path.join(__dirname, '../client/components/PwaReadyPopup.js')
    }";
`

    rootComponents.push('PwaReadyPopup')
  }

  return app.writeTemp(
    `pwa/config.js`,
    `\
import { h }  from "vue";
import { defineClientConfig } from "vuepress/client";
import { setupPwa, setupViewPoint } from "${path.join(__dirname, '../client/composables/index.js')}";
${configImport}
import "${getModulePath('@vuepress/plugin-pwa/styles/vars.css', import.meta)}";

const locales = ${JSON.stringify(
      getFullLocaleConfig({
        app,
        name: PLUGIN_NAME,
        default: pwaLocaleInfo,
        config: options.locales,
      }),
    )};

export default defineClientConfig({
  setup: () => {
    setupPwa(${JSON.stringify(options.serviceWorkerFilename ?? 'service-worker.js')}, ${options.update === 'force'});
    setupViewPoint();
  },
  rootComponents: [
${rootComponents.map((item) => `    () => h(_${item}, { locales }),`).join('\n')}
  ],
});
`,
  )
}
