import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress'

import { resolveChangelog } from '../../src/node/resolveChangelog.js'
import type { MergedRawCommit } from '../../src/node/typings.js'

/**
 * The changelog resolution only renders the commit message inline, so a
 * pass-through markdown renderer is enough for these tests.
 */
const app = {
  markdown: { renderInline: (message: string): string => message },
} as unknown as App

const createCommit = (refs: string): MergedRawCommit => ({
  author: 'Alice',
  body: '',
  coAuthors: [],
  email: 'alice@example.com',
  filepaths: ['README.md'],
  hash: 'abcdef1234567890',
  message: 'feat: add a feature',
  refs,
  submodule: null,
  time: 1_600_000_000_000,
})

describe('resolve changelog', () => {
  it('should not expose a tag when the commit has no refs', () => {
    const [item] = resolveChangelog(app, [createCommit('')], {}, [])

    expect(item.tag).toBeUndefined()
  })

  it('should expose the tag when it is the only ref', () => {
    const [item] = resolveChangelog(
      app,
      [createCommit('(tag: v1.0.0)')],
      {},
      [],
    )

    expect(item.tag).toBe('v1.0.0')
  })

  it('should expose the tag when it is not the first ref', () => {
    // the real `%d` of a tagged HEAD is `(HEAD -> main, tag: v1.0.0)`
    const [item] = resolveChangelog(
      app,
      [createCommit('(HEAD -> main, tag: v1.0.0, origin/main)')],
      {},
      [],
    )

    expect(item.tag).toBe('v1.0.0')
  })

  it('should not expose a tag when the refs only hold branches', () => {
    const [item] = resolveChangelog(
      app,
      [createCommit('(HEAD -> main, origin/main)')],
      {},
      [],
    )

    expect(item.tag).toBeUndefined()
  })
})
