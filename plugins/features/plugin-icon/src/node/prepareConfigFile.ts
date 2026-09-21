import { ensureEndingSlash, getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { path } from 'vuepress/utils'

import type { IconType } from '../shared/index.js'
import { isFontAwesomeAssets } from './getAssetsType.js'
import { getIconLinks } from './getIconLinks.js'
import { getIconPrefix } from './getIconPrefix.js'
import type { IconPluginOptions } from './options.js'
import { logger } from './utils.js'

const __dirname = import.meta.dirname

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

export const prepareConfigFile = (
  app: App,
  { assets, fontawesome, prefix, component = 'VPIcon' }: IconPluginOptions,
  iconType: IconType,
): Promise<string> => {
  const offline = Boolean(fontawesome)
  const linksInfo = getIconLinks(assets, offline)
  const iconPrefix = getIconPrefix(iconType, prefix)

  if (offline) {
    // the offline mode only renders locally bundled FontAwesome icons, other
    // icons would silently disappear
    if (assets !== undefined && !isFontAwesomeAssets(assets)) {
      logger.warn(
        'The `assets` option is ignored, as the offline mode only bundles FontAwesome icons.',
      )
    }

    if (iconType !== 'fontawesome') {
      logger.warn(
        'The `type` option is ignored, as the offline mode only bundles FontAwesome icons.',
      )
    }
  }

  return app.writeTemp(
    `icon/config.js`,
    `\
import { hasGlobalComponent } from "${getModulePath(
      '@vuepress/helper/client',
      import.meta,
    )}";
${
  linksInfo.some(({ type }) => type === 'script')
    ? `\
import { useScriptTag } from "${getModulePath('@vueuse/core', import.meta)}";
`
    : ''
}\
${
  linksInfo.some(({ type }) => type === 'style')
    ? `\
import { useStyleTag } from "${getModulePath('@vueuse/core', import.meta)}";
`
    : ''
}\
${offline ? `import { setupFontAwesome } from "@temp/icon/fontawesome.js";\n` : ''}\
import { h } from "vue";
import { VPIcon } from "${CLIENT_FOLDER}index.js"

export default {
  enhance: ({ app }) => {
${
  offline
    ? `\
    setupFontAwesome();
`
    : ''
}\
${
  component
    ? `\
    if(!hasGlobalComponent("${component}")) {
      app.component(
        "${component}",
        (props) =>
          h(VPIcon, {
            type: "${iconType}",
            prefix: "${iconPrefix}",
            ...props,
          })
      )
    }
`
    : ''
}\
  },
  setup: () => {
${linksInfo.map(({ content }) => `    ${content}`).join('\n')}
  },
}
`,
  )
}
