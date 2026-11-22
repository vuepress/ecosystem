import { defineEChartsConfig } from '@vuepress/plugin-markdown-chart/client'
import { defineClientConfig } from 'vuepress/client'

import './styles/index.scss'

import HomeSections from './components/HomeSections.vue'
import CommentPage from './layouts/CommentPage.vue'

defineEChartsConfig({
  setup: async () => {
    await import('echarts-wordcloud')
  },
})

export default defineClientConfig({
  enhance({ app }) {
    app.component('HomeSections', HomeSections)
  },
  layouts: {
    // We override the default layout to provide comment service
    CommentPage,
  },
})
