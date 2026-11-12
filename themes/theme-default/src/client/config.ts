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
    // oxlint-disable-next-line typescript/no-deprecated
    const { scrollBehavior } = router.options

    type RouterScrollBehavior = NonNullable<
      // oxlint-disable-next-line typescript/no-deprecated
      typeof router.options.scrollBehavior
    >

    // VuePress 2.0.0-rc.32+ no longer provides a scrollBehavior and restores
    // the scroll position right after the route changes, before the page
    // transition has inserted the new page. Restore it after the transition
    // ourselves so hash targets exist when they are scrolled into view.
    // oxlint-disable-next-line unicorn/consistent-function-scoping
    const transitionScrollBehavior: RouterScrollBehavior = async (
      to,
      _from,
      savedPosition,
    ) => {
      await useScrollPromise().wait()

      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash }
      return { top: 0 }
    }

    // scrollBehavior is a bit hard to typed here
    // oxlint-disable-next-line typescript/no-deprecated
    router.options.scrollBehavior = scrollBehavior
      ? async (...args): Promise<Awaited<ReturnType<RouterScrollBehavior>>> => {
          await useScrollPromise().wait()
          return scrollBehavior(...args)
        }
      : transitionScrollBehavior
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
