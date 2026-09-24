import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import { CLIENT_FOLDER } from './constants.js'

export const prepareClientConfigFile = (
  app: App,
  components: string[],
): Promise<string> => {
  const imports: string[] = []
  let enhance = ''
  const setups: string[] = []

  for (const component of components) {
    imports.push(
      `import { ${component} } from "${CLIENT_FOLDER}components/${component}.js";`,
    )

    enhance += `\
if(!hasGlobalComponent("${component}")) app.component("${component}", ${component});
`
  }

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
