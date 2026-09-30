import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { describe, expect, it, vi } from 'vitest'

import { resolveTypeScriptPaths } from '../../src/node/resolveTypeScriptPaths.js'

describe(resolveTypeScriptPaths, () => {
  it('resolves the paths relative to baseUrl', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'twoslash-paths-'))
    const cwd = vi.spyOn(process, 'cwd').mockReturnValue(dir)

    try {
      writeFileSync(
        path.join(dir, 'tsconfig.json'),
        JSON.stringify({
          compilerOptions: { baseUrl: '.', paths: { '@/*': ['src/*'] } },
        }),
      )

      await expect(resolveTypeScriptPaths()).resolves.toStrictEqual({
        '@/*': [path.join(dir, 'src/*')],
      })
    } finally {
      cwd.mockRestore()
      rmSync(dir, { force: true, recursive: true })
    }
  })

  it('keeps the raw paths when baseUrl is missing', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'twoslash-paths-'))
    const cwd = vi.spyOn(process, 'cwd').mockReturnValue(dir)

    try {
      writeFileSync(
        path.join(dir, 'tsconfig.json'),
        JSON.stringify({ compilerOptions: { paths: { '@/*': ['src/*'] } } }),
      )

      await expect(resolveTypeScriptPaths()).resolves.toStrictEqual({
        '@/*': ['src/*'],
      })
    } finally {
      cwd.mockRestore()
      rmSync(dir, { force: true, recursive: true })
    }
  })

  it('returns null when there is no tsconfig', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'twoslash-paths-'))
    const cwd = vi.spyOn(process, 'cwd').mockReturnValue(dir)

    try {
      await expect(resolveTypeScriptPaths()).resolves.toBeNull()
    } finally {
      cwd.mockRestore()
      rmSync(dir, { force: true, recursive: true })
    }
  })

  it('returns null when the tsconfig is not valid json', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'twoslash-paths-'))
    const cwd = vi.spyOn(process, 'cwd').mockReturnValue(dir)

    try {
      writeFileSync(path.join(dir, 'tsconfig.json'), '{ not json')

      await expect(resolveTypeScriptPaths()).resolves.toBeNull()
    } finally {
      cwd.mockRestore()
      rmSync(dir, { force: true, recursive: true })
    }
  })
})
