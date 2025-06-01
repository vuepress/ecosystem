import './styles/index.css'

import { hasGlobalComponent } from '@vuepress/helper/client'
import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'
import Badge from './components/VPBadge.vue'
import {
  setupDarkMode,
  setupSidebarData,
  useScrollPromise,
} from './composables/index.js'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

export default defineClientConfig({
  enhance({ app, router }) {
    if (!hasGlobalComponent('Badge')) app.component('Badge', Badge)

    // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
    app.component('NavbarSearch', () => {
      const SearchComponent =
        app.component('Docsearch') ?? app.component('SearchBox')
      if (SearchComponent) {
        return h(SearchComponent)
      }
      return null
    })

    // handle scrollBehavior with transition
    const scrollBehavior = router.options.scrollBehavior!
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait()
      return scrollBehavior(...args)
    }
  },

  setup() {
    setupDarkMode()
    setupSidebarData()
  },

  layouts: {
    Layout,
    NotFound,
  },
})
