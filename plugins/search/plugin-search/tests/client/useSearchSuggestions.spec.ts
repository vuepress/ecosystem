import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import { useSearchSuggestions } from '../../src/client/composables/useSearchSuggestions.js'
import type { SearchIndex } from '../../src/shared/index.js'

const searchIndex: SearchIndex = [
  {
    extraFields: [],
    headers: [],
    path: '/',
    pathLocale: '/',
    title: 'Home',
  },
  {
    extraFields: ['author: mr-hope'],
    headers: [
      {
        children: [
          {
            children: [],
            level: 3,
            link: '#install',
            slug: 'install',
            title: 'Install',
          },
        ],
        level: 2,
        link: '#getting-started',
        slug: 'getting-started',
        title: 'Getting Started',
      },
    ],
    path: '/guide/',
    pathLocale: '/',
    title: 'Guide',
  },
  {
    extraFields: [],
    headers: [
      {
        children: [],
        level: 2,
        link: '#getting-started',
        slug: 'getting-started',
        title: 'Getting Started',
      },
    ],
    path: '/about/',
    pathLocale: '/',
    title: 'About',
  },
  {
    extraFields: [],
    headers: [],
    path: '/zh/',
    pathLocale: '/zh/',
    title: '首页',
  },
]

const getSuggestions = ({
  maxSuggestions = 5,
  query,
  routeLocale = '/',
}: {
  maxSuggestions?: number
  query: string
  routeLocale?: string
}): ReturnType<typeof useSearchSuggestions>['value'] =>
  useSearchSuggestions({
    maxSuggestions: ref(maxSuggestions),
    query: ref(query),
    routeLocale: ref(routeLocale),
    searchIndex: ref(searchIndex),
  }).value

describe('search suggestions', () => {
  it('should return nothing for an empty query', () => {
    expect(getSuggestions({ query: '' })).toStrictEqual([])
    expect(getSuggestions({ query: '   ' })).toStrictEqual([])
  })

  it('should match the title of a page', () => {
    expect(getSuggestions({ query: 'guide' })).toStrictEqual([
      { link: '/guide/', title: 'Guide' },
    ])
  })

  it('should match the extra fields of a page', () => {
    expect(getSuggestions({ query: 'author' })).toStrictEqual([
      { link: '/guide/', title: 'Guide' },
    ])
  })

  it('should match the headers of a page and link to the anchor', () => {
    expect(getSuggestions({ query: 'install' })).toStrictEqual([
      { header: 'Install', link: '/guide/#install', title: 'Guide' },
    ])
  })

  it('should only search the index of the current locale', () => {
    expect(getSuggestions({ query: '首页' })).toStrictEqual([])
    expect(
      getSuggestions({ query: '首页', routeLocale: '/zh/' }),
    ).toStrictEqual([{ link: '/zh/', title: '首页' }])
  })

  it('should not return more than the maximum number of suggestions', () => {
    // `g` matches both the page title and one of its headers
    expect(getSuggestions({ query: 'g' })).toHaveLength(2)
    expect(getSuggestions({ maxSuggestions: 1, query: 'g' })).toHaveLength(1)
  })
})
