import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { handleInclude } from '../src/node/remark-plugins/remarkInclude'

const fixtureContent = [
  '// #region other',
  'other content',
  '// #endregion other',
  '// #region target',
  'target content',
  '// #endregion target',
  '',
].join('\n')

const createFixture = (): { dir: string; filePath: string } => {
  const dir = mkdtempSync(path.join(tmpdir(), 'vuepress-plugin-llms-'))
  const filePath = path.join(dir, 'regions.txt')
  writeFileSync(filePath, fixtureContent)

  return { dir, filePath }
}

describe('@vuepress/plugin-llms > handleInclude', () => {
  it('should only include the requested region', async () => {
    const { dir, filePath } = createFixture()

    try {
      await expect(
        handleInclude(
          { filePath, region: 'target' },
          { cwd: null, resolvedPath: false },
        ),
      ).resolves.toBe('target content\n')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should return empty content when the region is missing', async () => {
    const { dir, filePath } = createFixture()

    try {
      await expect(
        handleInclude(
          { filePath, region: 'missing' },
          { cwd: null, resolvedPath: false },
        ),
      ).resolves.toBe('\n')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
