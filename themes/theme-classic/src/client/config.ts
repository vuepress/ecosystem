import { hasGlobalComponent } from '@vuepress/helper/client'
import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import { setupDarkMode } from '@theme/useDarkMode'
import { setupHeaders } from '@theme/useHeaders'
import { setupSidebarItems } from '@theme/useSidebarItems'

import { Badge } from './components/global/index.js'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

import '@vuepress/helper/colors.css'
import '@vuepress/helper/normalize.css'
import './styles/index.scss'

export const clientConfig: ClientConfig = defineClientConfig({
  enhance({ app }) {
    if (!hasGlobalComponent('Badge')) app.component('Badge', Badge)
  },

  setup() {
    setupDarkMode()
    setupHeaders()
    setupSidebarItems()
  },

  layouts: {
    Layout,
    NotFound,
  },
})

export default clientConfig
