// oxlint-disable max-lines-per-function
import { isPlainObject, useLocale } from '@vuepress/helper/client'
import { useEventListener } from '@vueuse/core'
import type { PropType, VNode } from 'vue'
import { computed, defineComponent, h, reactive, ref, toRef, watch } from 'vue'
import { RouteLink, useRouteLocale, useRouter } from 'vuepress/client'

import type { MatchedContent, MatchedItem } from '../../shared/index.js'
import {
  useQueryHistory,
  useResultHistory,
  useResults,
} from '../composables/index.js'
import { customFieldConfig, locales } from '../define.js'
import { CLOSE_ICON } from '../icons/index.js'
import { getResultPath } from '../utils/index.js'
import { HeadingIcon, HeartIcon, HistoryIcon, TitleIcon } from './icons.js'
import { SearchLoading } from './SearchLoading.js'

import '../styles/search-result.scss'

const renderMatchedContent = ({
  text,
  highlights,
}: MatchedContent): (VNode | string)[] => {
  const nodes: (VNode | string)[] = []
  let cursor = 0

  for (let i = 0; i < highlights.length; i += 2) {
    const start = highlights[i]
    const end = highlights[i + 1]

    if (start > cursor) nodes.push(text.slice(cursor, start))
    nodes.push(h('mark', text.slice(start, end)))
    cursor = end
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))

  return nodes
}

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
    const locale = useLocale(locales)
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

    const getDisplay = (matchedItem: MatchedItem): (VNode | string)[] => {
      if (matchedItem.type === 'customField') {
        const formatterConfig = customFieldConfig[matchedItem.index]

        const [prefix, suffix = ''] = (
          (isPlainObject(formatterConfig)
            ? formatterConfig[routeLocale.value]
            : formatterConfig) ?? ''
        ).split('$content')

        return matchedItem.display.map((content) =>
          h('div', [prefix, ...renderMatchedContent(content), suffix]),
        )
      }

      return matchedItem.display.map((content) =>
        h('div', renderMatchedContent(content)),
      )
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
            'div',
            { class: 'orama-records' },
            h('div', { class: 'orama-record' }, [
              h(
                'div',
                { class: 'orama-record-title' },
                locale.value.queryHistory,
              ),
              h(
                'ul',
                { class: 'orama-record-contents', role: 'listbox' },
                queryHistories.value.map((item, historyIndex) => {
                  const active =
                    activatedHistoryStatus.isQuery &&
                    activatedHistoryStatus.index === historyIndex

                  return h(
                    'li',
                    {
                      'class': ['orama-record-matches', { active }],
                      'role': 'option',
                      'aria-selected': active,
                      'onClick': () => {
                        emit('updateQuery', item)
                      },
                    },
                    h('div', [
                      h(HistoryIcon, {
                        class: 'orama-record-type',
                      }),
                      h('div', { class: 'orama-record-content' }, item),
                      h('button', {
                        'type': 'button',
                        'class': 'orama-remove-icon',
                        'title': locale.value.remove,
                        'aria-label': locale.value.remove,
                        'innerHTML': CLOSE_ICON,
                        'onClick': (event: Event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          removeQueryHistory(historyIndex)
                        },
                      }),
                    ]),
                  )
                }),
              ),
            ]),
          )
        : null

    const renderSearchResultHistory = (): VNode | null =>
      enableResultHistory
        ? h(
            'ul',
            { class: 'orama-records' },
            h('li', { class: 'orama-record' }, [
              h(
                'div',
                { class: 'orama-record-title' },
                locale.value.resultHistory,
              ),
              h(
                'ul',
                { class: 'orama-record-contents', role: 'listbox' },
                resultHistories.value.map((item, historyIndex) => {
                  const active =
                    !activatedHistoryStatus.isQuery &&
                    activatedHistoryStatus.index === historyIndex

                  return h(
                    'li',
                    {
                      'class': ['orama-record-matches', { active }],
                      'role': 'option',
                      'aria-selected': active,
                    },
                    h(
                      RouteLink,
                      {
                        to: item.link,
                        onClick: () => {
                          resetSearchResult()
                        },
                      },
                      () => [
                        h(HistoryIcon, {
                          class: 'orama-record-type',
                        }),
                        h('div', { class: 'orama-record-content' }, [
                          item.header
                            ? h(
                                'div',
                                { class: 'orama-record-content-header' },
                                item.header,
                              )
                            : null,
                          h(
                            'div',
                            item.display.flatMap((content) =>
                              renderMatchedContent(content),
                            ),
                          ),
                        ]),
                        h('button', {
                          'type': 'button',
                          'class': 'orama-remove-icon',
                          'title': locale.value.remove,
                          'aria-label': locale.value.remove,
                          'innerHTML': CLOSE_ICON,
                          'onClick': (event: Event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            removeResultHistory(historyIndex)
                          },
                        }),
                      ],
                    ),
                  )
                }),
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
            event.preventDefault()
            emit('updateQuery', queryHistories.value[index])
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
          .querySelector('.orama-record.active .orama-record-matches.active')
          ?.scrollIntoView(false)
      },
      { flush: 'post' },
    )

    return (): VNode =>
      h(
        'div',
        {
          id: 'orama-results',
          class: [
            'orama-result-wrapper',
            {
              empty:
                props.queries.length > 0
                  ? !hasResults.value
                  : !hasHistory.value,
            },
          ],
        },
        props.queries.length > 0
          ? isSearching.value
            ? h(SearchLoading, { hint: locale.value.searching })
            : hasResults.value
              ? h(
                  'div',
                  {
                    'class': 'orama-records',
                    'role': 'listbox',
                    'aria-labeledby': 'orama-label',
                  },
                  results.value.map(({ title, contents }, index) => {
                    const isCurrentResultActive =
                      activatedResultIndex.value === index

                    return h(
                      'div',
                      {
                        'class': [
                          'orama-record',
                          { active: isCurrentResultActive },
                        ],
                        'role': 'group',
                        'aria-selected': isCurrentResultActive,
                      },
                      [
                        h(
                          'div',
                          { class: 'orama-record-title' },
                          title || locale.value.defaultTitle,
                        ),
                        h(
                          'ul',
                          { class: 'orama-record-contents' },
                          contents.map((item, contentIndex) => {
                            const isCurrentContentActive =
                              isCurrentResultActive &&
                              activatedResultContentIndex.value === contentIndex

                            return h(
                              'li',
                              {
                                'class': [
                                  'orama-record-matches',
                                  { active: isCurrentContentActive },
                                ],
                                'role': 'option',
                                'aria-selected': isCurrentContentActive,
                              },
                              h(
                                RouteLink,
                                {
                                  to: getResultPath(item),
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
                                        { class: 'orama-record-type' },
                                      ),
                                  h('div', { class: 'orama-record-content' }, [
                                    item.type === 'text' && item.header
                                      ? h(
                                          'div',
                                          {
                                            class:
                                              'orama-record-content-header',
                                          },
                                          item.header,
                                        )
                                      : null,
                                    h('div', getDisplay(item)),
                                  ]),
                                ],
                              ),
                            )
                          }),
                        ),
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
