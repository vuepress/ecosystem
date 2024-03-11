import { defineGiscusConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'
import type { ClientConfig } from 'vuepress/client'
import CommentPage from './layouts/CommentPage.vue'

defineGiscusConfig({
  repo: 'vuepress/ecosystem',
  repoId: 'R_kgDOKPxScA',
  category: 'Announcements',
  categoryId: 'DIC_kwDOKPxScM4CbWy7',
})

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default defineClientConfig({
  layouts: {
    // We override the default layout to provide comment service
    CommentPage,
  },
}) as ClientConfig
