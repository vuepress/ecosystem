import { readFileSync } from 'node:fs'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { prepareClientConfigFile } from '../../src/node/prepare/prepareClientConfigFile.js'

describe('markdown math client config', () => {
  it('imports the katex stylesheet for katex', async () => {
    const app = await createTestApp({})

    try {
      const file = await prepareClientConfigFile(app, 'katex', {
        type: 'katex',
      })
      const content = readFileSync(file, 'utf-8')

      expect(content).toContain('katex/dist/katex.min.css')
      expect(content).not.toContain('useKatexCopy')
    } finally {
      app.cleanup()
    }
  })

  it('registers the katex copy composable only when copy is enabled', async () => {
    const app = await createTestApp({})

    try {
      const file = await prepareClientConfigFile(app, 'katex', {
        type: 'katex',
        copy: true,
      })
      const content = readFileSync(file, 'utf-8')

      expect(content).toContain('useKatexCopy')
      expect(content).toContain('setup:')
    } finally {
      app.cleanup()
    }
  })

  it('imports the generated mathjax stylesheet for mathjax', async () => {
    const app = await createTestApp({})

    try {
      const file = await prepareClientConfigFile(app, 'mathjax', {
        type: 'mathjax',
      })

      expect(readFileSync(file, 'utf-8')).toContain("import './mathjax.css';")
    } finally {
      app.cleanup()
    }
  })
})
