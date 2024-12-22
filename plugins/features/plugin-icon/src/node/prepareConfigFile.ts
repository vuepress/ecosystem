import { ensureEndingSlash, getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

import type { IconType } from '../shared/index.js'
import type { IconAsset } from './options.js'
import { getIconLinks } from './utils.js'

const __dirname = getDirname(import.meta.url)

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

export const prepareConfigFile = (
  app: App,
  iconType: IconType,
  iconPrefix: string,
  assets: IconAsset,
): Promise<string> => {
  const linksInfo = getIconLinks(assets)

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
import { VPIcon } from "${CLIENT_FOLDER}index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            prefix: "${iconPrefix}",
            type: "${iconType}",
            ...props,
          })
      )
    }
  },
  setup: () => {
${linksInfo.map(({ content }) => `    ${content}`).join('\n')}
  },
}
`,
  )
}
