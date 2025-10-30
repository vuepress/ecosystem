import type { DocSearchProps } from '@docsearch/react'
import type { PropType } from 'vue'
import { computed, defineComponent, h, onMounted, ref, watch } from 'vue'
import { useLang, useRouteLocale } from 'vuepress/client'
import type { DocSearchOptions } from '../../shared/index.js'
import {
  useDocSearchHotkeyListener,
  useDocSearchShim,
} from '../composables/index.js'
import { useDocSearchOptions } from '../helpers/index.js'
import {
  getIndices,
  getSearchButtonTemplate,
  pollToOpenDocSearch,
  preconnectToAlgolia,
} from '../utils/index.js'

export const DocSearch = defineComponent({
  name: 'DocSearch',

  props: {
    containerId: {
      type: String,
      default: 'docsearch-container',
    },
    options: {
      type: Object as PropType<DocSearchOptions>,
      default: () => ({}),
    },
  },

  setup(props) {
    const docSearchOptions = useDocSearchOptions()
    const docsearchShim = useDocSearchShim()
    const lang = useLang()
    const routeLocale = useRouteLocale()

    const hasInitialized = ref(false)
    const hasTriggered = ref(false)

    // resolve docsearch options for current locale
    const options = computed<DocSearchProps>(() => {
      const { locales = {}, ...rest } = props.options

      return {
        ...docSearchOptions.value,
        ...rest,
        ...locales[routeLocale.value],
      }
    })

    /**
     * Import docsearch js and initialize
     */
    const initialize = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return

      const { default: docsearch } = await import('@docsearch/js')
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const { indexName, indices, searchParameters, ...rest } = options.value

      docsearch({
        ...docsearchShim,
        ...rest,
        container: `#${props.containerId}`,
        indices: getIndices(
          { indices, indexName, searchParameters },
          lang.value,
        ),
      })
      // mark as initialized
      hasInitialized.value = true
    }

    /**
     * Trigger docsearch initialization and open it
     */
    const startDocsearch = (): void => {
      if (hasTriggered.value || hasInitialized.value) return
      // mark as triggered
      hasTriggered.value = true
      // initialize and open
      void initialize()
      pollToOpenDocSearch()
      // re-initialize when route locale changes
      watch(routeLocale, initialize)
    }

    // trigger when hotkey is pressed
    useDocSearchHotkeyListener(options, startDocsearch)

    // preconnect to algolia
    onMounted(() => {
      preconnectToAlgolia(options.value.appId)
    })

    return () => [
      h('div', {
        id: props.containerId,
        style: { display: hasInitialized.value ? 'block' : 'none' },
      }),
      hasInitialized.value
        ? null
        : h('div', {
            class: 'docsearch-placeholder',
            onClick: startDocsearch,
            innerHTML: getSearchButtonTemplate(
              options.value.translations?.button,
            ),
          }),
    ]
  },
})
