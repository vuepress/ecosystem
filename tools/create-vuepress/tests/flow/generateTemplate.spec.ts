import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { describe, expect, it, vi } from 'vitest'

import { generateTemplate } from '../../src/flow/generateTemplate.js'
import { en } from '../../src/i18n/en.js'

const { confirmMock } = vi.hoisted(() => ({
  confirmMock: vi.fn<() => Promise<boolean>>(() => Promise.resolve(false)),
}))

vi.mock(import('@inquirer/prompts'), () => ({ confirm: confirmMock }))

const createTargetDir = (): string =>
  mkdtempSync(path.join(tmpdir(), 'create-vuepress-'))

describe(generateTemplate, () => {
  it('should scaffold the docs preset and inject the vite bundler', async () => {
    confirmMock.mockResolvedValue(false)

    const targetDirPath = createTargetDir()

    try {
      await generateTemplate({
        bundler: 'vite',
        lang: 'en',
        locale: en,
        packageManager: 'npm',
        preset: 'docs',
        targetDirPath,
      })

      const config = readFileSync(
        path.join(targetDirPath, 'docs/.vuepress/config.js'),
        'utf-8',
      )

      expect(config).toContain(
        "import { viteBundler } from '@vuepress/bundler-vite'",
      )
      expect(config).toContain('bundler: viteBundler(),')

      expect(existsSync(path.join(targetDirPath, 'docs/README.md'))).toBe(true)
      expect(existsSync(path.join(targetDirPath, 'docs/get-started.md'))).toBe(
        true,
      )

      // No workflow is generated when the user declines it.
      expect(
        existsSync(
          path.join(targetDirPath, '.github/workflows/deploy-docs.yml'),
        ),
      ).toBe(false)
    } finally {
      rmSync(targetDirPath, { force: true, recursive: true })
    }
  })

  it('should inject the webpack bundler when requested', async () => {
    confirmMock.mockResolvedValue(false)

    const targetDirPath = createTargetDir()

    try {
      await generateTemplate({
        bundler: 'webpack',
        lang: 'en',
        locale: en,
        packageManager: 'npm',
        preset: 'docs',
        targetDirPath,
      })

      const config = readFileSync(
        path.join(targetDirPath, 'docs/.vuepress/config.js'),
        'utf-8',
      )

      expect(config).toContain(
        "import { webpackBundler } from '@vuepress/bundler-webpack'",
      )
      expect(config).toContain('bundler: webpackBundler(),')
    } finally {
      rmSync(targetDirPath, { force: true, recursive: true })
    }
  })

  it('should generate a pnpm deployment workflow when accepted', async () => {
    confirmMock.mockResolvedValue(true)

    const targetDirPath = createTargetDir()

    try {
      await generateTemplate({
        bundler: 'vite',
        lang: 'en',
        locale: en,
        packageManager: 'pnpm',
        preset: 'docs',
        targetDirPath,
      })

      const workflow = readFileSync(
        path.join(targetDirPath, '.github/workflows/deploy-docs.yml'),
        'utf-8',
      )

      expect(workflow).toContain('pnpm/action-setup@v6')
      expect(workflow).toContain('pnpm run docs:build')
    } finally {
      rmSync(targetDirPath, { force: true, recursive: true })
    }
  })

  it('should not add a pnpm setup step for npm', async () => {
    confirmMock.mockResolvedValue(true)

    const targetDirPath = createTargetDir()

    try {
      await generateTemplate({
        bundler: 'vite',
        lang: 'en',
        locale: en,
        packageManager: 'npm',
        preset: 'docs',
        targetDirPath,
      })

      const workflow = readFileSync(
        path.join(targetDirPath, '.github/workflows/deploy-docs.yml'),
        'utf-8',
      )

      expect(workflow).not.toContain('pnpm/action-setup@v6')
      expect(workflow).toContain('npm ci')
    } finally {
      rmSync(targetDirPath, { force: true, recursive: true })
    }
  })
})
