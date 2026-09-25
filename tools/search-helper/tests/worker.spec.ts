import { describe, expect, it, vi } from 'vitest'

import type { SearchResult, WorkerMessageData } from '../src/shared/index.js'
import { createWorkerResponse } from '../src/shared/worker.js'

const results: SearchResult[] = [{ title: 'Page', contents: [] }]

const handlers = {
  getSuggestions: vi.fn<() => string[]>(() => ['suggestion']),
  getSearchResults: vi.fn<() => SearchResult[]>(() => results),
}

const request = (data: Partial<WorkerMessageData> = {}): WorkerMessageData => ({
  query: 'query',
  locale: '/',
  id: 42,
  ...data,
})

describe(createWorkerResponse, () => {
  it('should answer with a tuple, which the client destructures', () => {
    // The client does `const [type, timestamp, result] = data`, so answering
    // with a plain object would leave its promise pending forever
    for (const type of ['all', 'search', 'suggest'] as const) {
      const response = createWorkerResponse(
        request({ type }),
        {},
        handlers,
        'max',
      )

      expect(Array.isArray(response)).toBe(true)
      expect(response).toHaveLength(3)
      expect(response[0]).toBe(type)
      expect(response[1]).toBe(42)
    }
  })

  it('should default the request type to `all`', () => {
    const response = createWorkerResponse(request(), {}, handlers, 'max')

    expect(response[0]).toBe('all')
  })

  it('should answer a suggest request with suggestions', () => {
    expect(
      createWorkerResponse(request({ type: 'suggest' }), {}, handlers, 'max'),
    ).toStrictEqual(['suggest', 42, ['suggestion']])
  })

  it('should answer a search request with results', () => {
    expect(
      createWorkerResponse(request({ type: 'search' }), {}, handlers, 'max'),
    ).toStrictEqual(['search', 42, results])
  })

  it('should answer an all request with both', () => {
    expect(
      createWorkerResponse(request({ type: 'all' }), {}, handlers, 'max'),
    ).toStrictEqual(['all', 42, { suggestions: ['suggestion'], results }])
  })

  it('should forward the search options', () => {
    const options = { limit: 5 }

    createWorkerResponse(
      request({ options, type: 'suggest' }),
      {},
      handlers,
      'max',
    )

    expect(handlers.getSuggestions).toHaveBeenCalledWith('query', {}, options)
  })

  it('should forward the sort strategy', () => {
    createWorkerResponse(request({ type: 'search' }), {}, handlers, 'total')

    expect(handlers.getSearchResults).toHaveBeenCalledWith(
      'query',
      {},
      undefined,
      'total',
    )
  })

  it('should answer with empty payloads for a locale without an index', () => {
    // An unknown locale must not throw, otherwise the client would hang
    expect(
      createWorkerResponse(
        request({ type: 'suggest' }),
        undefined,
        handlers,
        'max',
      ),
    ).toStrictEqual(['suggest', 42, []])
    expect(
      createWorkerResponse(
        request({ type: 'search' }),
        undefined,
        handlers,
        'max',
      ),
    ).toStrictEqual(['search', 42, []])
    expect(
      createWorkerResponse(
        request({ type: 'all' }),
        undefined,
        handlers,
        'max',
      ),
    ).toStrictEqual(['all', 42, { suggestions: [], results: [] }])
  })

  it('should not search when the locale has no index', () => {
    const localHandlers = {
      getSuggestions: vi.fn<() => string[]>(() => ['suggestion']),
      getSearchResults: vi.fn<() => SearchResult[]>(() => results),
    }

    createWorkerResponse(request(), undefined, localHandlers, 'max')

    expect(localHandlers.getSuggestions).not.toHaveBeenCalled()
    expect(localHandlers.getSearchResults).not.toHaveBeenCalled()
  })
})
