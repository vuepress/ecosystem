import { ensureEndingSlash, getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

import type { IconType } from '../shared/index.js'
import { getIconLinks } from './getIconLinks.js'
import { getIconPrefix } from './getIconPrefix.js'
import type { IconPluginOptions } from './options.js'

const __dirname = getDirname(import.meta.url)

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

export const prepareConfigFile = (
  app: App,
  { assets, prefix, component = 'VPIcon' }: IconPluginOptions,
  iconType: IconType,
): Promise<string> => {
  const linksInfo = getIconLinks(assets)
  const iconPrefix = getIconPrefix(iconType, prefix)

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
import { useScriptTag } from "${getModulePath('@vueuse/core/index.mjs', import.meta)}";
`
    : ''
}\
${
  linksInfo.some(({ type }) => type === 'style')
    ? `\
import { useStyleTag } from "${getModulePath('@vueuse/core/index.mjs', import.meta)}";
`
    : ''
}\
import { h } from "vue";
import { VPIcon } from "${CLIENT_FOLDER}index.js"

export default {
  enhance: ({ app }) => {
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
