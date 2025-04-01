import type { PropType } from 'vue'
import { defineComponent, h, onMounted, ref } from 'vue'

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
    const hasInitialized = ref(false)

    const initialize = async (): Promise<void> => {
      const { docsearch } = await import('meilisearch-docsearch')

      docsearch({
        container: '#docsearch',
        ...props.options,
      })

      hasInitialized.value = true
    }

    onMounted(() => {
      void initialize()
    })

    return () => [
      h('div', {
        id: 'docsearch',
        style: { display: hasInitialized.value ? 'block' : 'none' },
      }),
      hasInitialized.value
        ? null
        : h('div', {
            innerHTML:
              '<button type="button" class="docsearch-btn" aria-label="Search"><span class="docsearch-btn-icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="docsearch-modal-btn-icon"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"></path></svg></span><span class="docsearch-btn-placeholder"> Search<!----> </span><span class="docsearch-btn-keys"><kbd class="docsearch-btn-key">Ctrl</kbd><kbd class="docsearch-btn-key">K</kbd></span></button>',
          }),
    ]
  },
})
