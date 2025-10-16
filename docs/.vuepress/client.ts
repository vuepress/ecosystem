import { defineEChartsConfig } from '@vuepress/plugin-markdown-chart/client'
import { defineClientConfig } from 'vuepress/client'
import CommentPage from './layouts/CommentPage.vue'

defineEChartsConfig({
  setup: async () => {
    await import('echarts-wordcloud')
  },
})
export default defineClientConfig({
  layouts: {
    // We override the default layout to provide comment service
    CommentPage,
  },
})
