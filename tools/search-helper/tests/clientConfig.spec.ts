import { describe, expect, it } from 'vitest'

import {
  getSearchClientConfig,
  setSearchClientConfig,
} from '../src/client/define.js'
import type { SearchClientConfig } from '../src/client/define.js'
import { getResultPath } from '../src/client/utils/getResultPath.js'
import type { MatchedItem } from '../src/shared/index.js'

const config: SearchClientConfig = {
  options: {
    searchDelay: 150,
    suggestDelay: 0,
    queryHistoryCount: 5,
    resultHistoryCount: 5,
    hotKeys: [],
    worker: 'search.worker.js',
  },
  locales: {},
  store: { 0: '/page.html', 3: '/other.html' },
}

describe(getSearchClientConfig, () => {
  it('should throw when the config is not set', () => {
    // The config is module scoped, so it is only set by the plugins
    expect(() => getSearchClientConfig()).toThrow(
      'Search client config is not set',
    )
  })

  it('should return the injected config', () => {
    setSearchClientConfig(config)

    expect(getSearchClientConfig().options.worker).toBe('search.worker.js')
    expect(getSearchClientConfig().store).toStrictEqual({
      0: '/page.html',
      3: '/other.html',
    })
  })
})

describe(getResultPath, () => {
  it('should resolve the path of a page item', () => {
    setSearchClientConfig(config)

    expect(getResultPath({ type: 'title', id: 0, display: [] })).toBe(
      '/page.html',
    )
  })

  it('should append the anchor of a section item', () => {
    setSearchClientConfig(config)

    expect(
      getResultPath({ type: 'heading', id: 3, anchor: 'foo', display: [] }),
    ).toBe('/other.html#foo')
  })

  it('should not append an anchor for a custom field item', () => {
    setSearchClientConfig(config)

    expect(
      getResultPath({ type: 'customField', id: 0, index: '1', display: [] }),
    ).toBe('/page.html')
  })

  it('should keep the anchor of a content item', () => {
    setSearchClientConfig(config)

    const item: MatchedItem = {
      type: 'text',
      id: 3,
      anchor: 'bar',
      display: [],
    }

    expect(getResultPath(item)).toBe('/other.html#bar')
  })
})
