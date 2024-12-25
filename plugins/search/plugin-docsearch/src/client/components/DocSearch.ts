import type { SearchParamsObject } from 'algoliasearch'
import type { PropType } from 'vue'
import { computed, defineComponent, h, onMounted, ref, watch } from 'vue'
import { usePageLang, useRouteLocale } from 'vuepress/client'
import type { DocSearchOptions } from '../../shared/index.js'
import {
  useDocSearchHotkeyListener,
  useDocSearchShim,
} from '../composables/index.js'
import { useDocSearchOptions } from '../helpers/index.js'
import {
  getFacetFilters,
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
    const lang = usePageLang()
    const routeLocale = useRouteLocale()

    const hasInitialized = ref(false)
    const hasTriggered = ref(false)

    // resolve docsearch options for current locale
    const options = computed(() => {
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
      const { default: docsearch } = await import('@docsearch/js')

      const { searchParameters } = options.value

      docsearch({
        ...docsearchShim,
        ...options.value,
        container: `#${props.containerId}`,
        searchParameters: {
          ...searchParameters,
          facetFilters: getFacetFilters(
            lang.value,
            (searchParameters as SearchParamsObject | undefined)?.facetFilters,
          ),
        },
      })
      // mark as initialized
      hasInitialized.value = true
    }

    /**
     * Trigger docsearch initialization and open it
     */
    const trigger = (): void => {
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
    useDocSearchHotkeyListener(trigger)

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
            onClick: trigger,
            innerHTML: getSearchButtonTemplate(
              options.value.translations?.button,
            ),
          }),
    ]
  },
})
