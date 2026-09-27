import { defineCopyCodeConfig } from '@vuepress/plugin-copy-code/client'
import { defineClientConfig } from 'vuepress/client'

import ThemeData from './components/ThemeData.vue'
import Article from './layouts/Article.vue'
import Category from './layouts/Category.vue'
import Tag from './layouts/Tag.vue'
import Timeline from './layouts/Timeline.vue'

// Only used to test the client config of `@vuepress/plugin-copy-code`,
// see `e2e/tests/plugin-copy-code/copy-code.spec.ts`
defineCopyCodeConfig({
  transform: (preElement) => {
    if (preElement.textContent?.includes('e2e-client-config'))
      preElement.innerHTML += '\nTransformed by client config'
  },
})

export default defineClientConfig({
  layouts: {
    Article,
    Category,
    Tag,
    Timeline,
  },
  rootComponents: [ThemeData],
})
