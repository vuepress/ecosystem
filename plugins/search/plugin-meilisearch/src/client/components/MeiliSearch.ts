import { useLocaleConfig } from '@vuepress/helper/client'
import type { PropType } from 'vue'
import { computed, defineComponent, h, onMounted, ref } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import type { LocaleConfig } from 'vuepress/shared'

import type {
  MeiliSearchLocaleData,
  MeiliSearchOptions,
} from '../../shared/index.js'

import 'meilisearch-docsearch/css'
import { getSearchButtonTemplate } from '../utils/getSearchButtonTemplate.js'

export const MeiliSearch = defineComponent({
  name: 'MeiliSearch',

  props: {
    options: {
      type: Object as PropType<MeiliSearchOptions>,
      required: true,
    },

    locales: {
      type: Object as PropType<LocaleConfig<MeiliSearchLocaleData>>,
      default: () => ({}),
    },
  },

  setup(props) {
    const locale = useLocaleConfig(props.locales)
    const routeLocale = useRouteLocale()

    const meiliSearchOptions = computed(() => {
      const { locales = {}, ...rest } = props.options

      return {
        ...locale.value,
        ...locales[routeLocale.value],
        ...rest,
      }
    })

    const hasInitialized = ref(false)

    const initialize = async (): Promise<void> => {
      const { docsearch } = await import('meilisearch-docsearch')

      docsearch({
        ...meiliSearchOptions.value,
        container: '#docsearch',
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
            innerHTML: getSearchButtonTemplate(locale.value.button),
          }),
    ]
  },
})
