import {
  isPlainObject,
  isString,
  useLocaleConfig,
} from '@vuepress/helper/client'
import { useEventListener } from '@vueuse/core'
import type { PropType, VNode } from 'vue'
import { computed, defineComponent, h, reactive, ref, toRef, watch } from 'vue'
import { RouteLink, useRouteLocale, useRouter } from 'vuepress/client'

import {
  useQueryHistory,
  useResultHistory,
  useResults,
} from '../composables/index.js'
import { customFieldConfig, locales } from '../define.js'
import { CLOSE_ICON } from '../icons/index.js'
import type { MatchedItem, Word } from '../typings/index.js'
import { getResultPath } from '../utils/index.js'
import { SearchLoading } from './SearchLoading.js'
import { HeadingIcon, HeartIcon, HistoryIcon, TitleIcon } from './icons.js'

import '../styles/search-result.css'

export default defineComponent({
  name: 'SearchResult',

  props: {
    /**
     * Query string
     *
     * 查询字符串
     */
    queries: {
      type: Array as PropType<string[]>,
      required: true,
    },

    /**
     * Whether is focusing
     *
     * 是否被聚焦
     */
    isFocusing: Boolean,
  },

  emits: ['close', 'updateQuery'],

  setup(props, { emit }) {
    const router = useRouter()
    const routeLocale = useRouteLocale()
    const locale = useLocaleConfig(locales)
    const {
      enabled: enableQueryHistory,
      addQueryHistory,
      queryHistories,
      removeQueryHistory,
    } = useQueryHistory()
    const {
      enabled: enableResultHistory,
      resultHistories,
      addResultHistory,
      removeResultHistory,
    } = useResultHistory()
    const enableHistory = enableQueryHistory || enableResultHistory

    const queries = toRef(props, 'queries')
    const { results, isSearching } = useResults(queries)

    const activatedHistoryStatus = reactive({ isQuery: true, index: 0 })
    const activatedResultIndex = ref(0)
    const activatedResultContentIndex = ref(0)

    const hasHistory = computed(
      () =>
        enableHistory &&
        (queryHistories.value.length > 0 || resultHistories.value.length > 0),
    )
    const hasResults = computed(() => results.value.length > 0)
    const activatedResult = computed(
      () => results.value[activatedResultIndex.value] || null,
    )

    const activePreviousHistory = (): void => {
      const { isQuery, index } = activatedHistoryStatus

      if (index === 0) {
        activatedHistoryStatus.isQuery = !isQuery
        activatedHistoryStatus.index = isQuery
          ? resultHistories.value.length - 1
          : queryHistories.value.length - 1
      } else {
        activatedHistoryStatus.index = index - 1
      }
    }

    const activeNextHistory = (): void => {
      const { isQuery, index } = activatedHistoryStatus

      if (
        index ===
        (isQuery
          ? queryHistories.value.length - 1
          : resultHistories.value.length - 1)
      ) {
        activatedHistoryStatus.isQuery = !isQuery
        activatedHistoryStatus.index = 0
      } else {
        activatedHistoryStatus.index = index + 1
      }
    }

    const activePreviousResult = (): void => {
      activatedResultIndex.value =
        activatedResultIndex.value > 0
          ? activatedResultIndex.value - 1
          : results.value.length - 1
      activatedResultContentIndex.value =
        activatedResult.value.contents.length - 1
    }

    const activeNextResult = (): void => {
      activatedResultIndex.value =
        activatedResultIndex.value < results.value.length - 1
          ? activatedResultIndex.value + 1
          : 0
      activatedResultContentIndex.value = 0
    }

    const activeNextResultContent = (): void => {
      if (
        activatedResultContentIndex.value <
        activatedResult.value.contents.length - 1
      )
        activatedResultContentIndex.value += 1
      else activeNextResult()
    }

    const activePreviousResultContent = (): void => {
      if (activatedResultContentIndex.value > 0)
        activatedResultContentIndex.value -= 1
      else activePreviousResult()
    }

    const getVNodes = (display: Word[]): (VNode | string)[] =>
      display.map((word) => (isString(word) ? word : h(word[0], word[1])))

    const getDisplay = (matchedItem: MatchedItem): (VNode | string)[] => {
      if (matchedItem.type === 'customField') {
        const formatterConfig =
          customFieldConfig[matchedItem.index] || '$content'

        const [prefix, suffix = ''] = isPlainObject(formatterConfig)
          ? formatterConfig[routeLocale.value].split('$content')
          : formatterConfig.split('$content')

        return matchedItem.display.map((display) =>
          h('div', getVNodes([prefix, ...display, suffix])),
        )
      }

      return matchedItem.display.map((display) => h('div', getVNodes(display)))
    }

    const resetSearchResult = (): void => {
      activatedResultIndex.value = 0
      activatedResultContentIndex.value = 0
      emit('updateQuery', '')
      emit('close')
    }

    const renderSearchQueryHistory = (): VNode | null =>
      enableQueryHistory
        ? h(
            'ul',
            { class: 'slimsearch-result-list' },
            h('li', { class: 'slimsearch-result-list-item' }, [
              h(
                'div',
                { class: 'slimsearch-result-title' },
                locale.value.queryHistory,
              ),
              queryHistories.value.map((item, historyIndex) =>
                h(
                  'div',
                  {
                    class: [
                      'slimsearch-result-item',
                      {
                        active:
                          activatedHistoryStatus.isQuery &&
                          activatedHistoryStatus.index === historyIndex,
                      },
                    ],
                    onClick: () => {
                      emit('updateQuery', item)
                    },
                  },
                  [
                    h(HistoryIcon, {
                      class: 'slimsearch-result-type',
                    }),
                    h('div', { class: 'slimsearch-result-content' }, item),
                    h('button', {
                      class: 'slimsearch-remove-icon',
                      innerHTML: CLOSE_ICON,
                      onClick: (event: Event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        removeQueryHistory(historyIndex)
                      },
                    }),
                  ],
                ),
              ),
            ]),
          )
        : null

    const renderSearchResultHistory = (): VNode | null =>
      enableResultHistory
        ? h(
            'ul',
            { class: 'slimsearch-result-list' },
            h('li', { class: 'slimsearch-result-list-item' }, [
              h(
                'div',
                { class: 'slimsearch-result-title' },
                locale.value.resultHistory,
              ),

              resultHistories.value.map((item, historyIndex) =>
                h(
                  RouteLink,
                  {
                    to: item.link,
                    class: [
                      'slimsearch-result-item',
                      {
                        active:
                          !activatedHistoryStatus.isQuery &&
                          activatedHistoryStatus.index === historyIndex,
                      },
                    ],
                    onClick: () => {
                      resetSearchResult()
                    },
                  },
                  () => [
                    h(HistoryIcon, {
                      class: 'slimsearch-result-type',
                    }),
                    h('div', { class: 'slimsearch-result-content' }, [
                      item.header
                        ? h('div', { class: 'content-header' }, item.header)
                        : null,
                      h(
                        'div',
                        item.display
                          .map((display) => getVNodes(display))
                          .flat(),
                      ),
                    ]),
                    h('button', {
                      class: 'slimsearch-remove-icon',
                      innerHTML: CLOSE_ICON,
                      onClick: (event: Event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        removeResultHistory(historyIndex)
                      },
                    }),
                  ],
                ),
              ),
            ]),
          )
        : null

    useEventListener('keydown', (event: KeyboardEvent) => {
      if (!props.isFocusing) return

      if (hasResults.value) {
        if (event.key === 'ArrowUp') {
          activePreviousResultContent()
        } else if (event.key === 'ArrowDown') {
          activeNextResultContent()
        } else if (event.key === 'Enter') {
          const item =
            activatedResult.value.contents[activatedResultContentIndex.value]

          addQueryHistory(props.queries.join(' '))
          addResultHistory(item)
          void router.push(getResultPath(item))
          resetSearchResult()
        }
      } else if (enableResultHistory) {
        if (event.key === 'ArrowUp') {
          activePreviousHistory()
        } else if (event.key === 'ArrowDown') {
          activeNextHistory()
        } else if (event.key === 'Enter') {
          const { index } = activatedHistoryStatus

          if (activatedHistoryStatus.isQuery) {
            emit('updateQuery', queryHistories.value[index])
            event.preventDefault()
          } else {
            void router.push(resultHistories.value[index].link)
            resetSearchResult()
          }
        }
      }
    })

    watch(
      [activatedResultIndex, activatedResultContentIndex],
      () => {
        document
          .querySelector(
            '.slimsearch-result-list-item.active .slimsearch-result-item.active',
          )
          ?.scrollIntoView(false)
      },
      { flush: 'post' },
    )

    return (): VNode =>
      h(
        'div',
        {
          class: [
            'slimsearch-result-wrapper',
            {
              empty: props.queries.length
                ? !hasResults.value
                : !hasHistory.value,
            },
          ],
          id: 'slimsearch-results',
        },
        props.queries.length
          ? isSearching.value
            ? h(SearchLoading, { hint: locale.value.searching })
            : hasResults.value
              ? h(
                  'ul',
                  { class: 'slimsearch-result-list' },
                  results.value.map(({ title, contents }, index) => {
                    const isCurrentResultActive =
                      activatedResultIndex.value === index

                    return h(
                      'li',
                      {
                        class: [
                          'slimsearch-result-list-item',
                          { active: isCurrentResultActive },
                        ],
                      },
                      [
                        h(
                          'div',
                          { class: 'slimsearch-result-title' },
                          title || locale.value.defaultTitle,
                        ),
                        contents.map((item, contentIndex) => {
                          const isCurrentContentActive =
                            isCurrentResultActive &&
                            activatedResultContentIndex.value === contentIndex

                          return h(
                            RouteLink,
                            {
                              to: getResultPath(item),
                              class: [
                                'slimsearch-result-item',
                                {
                                  'active': isCurrentContentActive,
                                  'aria-selected': isCurrentContentActive,
                                },
                              ],
                              onClick: () => {
                                addQueryHistory(props.queries.join(' '))
                                addResultHistory(item)
                                resetSearchResult()
                              },
                            },
                            () => [
                              item.type === 'text'
                                ? null
                                : h(
                                    item.type === 'title'
                                      ? TitleIcon
                                      : item.type === 'heading'
                                        ? HeadingIcon
                                        : HeartIcon,
                                    { class: 'slimsearch-result-type' },
                                  ),
                              h('div', { class: 'slimsearch-result-content' }, [
                                item.type === 'text' && item.header
                                  ? h(
                                      'div',
                                      { class: 'content-header' },
                                      item.header,
                                    )
                                  : null,
                                h('div', getDisplay(item)),
                              ]),
                            ],
                          )
                        }),
                      ],
                    )
                  }),
                )
              : locale.value.emptyResult
          : enableHistory
            ? hasHistory.value
              ? [renderSearchQueryHistory(), renderSearchResultHistory()]
              : locale.value.emptyHistory
            : locale.value.emptyResult,
      )
  },
})
