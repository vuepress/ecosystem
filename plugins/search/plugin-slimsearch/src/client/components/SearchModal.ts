import { useLocaleConfig } from '@vuepress/helper/client'
import {
  onClickOutside,
  useDebounceFn,
  useEventListener,
  useScrollLock,
} from '@vueuse/core'
import type { VNode } from 'vue'
import {
  defineAsyncComponent,
  defineComponent,
  h,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import { useSiteLocaleData } from 'vuepress/client'

import {
  searchModalSymbol,
  useArrayCycle,
  useSuggestions,
} from '../composables/index.js'
import { locales, options } from '../define.js'
import { useSearchOptions } from '../helpers/index.js'
import { CLOSE_ICON } from '../icons/index.js'
import SearchKeyHints from './SearchKeyHints.js'
import { SearchLoading } from './SearchLoading.js'
import { SearchIcon } from './icons.js'

import '../styles/search-modal.css'

declare const __SLIMSEARCH_SUGGESTION__: boolean

const SearchResult = defineAsyncComponent({
  loader: () =>
    import(/* webpackChunkName: "slimsearch-result" */ './SearchResult.js'),
  loadingComponent: () => {
    const localeConfig = useLocaleConfig(locales)

    return h(SearchLoading, {
      class: 'slimsearch-result-wrapper',
      hint: localeConfig.value.loading,
    })
  },
})

export default defineComponent({
  name: 'SearchModal',

  setup() {
    const isActive = inject(searchModalSymbol)!
    const siteLocale = useSiteLocaleData()
    const locale = useLocaleConfig(locales)
    const searchOptions = useSearchOptions()

    const input = ref('')
    const queries = ref<string[]>([])
    const { suggestions } = useSuggestions(queries)
    const displaySuggestion = ref(false)

    const {
      index: activeSuggestionIndex,
      prev: activePreviousSuggestion,
      next: activeNextSuggestion,
    } = useArrayCycle(suggestions)

    const inputElement = shallowRef<HTMLInputElement>()
    const suggestionsElement = shallowRef<HTMLDivElement>()

    const applySuggestion = (index = activeSuggestionIndex.value): void => {
      input.value = suggestions.value[index]
      displaySuggestion.value = false
    }

    useEventListener('keydown', (event: KeyboardEvent) => {
      if (displaySuggestion.value) {
        if (event.key === 'ArrowUp') activePreviousSuggestion()
        else if (event.key === 'ArrowDown') activeNextSuggestion()
        else if (event.key === 'Enter') applySuggestion()
        else if (event.key === 'Escape') displaySuggestion.value = false
      } else if (event.key === 'Escape') {
        isActive.value = false
      }
    })

    const updateQueries = useDebounceFn(
      (): void => {
        void (
          searchOptions.value.querySplitter?.(input.value) ??
          Promise.resolve(input.value.split(' '))
        ).then((result) => {
          queries.value = result
        })
      },
      Math.min(options.searchDelay, options.suggestDelay),
    )

    watch(input, updateQueries, { immediate: true })

    onMounted(() => {
      const isLocked = useScrollLock(document.body)

      watch(isActive, async (value) => {
        isLocked.value = value
        if (value) {
          await nextTick()
          inputElement.value?.focus()
        }
      })

      onClickOutside(suggestionsElement, () => {
        displaySuggestion.value = false
      })

      onUnmounted(() => {
        isLocked.value = false
      })
    })

    return (): VNode | null =>
      isActive.value
        ? h('div', { class: 'slimsearch-modal-wrapper' }, [
            h('div', {
              class: 'slimsearch-mask',
              onClick: () => {
                isActive.value = false
                input.value = ''
              },
            }),
            h('div', { class: 'slimsearch-modal' }, [
              h('div', { class: 'slimsearch-box' }, [
                h('form', [
                  h(
                    'label',
                    { 'for': 'search-pro', 'aria-label': locale.value.search },
                    h(SearchIcon),
                  ),
                  h('input', {
                    'ref': inputElement,
                    'type': 'search',
                    'class': 'slimsearch-input',
                    'id': 'search-pro',
                    'placeholder': locale.value.placeholder,
                    'spellcheck': 'false',
                    'autocapitalize': 'off',
                    'autocomplete': 'off',
                    'autocorrect': 'off',
                    'name': `${siteLocale.value.title}-search`,
                    'value': input.value,
                    'aria-controls': 'slimsearch-results',
                    'onKeydown': (event: KeyboardEvent): void => {
                      const { key } = event

                      if (suggestions.value.length)
                        if (key === 'Tab') {
                          applySuggestion()
                          event.preventDefault()
                        } else if (
                          key === 'ArrowDown' ||
                          key === 'ArrowUp' ||
                          key === 'Escape'
                        ) {
                          event.preventDefault()
                        }
                    },
                    'onInput': ({ target }: InputEvent) => {
                      input.value = (target as HTMLInputElement).value
                      displaySuggestion.value = true
                      activeSuggestionIndex.value = 0
                    },
                  }),
                  input.value
                    ? h('button', {
                        type: 'reset',
                        class: 'slimsearch-clear-button',
                        innerHTML: CLOSE_ICON,
                        onClick: () => {
                          input.value = ''
                        },
                      })
                    : null,
                  __SLIMSEARCH_SUGGESTION__ &&
                  displaySuggestion.value &&
                  suggestions.value.length
                    ? h(
                        'ul',
                        {
                          class: 'slimsearch-suggestions',
                          ref: suggestionsElement,
                        },
                        suggestions.value.map((suggestion, index) =>
                          h(
                            'li',
                            {
                              class: [
                                'slimsearch-suggestion',
                                {
                                  active: index === activeSuggestionIndex.value,
                                },
                              ],
                              onClick: () => {
                                applySuggestion(index)
                              },
                            },
                            [
                              h(
                                'kbd',
                                {
                                  class: 'slimsearch-auto-complete',
                                  title: `Tab ${locale.value.autocomplete}`,
                                },
                                'Tab',
                              ),
                              suggestion,
                            ],
                          ),
                        ),
                      )
                    : null,
                ]),
                h(
                  'button',
                  {
                    type: 'button',
                    class: 'slimsearch-close-button',
                    onClick: () => {
                      isActive.value = false
                      input.value = ''
                    },
                  },
                  locale.value.cancel,
                ),
              ]),

              h(SearchResult, {
                queries: queries.value,
                isFocusing: !displaySuggestion.value,
                onClose: () => {
                  isActive.value = false
                },
                onUpdateQuery: (query: string) => {
                  input.value = query
                },
              }),

              h(SearchKeyHints),
            ]),
          ])
        : null
  },
})
