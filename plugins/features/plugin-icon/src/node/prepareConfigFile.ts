import { ensureEndingSlash } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { path } from 'vuepress/utils'

import type { IconType } from '../shared/index.js'
import { getIconLinks } from './getIconLinks.js'
import { getIconPrefix } from './getIconPrefix.js'
import { resolveOffline } from './offline.js'
import type { IconPluginOptions } from './options.js'
import { resolveModule } from './utils.js'

const __dirname = import.meta.dirname

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

export const prepareConfigFile = (
  app: App,
  { assets, offline, prefix, component = 'VPIcon' }: IconPluginOptions,
  iconType: IconType,
): Promise<string> => {
  const offlineType = offline
    ? resolveOffline(iconType, offline).type
    : undefined
  const linksInfo = getIconLinks(assets, offlineType)
  const iconPrefix = getIconPrefix(iconType, prefix)

  return app.writeTemp(
    `icon/config.js`,
    `\
import { hasGlobalComponent } from "${resolveModule(
      '@vuepress/helper/client',
    )}";
${
  linksInfo.some(({ type }) => type === 'script')
    ? `\
import { useScriptTag } from "${resolveModule('@vueuse/core')}";
`
    : ''
}\
${
  linksInfo.some(({ type }) => type === 'style')
    ? `\
import { useStyleTag } from "${resolveModule('@vueuse/core')}";
`
    : ''
}\
${offlineType === 'fontawesome' ? `import { setupFontAwesome } from "@temp/icon/fontawesome.js";\n` : ''}\
${offlineType === 'iconify' ? `import { setupIconify } from "@temp/icon/iconify.js";\n` : ''}\
import { h } from "vue";
import { VPIcon } from "${CLIENT_FOLDER}index.js"

export default {
  enhance: ({ app }) => {
${
  offlineType === 'fontawesome'
    ? `\
    setupFontAwesome();
`
    : ''
}\
${
  offlineType === 'iconify'
    ? `\
    setupIconify();
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
