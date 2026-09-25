import { describe, expect, it } from 'vitest'

import { buildSearchResults } from '../src/shared/buildSearchResults.js'

const getPageTitle = (): undefined => undefined

describe(buildSearchResults, () => {
  it('should group hits by page and use the page document title', () => {
    const results = buildSearchResults({
      hits: [
        { id: '0', score: 5, document: { id: '0', h: 'Hello world' } },
        {
          id: '0#install',
          score: 3,
          document: {
            id: '0#install',
            h: 'Hello install',
            t: ['Hello there'],
          },
        },
      ],
      displayTerms: ['hello'],
      getPageTitle,
    })

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Hello world')
    expect(results[0].contents).toMatchObject([
      { type: 'title', id: 0 },
      { type: 'heading', id: 0, anchor: 'install' },
      { type: 'text', id: 0, anchor: 'install' },
    ])
  })

  it('should add the custom field index to the matched item', () => {
    const results = buildSearchResults({
      hits: [
        { id: '0', score: 5, document: { id: '0', h: 'Hello world' } },
        { id: '0@1', score: 2, document: { id: '0@1', c: ['author: hello'] } },
      ],
      displayTerms: ['hello'],
      getPageTitle,
    })

    expect(results[0].contents).toMatchObject([
      { type: 'title', id: 0 },
      { type: 'customField', id: 0, index: '1' },
    ])
  })

  it('should highlight the matched content', () => {
    const results = buildSearchResults({
      hits: [{ id: '0', score: 1, document: { id: '0', h: 'Hello world' } }],
      displayTerms: ['hello'],
      getPageTitle,
    })

    expect(results[0].contents[0].display).toStrictEqual([
      { text: 'Hello world', highlights: [0, 5] },
    ])
  })

  it('should use the terms of a hit when it provides its own', () => {
    const results = buildSearchResults({
      hits: [
        {
          id: '0',
          score: 1,
          terms: ['world'],
          document: { id: '0', h: 'Hello world' },
        },
      ],
      displayTerms: ['hello'],
      getPageTitle,
    })

    expect(results[0].contents[0].display).toStrictEqual([
      { text: 'Hello world', highlights: [6, 11] },
    ])
  })

  it('should drop pages without matched content', () => {
    const results = buildSearchResults({
      hits: [{ id: '0', score: 1, document: { id: '0', h: 'Nothing' } }],
      displayTerms: ['hello'],
      getPageTitle,
    })

    expect(results).toHaveLength(0)
  })

  it('should fall back to the page title of the index', () => {
    const results = buildSearchResults({
      hits: [
        {
          id: '3#install',
          score: 1,
          document: { id: '3#install', h: 'Hello install' },
        },
      ],
      displayTerms: ['hello'],
      getPageTitle: (pageId) => `Page ${pageId}`,
    })

    expect(results[0].title).toBe('Page 3')
  })

  it('should sort results by the highest score when the strategy is `max`', () => {
    const results = buildSearchResults({
      hits: [
        { id: '0', score: 9, document: { id: '0', h: 'Hello alpha' } },
        { id: '0#a', score: 1, document: { id: '0#a', h: 'Hello' } },
        { id: '1', score: 6, document: { id: '1', h: 'Hello beta' } },
        { id: '1#a', score: 6, document: { id: '1#a', h: 'Hello' } },
      ],
      displayTerms: ['hello'],
      getPageTitle,
      sortStrategy: 'max',
    })

    expect(results.map(({ title }) => title)).toStrictEqual([
      'Hello alpha',
      'Hello beta',
    ])
  })

  it('should sort results by the total score when the strategy is `total`', () => {
    const results = buildSearchResults({
      hits: [
        { id: '0', score: 9, document: { id: '0', h: 'Hello alpha' } },
        { id: '0#a', score: 1, document: { id: '0#a', h: 'Hello' } },
        { id: '1', score: 6, document: { id: '1', h: 'Hello beta' } },
        { id: '1#a', score: 6, document: { id: '1#a', h: 'Hello' } },
      ],
      displayTerms: ['hello'],
      getPageTitle,
      sortStrategy: 'total',
    })

    expect(results.map(({ title }) => title)).toStrictEqual([
      'Hello beta',
      'Hello alpha',
    ])
  })

  it('should not add matched content when the query does not match', () => {
    const results = buildSearchResults({
      hits: [
        {
          id: '0',
          score: 1,
          document: { id: '0', h: 'Hello', t: ['Nothing here'] },
        },
      ],
      displayTerms: ['missing'],
      getPageTitle,
    })

    expect(results).toHaveLength(0)
  })
})
