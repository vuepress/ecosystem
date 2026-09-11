import { entries, getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import {
  AVAILABLE_COMPONENTS,
  CLIENT_FOLDER,
  COMPONENT_PKGS,
  EMBED_COMPONENTS,
  VIDEOJS_PROVIDER_COMPONENTS,
} from './constants.js'
import { logger } from './logger.js'
import type { MediaPluginOptions } from './options.js'
import { isInstalled } from './utils.js'

export const prepareClientConfigFile = (
  app: App,
  options: MediaPluginOptions,
): Promise<string> => {
  const imports: string[] = []
  let enhance = ''
  const setups: string[] = []

  // Every option enables its component through one of these three groups
  const enabledComponents = [
    ...entries(AVAILABLE_COMPONENTS)
      .filter(([key]) => options[key as keyof MediaPluginOptions])
      .map(([, component]) => component),
    ...(options.embeds ?? []).map((name) => EMBED_COMPONENTS[name]),
    ...(options.videojsProviders ?? []).map(
      (name) => VIDEOJS_PROVIDER_COMPONENTS[name],
    ),
  ]

  for (const component of new Set(enabledComponents)) {
    const missing = COMPONENT_PKGS[component]?.filter(
      (pkg) => !isInstalled(pkg),
    )

    if (missing?.length) {
      logger.warn(
        `Component ${component} is skipped, because ${missing.join(', ')} is not installed.`,
      )
      continue
    }

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
