import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type { TwoslashReturn } from 'twoslash'
import { describe, expect, it } from 'vitest'

import { createFileSystemTypesCache } from '../../src/node/createFileSystemTypesCache.js'

describe(createFileSystemTypesCache, () => {
  it('returns null before anything is written', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'twoslash-cache-'))

    try {
      const cache = createFileSystemTypesCache({ dir })

      cache.init?.()

      expect(cache.read('const a = 1')).toBeNull()
    } finally {
      rmSync(dir, { force: true, recursive: true })
    }
  })

  it('creates the cache directory on init', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'twoslash-cache-'))
    const nested = path.join(dir, 'nested', 'cache')

    try {
      createFileSystemTypesCache({ dir: nested }).init?.()

      expect(existsSync(nested)).toBe(true)
    } finally {
      rmSync(dir, { force: true, recursive: true })
    }
  })

  it('reads back what was written for the same code', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'twoslash-cache-'))
    const data = { code: 'const a = 1', nodes: [] } as unknown as TwoslashReturn

    try {
      const cache = createFileSystemTypesCache({ dir })

      cache.write?.('const a = 1', data)

      expect(cache.read('const a = 1')).toStrictEqual(data)
      expect(cache.read('const b = 2')).toBeNull()
    } finally {
      rmSync(dir, { force: true, recursive: true })
    }
  })
})
