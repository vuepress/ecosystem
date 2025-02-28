import { useLocaleConfig } from '@vuepress/helper/client'
import {
  onClickOutside,
  useDebounceFn,
  useEventListener,
  useScrollLock,
  watchImmediate,
} from '@vueuse/core'
import type { VNode } from 'vue'
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import { useSiteLocaleData } from 'vuepress/client'

import {
  useActiveState,
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

const SUGGESTIONS_KEYCODE = ['ArrowDown', 'ArrowUp', 'Escape', 'Tab', 'Enter']

export default defineComponent({
  name: 'SearchModal',

  setup() {
    const [isActive, toggleActive] = useActiveState()
    const siteLocale = useSiteLocaleData()
    const locale = useLocaleConfig(locales)
    const searchOptions = useSearchOptions()

    const input = ref('')
    const queries = ref<string[]>([])
    const { enabled: enabledSuggestions, suggestions } = useSuggestions(queries)
    const showSuggestion = ref(false)

    const {
      index: activeSuggestionIndex,
      prev: activePreviousSuggestion,
      next: activeNextSuggestion,
    } = useArrayCycle(suggestions)

    const inputElement = shallowRef<HTMLInputElement>()
    const suggestionsElement = shallowRef<HTMLDivElement>()
    const body = shallowRef<HTMLElement>()
    const isLocked = useScrollLock(body.value)

    const hasSuggestions = computed(
      () =>
        enabledSuggestions && showSuggestion.value && suggestions.value.length,
    )

    const applySuggestion = (index = activeSuggestionIndex.value): void => {
      input.value = suggestions.value[index]
      showSuggestion.value = false
    }

    useEventListener('keydown', (event: KeyboardEvent) => {
      // handle suggestion keys
      if (hasSuggestions.value) {
        if (event.key === 'ArrowUp') activePreviousSuggestion()
        else if (event.key === 'ArrowDown') activeNextSuggestion()
        else if (event.key === 'Tab') applySuggestion()
        else if (event.key === 'Enter' || event.key === 'Escape')
          showSuggestion.value = false
      }
      // hide the modal when pressing the escape key
      else if (event.key === 'Escape') {
        toggleActive(false)
      }
    })

    onClickOutside(suggestionsElement, () => {
      showSuggestion.value = false
    })

    watchImmediate(
      input,
      useDebounceFn(
        () =>
          (
            searchOptions.value.querySplitter?.(input.value) ??
            Promise.resolve(input.value.split(' '))
          ).then((result) => {
            queries.value = result
          }),
        Math.min(options.searchDelay, options.suggestDelay),
      ),
    )

    onMounted(() => {
      body.value = document.body

      watch(
        isActive,
        (value) => {
          if (value) inputElement.value?.focus()
        },
        { flush: 'post' },
      )
    })

    onUnmounted(() => {
      isLocked.value = false
    })

    return (): VNode | null =>
      isActive.value
        ? h('div', { class: 'slimsearch-modal-wrapper' }, [
            h('div', {
              class: 'slimsearch-mask',
              onClick: () => {
                toggleActive(false)
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
                      if (
                        hasSuggestions.value &&
                        // These keys are handled by the suggestion list
                        SUGGESTIONS_KEYCODE.includes(event.key)
                      ) {
                        event.preventDefault()
                      }
                    },
                    'onInput': ({ target }: InputEvent) => {
                      input.value = (target as HTMLInputElement).value
                      showSuggestion.value = true
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
                  hasSuggestions.value
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
                      toggleActive(false)
                      input.value = ''
                    },
                  },
                  locale.value.cancel,
                ),
              ]),

              h(SearchResult, {
                queries: queries.value,
                isFocusing: !hasSuggestions.value,
                onClose: () => {
                  toggleActive(false)
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
