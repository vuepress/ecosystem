import type { App } from 'vuepress'
import { CLIENT_FOLDER } from './utils.js'

export const prepareClientConfigFile = async (
  app: App,
  defaultColor = true,
): Promise<string> => {
  return await app.writeTemp(
    'internal/copy-code/config.js',
    `import { useCopyCode } from '${CLIENT_FOLDER}composables/index.js'
${
  defaultColor
    ? `import '${CLIENT_FOLDER}styles/vars.css'
import '${CLIENT_FOLDER}styles/copy-code.css'`
    : ''
}

export default {
  setup: () => {
    useCopyCode({
      selector: __CC_SELECTOR__,
      duration: __CC_DURATION__,
    })
  },
}
`,
  )
}
