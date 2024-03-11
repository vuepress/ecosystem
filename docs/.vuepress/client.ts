import { defineGiscusConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'
import type { ClientConfig } from 'vuepress/client'
import CommentPage from './layouts/CommentPage.vue'

defineGiscusConfig({
  repo: 'vuepress-theme-hope/giscus-discussions',
  repoId: 'R_kgDOG_Pt2A',
  category: 'Announcements',
  categoryId: 'DIC_kwDOG_Pt2M4COD69',
})

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default defineClientConfig({
  layouts: {
    // We override the default layout to provide comment service
    CommentPage,
  },
}) as ClientConfig
