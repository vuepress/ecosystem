import { debounce } from 'ts-debounce'
import { useRouter } from 'vuepress/client'
import { removeLeadingSlash, resolveRoutePathFromUrl } from 'vuepress/shared'
import type { DocSearchProps } from '../../shared/index.js'

declare const __DOCSEARCH_INDEX_BASE__: string

const isSpecialClick = (event: MouseEvent): boolean =>
  event.button === 1 ||
  event.altKey ||
  event.ctrlKey ||
  event.metaKey ||
  event.shiftKey

/**
 * Get docsearch options to be compatible with VuePress
 */
export const useDocSearchShim = (): Partial<DocSearchProps> => {
  const router = useRouter()

  return {
    // convert item url to pathname of current site
    transformItems: (items) =>
      items.map((item) => ({
        ...item,
        url: `${
          // append current base
          __VUEPRESS_BASE__
        }${removeLeadingSlash(
          // get route path
          resolveRoutePathFromUrl(item.url, __DOCSEARCH_INDEX_BASE__),
        )}`,
      })),

    // render the hit component with custom `onClick` handler
    hitComponent: ({ hit, children }) =>
      ({
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: {
          href: hit.url,
          // handle `onClick` by `router.push`
          onClick: (event: MouseEvent) => {
            if (isSpecialClick(event)) {
              return
            }
            event.preventDefault()
            router.push(hit.url.replace(__VUEPRESS_BASE__, '/'))
          },
          children: children as unknown,
        },
        __v: null,
      }) as unknown,

    // navigation behavior triggered by `onKeyDown` internally
    navigator: {
      // when pressing Enter without metaKey
      navigate: ({ itemUrl }) => {
        router.push(itemUrl.replace(__VUEPRESS_BASE__, '/'))
      },
    },

    // add search debounce
    transformSearchClient: (searchClient) => {
      const searchWithDebounce = debounce(searchClient.search, 500)

      return {
        ...searchClient,
        search: async (...args) => searchWithDebounce(...args),
      }
    },
  }
}
