import type { PropType } from 'vue'
import { defineComponent, h, onMounted } from 'vue'

import type { MeiliSearchDocSearchOptions } from '../../shared/index.js'

import 'meilisearch-docsearch/css'

export const MeiliSearch = defineComponent({
  name: 'MeiliSearch',

  props: {
    options: {
      type: Object as PropType<MeiliSearchDocSearchOptions>,
      required: true,
    },
  },

  setup(props) {
    onMounted(async () => {
      const { docsearch } = await import('meilisearch-docsearch')

      docsearch({
        container: '#docsearch',
        ...props.options,
      })
    })

    return () => h('div', { id: 'docsearch' })
  },
})
