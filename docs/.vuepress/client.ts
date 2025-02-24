import { defineClientConfig } from 'vuepress/client'
import CommentPage from './layouts/CommentPage.vue'

export default defineClientConfig({
  layouts: {
    // We override the default layout to provide comment service
    CommentPage,
  },
})
