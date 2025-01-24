import type { DocSearchProps } from '@docsearch/react'
import { debounce } from 'ts-debounce'
import { useRouter } from 'vuepress/client'
import { removeLeadingSlash, resolveRoutePathFromUrl } from 'vuepress/shared'

declare const __DOCSEARCH_INDEX_BASE__: string

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

    // navigation behavior triggered by `onKeyDown` internally
    navigator: {
      // when pressing Enter without metaKey
      navigate: ({ itemUrl }) => {
        router.push(itemUrl.replace(__VUEPRESS_BASE__, '/'))
      },
    },

    // add search debounce
    // @ts-expect-error: Return type of search is a type parameter
    transformSearchClient: (searchClient) => {
      const searchWithDebounce = debounce(searchClient.search, 500)

      return {
        ...searchClient,
        search: async (searchMethodParams) =>
          searchWithDebounce(searchMethodParams),
      }
    },
  }
}
