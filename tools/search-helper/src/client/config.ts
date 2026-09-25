import { defineClientConfig } from 'vuepress/client'
import type { ClientConfig } from 'vuepress/client'

import SearchBox from './components/SearchBox.js'
import SearchModal from './components/SearchModal.js'
import type { SearchClientConfig } from './define.js'
import { setSearchClientConfig } from './define.js'
import { injectSearchConfig } from './helpers/index.js'

/**
 * Create the client config of a search plugin.
 *
 * The config injects the search options into the app and registers the search
 * box component and the search modal.
 *
 * 创建搜索插件的客户端配置。
 *
 * 该配置会将搜索选项注入应用，并注册搜索框组件与搜索弹窗。
 *
 * @example
 *   import { createSearchClientConfig } from '@vuepress/search-helper/client'
 *
 *   export default createSearchClientConfig({
 *     options: __ORAMA_OPTIONS__,
 *     locales: __ORAMA_LOCALES__,
 *     customFieldConfig: __ORAMA_CUSTOM_FIELDS__,
 *     store,
 *     devWorker: new URL('worker/dev.js', import.meta.url),
 *   })
 *
 * @param config - Config of the search client 搜索客户端的配置
 * @returns Client config 客户端配置
 */
export const createSearchClientConfig = (
  config: SearchClientConfig,
): ClientConfig => {
  setSearchClientConfig(config)

  return defineClientConfig({
    enhance({ app }) {
      injectSearchConfig(app)
      app.component('SearchBox', SearchBox)
    },
    rootComponents: [SearchModal],
  })
}
