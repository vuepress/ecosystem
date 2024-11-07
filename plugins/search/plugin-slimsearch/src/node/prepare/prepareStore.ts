import type { App } from 'vuepress/core'

import type { IDStore } from '../utils.js'

export const prepareStore = async (app: App, store: IDStore): Promise<void> => {
  await app.writeTemp(
    `search-pro/store.js`,
    `\
export const store = ${store.toJSON()};
`,
  )
}
