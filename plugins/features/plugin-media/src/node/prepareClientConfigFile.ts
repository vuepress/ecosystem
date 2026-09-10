import { entries, getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import type { MediaPluginOptions } from './options.js'
import {
  AVAILABLE_COMPONENTS,
  CLIENT_FOLDER,
  COMPONENT_PKGS,
  isInstalled,
} from './utils.js'

export const prepareClientConfigFile = (
  app: App,
  options: MediaPluginOptions,
): Promise<string> => {
  const imports: string[] = []
  let enhance = ''
  const setups: string[] = []

  entries(AVAILABLE_COMPONENTS).forEach(([key, component]) => {
    if (
      options[key as keyof MediaPluginOptions] &&
      (!COMPONENT_PKGS[key] ||
        COMPONENT_PKGS[key].every((pkg) => isInstalled(pkg)))
    ) {
      imports.push(
        `import { ${component} } from "${CLIENT_FOLDER}components/${component}.js";`,
      )

      enhance += `\
if(!hasGlobalComponent("${component}")) app.component("${component}", ${component});
`
    }
  })

  return app.writeTemp(
    `media/config.js`,
    `\
import { hasGlobalComponent } from "${getModulePath('@vuepress/helper/client', import.meta)}";
${imports.join('\n')}

import "${getModulePath('@vuepress/helper/sr-only.css', import.meta)}";

export default {
  enhance: ({ app }) => {
${enhance
  .split('\n')
  .map((item) => `    ${item}`)
  .join('\n')}
  },
  setup: () => {
${setups.map((item) => `    ${item}`).join('\n')}
  },
};
`,
  )
}
