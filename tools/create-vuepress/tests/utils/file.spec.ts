import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import {
  copy,
  copyDir,
  copyFile,
  ensureDirExistSync,
} from '../../src/utils/file.js'

const createTempDir = (): string => mkdtempSync(path.join(tmpdir(), 'cvp-'))

const writeSource = (filePath: string, content: string): void =>
  writeFileSync(filePath, content, 'utf-8')

describe('file utils', () => {
  it('should create nested directories and be idempotent', () => {
    const dir = createTempDir()

    try {
      const nested = path.join(dir, 'a/b/c')

      ensureDirExistSync(nested)
      expect(existsSync(nested)).toBe(true)

      // Calling it again on an existing directory must not throw.
      ensureDirExistSync(nested)
      expect(existsSync(nested)).toBe(true)
    } finally {
      rmSync(dir, { force: true, recursive: true })
    }
  })

  it('should copy a file and create its parent directories', () => {
    const dir = createTempDir()

    try {
      const source = path.join(dir, 'source.txt')
      const target = path.join(dir, 'nested/deep/target.txt')

      writeSource(source, 'content')
      copyFile(source, target)

      expect(readFileSync(target, 'utf-8')).toBe('content')
    } finally {
      rmSync(dir, { force: true, recursive: true })
    }
  })

  it('should copy a directory recursively', () => {
    const dir = createTempDir()

    try {
      const sourceDir = path.join(dir, 'src')
      const nestedDir = path.join(sourceDir, 'nested')
      const destDir = path.join(dir, 'dest')

      ensureDirExistSync(nestedDir)
      writeSource(path.join(sourceDir, 'index.js'), 'root')
      writeSource(path.join(nestedDir, 'deep.js'), 'nested')

      copyDir(sourceDir, destDir)

      expect(readFileSync(path.join(destDir, 'index.js'), 'utf-8')).toBe('root')
      expect(readFileSync(path.join(destDir, 'nested/deep.js'), 'utf-8')).toBe(
        'nested',
      )
    } finally {
      rmSync(dir, { force: true, recursive: true })
    }
  })

  it('should dispatch between a file and a directory source', () => {
    const dir = createTempDir()

    try {
      const file = path.join(dir, 'file.txt')
      const sourceDir = path.join(dir, 'src')

      writeSource(file, 'a file')
      ensureDirExistSync(sourceDir)
      writeSource(path.join(sourceDir, 'inside.txt'), 'in dir')

      copy(file, path.join(dir, 'out/file.txt'))
      copy(sourceDir, path.join(dir, 'out-dir'))

      expect(readFileSync(path.join(dir, 'out/file.txt'), 'utf-8')).toBe(
        'a file',
      )
      expect(readFileSync(path.join(dir, 'out-dir/inside.txt'), 'utf-8')).toBe(
        'in dir',
      )
    } finally {
      rmSync(dir, { force: true, recursive: true })
    }
  })
})
