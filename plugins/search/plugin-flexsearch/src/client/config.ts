import { createSearchClientConfig } from '@vuepress/search-helper/client'

import { searchConfig } from './define.js'

export default createSearchClientConfig(searchConfig)
