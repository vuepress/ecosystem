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
import { useIsMobile } from 'vuepress-shared/client'

import {
  searchModalSymbol,
  useArrayCycle,
  useSearchSuggestions,
} from '../composables/index.js'
import {
  enableAutoSuggestions,
  searchProLocales,
  searchProOptions,
} from '../define.js'
import { useSearchOptions } from '../helpers/index.js'
import {
  CLOSE_ICON,
  DOWN_KEY_ICON,
  ENTER_KEY_ICON,
  ESC_KEY_ICON,
  UP_KEY_ICON,
} from '../utils/index.js'
import { SearchLoading } from './SearchLoading.js'
import { SearchIcon } from './icons.js'

import '../styles/search-modal.scss'

const SearchResult = defineAsyncComponent({
  loader: () =>
    import(/* webpackChunkName: "slimserach-result" */ './SearchResult.js'),
  loadingComponent: () => {
    const localeConfig = useLocaleConfig(searchProLocales)

    return h(SearchLoading, { hint: localeConfig.value.loading })
  },
})

export default defineComponent({
  name: 'SearchModal',

  setup() {
    const isActive = inject(searchModalSymbol)!
    const siteLocale = useSiteLocaleData()
    const isMobile = useIsMobile()
    const locale = useLocaleConfig(searchProLocales)
    const searchOptions = useSearchOptions()

    const input = ref('')
    const queries = ref<string[]>([])
    const { suggestions } = useSearchSuggestions(queries)
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
          searchOptions.value.splitWord?.(input.value) ??
          Promise.resolve(input.value.split(' '))
        ).then((result) => {
          queries.value = result
        })
      },
      Math.min(searchProOptions.searchDelay, searchProOptions.suggestDelay),
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
        ? h('div', { class: 'slimserach-modal-wrapper' }, [
            h('div', {
              class: 'slimserach-mask',
              onClick: () => {
                isActive.value = false
                input.value = ''
              },
            }),
            h('div', { class: 'slimserach-modal' }, [
              h('div', { class: 'slimserach-box' }, [
                h('form', [
                  h(
                    'label',
                    { 'for': 'search-pro', 'aria-label': locale.value.search },
                    h(SearchIcon),
                  ),
                  h('input', {
                    'ref': inputElement,
                    'type': 'search',
                    'class': 'slimserach-input',
                    'id': 'search-pro',
                    'placeholder': locale.value.placeholder,
                    'spellcheck': 'false',
                    'autocapitalize': 'off',
                    'autocomplete': 'off',
                    'autocorrect': 'off',
                    'name': `${siteLocale.value.title}-search`,
                    'value': input.value,
                    'aria-controls': 'slimserach-results',
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
                        class: 'slimserach-clear-button',
                        innerHTML: CLOSE_ICON,
                        onClick: () => {
                          input.value = ''
                        },
                      })
                    : null,
                  enableAutoSuggestions &&
                  displaySuggestion.value &&
                  suggestions.value.length
                    ? h(
                        'ul',
                        {
                          class: 'slimserach-suggestions',
                          ref: suggestionsElement,
                        },
                        suggestions.value.map((suggestion, index) =>
                          h(
                            'li',
                            {
                              class: [
                                'slimserach-suggestion',
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
                                  class: 'slimserach-auto-complete',
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
                    class: 'slimserach-close-button',
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

              // Key hints should only appears in PC
              isMobile.value
                ? null
                : h('div', { class: 'slimserach-hints' }, [
                    h('span', { class: 'slimserach-hint' }, [
                      h('kbd', { innerHTML: ENTER_KEY_ICON }),
                      locale.value.select,
                    ]),
                    h('span', { class: 'slimserach-hint' }, [
                      h('kbd', { innerHTML: UP_KEY_ICON }),
                      h('kbd', { innerHTML: DOWN_KEY_ICON }),
                      locale.value.navigate,
                    ]),
                    h('span', { class: 'slimserach-hint' }, [
                      h('kbd', { innerHTML: ESC_KEY_ICON }),
                      locale.value.exit,
                    ]),
                  ]),
            ]),
          ])
        : null
  },
})
