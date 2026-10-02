import { hasGlobalComponent } from '@vuepress/helper/client'
import type { ClientConfig } from 'vuepress/client'
import { defineClientConfig } from 'vuepress/client'

import { setupDarkMode } from '@theme/useDarkMode'
import { setupHeaders } from '@theme/useHeaders'
import { useScrollPromise } from '@theme/useScrollPromise'
import { setupSidebarItems } from '@theme/useSidebarItems'

import { Badge } from './components/global/index.js'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

import '@vuepress/helper/colors.css'
import '@vuepress/helper/normalize.css'
import './styles/index.scss'

export const clientConfig: ClientConfig = defineClientConfig({
  enhance({ app, router }) {
    if (!hasGlobalComponent('Badge')) app.component('Badge', Badge)

    // handle scrollBehavior with transition
    const scrollBehavior = router.options.scrollBehavior!

    // scrollBehavior is a bit hard to typed here
    // oxlint-disable-next-line typescript/explicit-function-return-type
    router.options.scrollBehavior = async (...args) => {
      const [to, from, savedPosition] = args

      await useScrollPromise().wait()

      // The default `{ el }` behavior computes the scroll position on its own
      // and ignores `scroll-margin-top`, which is used to keep anchor targets
      // clear of the navbar. Scroll with `scrollIntoView` instead, and defer it
      // to the next frame so that the target of a hash link pointing to another
      // page has been rendered.
      if (!savedPosition && to.hash) {
        const id = decodeURIComponent(to.hash).slice(1)

        requestAnimationFrame(() => {
          // `getElementById` is used instead of `querySelector`, as an id may
          // contain characters that are invalid in a CSS selector, like the
          // space in catalog item ids (`AI Plugins`) or the `:` in footnote
          // ids (`footnote-ref2:1`).
          // oxlint-disable-next-line unicorn/prefer-query-selector
          document.getElementById(id)?.scrollIntoView({ block: 'start' })
        })

        return false
      }

      return scrollBehavior(to, from, savedPosition)
    }
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
