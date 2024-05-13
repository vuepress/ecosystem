import './styles/vars.css'
import './styles/base.css'
import './styles/icons.css'
import './styles/utils.css'
import './styles/components/custom-block.css'
import './styles/components/vp-code.css'
import './styles/components/vp-code-group.css'
import './styles/components/vp-doc.css'
import './styles/components/vp-sponsor.css'
import './styles/compat.css'

import VPCodeGroup from '@theme/VPCodeGroup.vue'
import { hasGlobalComponent } from '@vuepress/helper/client'
import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'
import type { ClientConfig } from 'vuepress/client'
import Badge from './components/VPBadge.vue'
import { Content } from './components/VPMarkdownContent.js'
import { setupDarkMode, useScrollPromise } from './composables/index.js'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

export default defineClientConfig({
  enhance({ app, router }) {
    // Warning: provide onContentUpdated hook ⚠️⚠️⚠️
    // Maybe a better way to do it, Maybe rewrite it or remove it
    delete app._context.components.Content
    // eslint-disable-next-line vue/no-reserved-component-names
    app.component('Content', Content)
    if (!hasGlobalComponent('Badge')) app.component('Badge', Badge)
    if (!hasGlobalComponent('VPCodeGroup'))
      app.component('VPCodeGroup', VPCodeGroup)

    // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
    app.component('NavbarSearch', () => {
      const SearchComponent =
        app.component('Docsearch') || app.component('SearchBox')
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
  },

  layouts: {
    Layout,
    NotFound,
  },
}) as ClientConfig
