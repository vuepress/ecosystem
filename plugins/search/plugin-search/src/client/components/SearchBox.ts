import type { KeyOptions } from '@vuepress/helper/client'
import { useKeys, useLocaleConfig } from '@vuepress/helper/client'
import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs } from 'vue'
import { useRouteLocale, useRouter } from 'vuepress/client'
import type { SearchSuggestion } from '../composables/index.js'
import {
  useSearchIndex,
  useSearchSuggestions,
  useSuggestionsFocus,
} from '../composables/index.js'
import type { SearchPluginLocaleConfig } from '../types.js'

export const SearchBox = defineComponent({
  name: 'SearchBox',

  props: {
    locales: {
      type: Object as PropType<SearchPluginLocaleConfig>,
      default: () => ({}),
    },

    hotKeys: Array as PropType<(KeyOptions | string)[]>,

    maxSuggestions: {
      type: Number,
      default: 5,
    },
  },

  setup(props) {
    const { locales, hotKeys, maxSuggestions } = toRefs(props)
    const locale = useLocaleConfig(locales)

    const router = useRouter()
    const routeLocale = useRouteLocale()
    const searchIndex = useSearchIndex()

    const input = ref<HTMLInputElement | null>(null)
    const isActive = ref(false)
    const query = ref('')

    const suggestions = useSearchSuggestions({
      searchIndex,
      routeLocale,
      query,
      maxSuggestions,
    })
    const { focusIndex, focusNext, focusPrev } =
      useSuggestionsFocus(suggestions)

    useKeys(hotKeys, () => {
      input.value?.focus()
    })

    const showSuggestions = computed(
      () => isActive.value && !!suggestions.value.length,
    )
    const onArrowUp = (): void => {
      if (!showSuggestions.value) {
        return
      }
      focusPrev()
    }
    const onArrowDown = (): void => {
      if (!showSuggestions.value) {
        return
      }
      focusNext()
    }
    const goTo = (index: number): void => {
      if (!showSuggestions.value) {
        return
      }

      const suggestion = suggestions.value[index] as
        | SearchSuggestion
        | undefined

      if (suggestion)
        void router.push(suggestion.link).then(() => {
          query.value = ''
          focusIndex.value = 0
        })
    }

    return () =>
      h(
        'form',
        {
          class: 'search-box',
          role: 'search',
        },
        [
          h('input', {
            ref: input,
            type: 'search',
            placeholder: locale.value.placeholder,
            autocomplete: 'off',
            spellcheck: false,
            value: query.value,
            onFocus: () => {
              isActive.value = true
            },
            onBlur: () => {
              isActive.value = false
            },
            onInput: (event) => {
              query.value = (event.target as HTMLInputElement).value
            },
            onKeydown: (event) => {
              switch (event.key) {
                case 'ArrowUp': {
                  onArrowUp()
                  break
                }
                case 'ArrowDown': {
                  onArrowDown()
                  break
                }
                case 'Enter': {
                  event.preventDefault()
                  goTo(focusIndex.value)
                  break
                }
                default: {
                  // do nothing
                }
              }
            },
          }),
          showSuggestions.value &&
            h(
              'ul',
              {
                class: 'suggestions',
                onMouseleave: () => {
                  focusIndex.value = -1
                },
              },
              suggestions.value.map(({ link, title, header }, index) =>
                h(
                  'li',
                  {
                    class: [
                      'suggestion',
                      {
                        focus: focusIndex.value === index,
                      },
                    ],
                    onMouseenter: () => {
                      focusIndex.value = index
                    },
                    onMousedown: () => {
                      goTo(index)
                    },
                  },
                  h(
                    'a',
                    {
                      href: link,
                      onClick: (event) => {
                        event.preventDefault()
                      },
                    },
                    [
                      h(
                        'span',
                        {
                          class: 'page-title',
                        },
                        title,
                      ),
                      header &&
                        h('span', { class: 'page-header' }, `> ${header}`),
                    ],
                  ),
                ),
              ),
            ),
        ],
      )
  },
})
