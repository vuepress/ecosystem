import { describe, expect, it, vi } from 'vitest'
import type { PluginObject } from 'vuepress/core'
import type { Markdown } from 'vuepress/markdown'
import { logger } from 'vuepress/utils'

import { createTestApp } from '../../src/node/createTestApp.js'
import { createTestMarkdown } from '../../src/node/createTestMarkdown.js'
import { mockLogger } from '../../src/node/mockLogger.js'

describe(createTestMarkdown, () => {
  it('should create a markdown-it instance with vuepress defaults', () => {
    const md = createTestMarkdown()

    expect(md.render('# Title', {})).toContain('<h1 id="title"')
  })

  it('should support vuepress markdown options', () => {
    const md = createTestMarkdown({ markdownOptions: { anchor: false } })

    expect(md.render('# Title', {})).not.toContain('id="title"')
  })

  it('should apply the given markdown-it plugins', () => {
    const plugin = (md: Markdown): void => {
      md.renderer.rules.test_rule = (): string => 'mocked'
    }

    expect(
      createTestMarkdown({ plugins: [plugin] }).renderer.rules.test_rule,
    ).toBeDefined()
  })

  it('should apply the markdown extensions of the plugins of a test app', async () => {
    const app = await createTestApp({
      plugins: [
        (): PluginObject => ({
          extendsMarkdown: (md) => {
            md.renderer.rules.test_rule = (): string => 'mocked'
          },
          name: 'test-markdown-plugin',
        }),
      ],
    })

    expect(app.markdown.renderer.rules.test_rule).toBeDefined()

    app.cleanup()
  })
})

describe(mockLogger, () => {
  it('should silence the logs and collect the calls', () => {
    const { restore, warn } = mockLogger()

    logger.warn('a warning')

    expect(warn).toHaveBeenCalledWith('a warning')

    restore()
  })

  it('should restore the logger', () => {
    const { restore } = mockLogger()

    expect(vi.isMockFunction(logger.warn)).toBe(true)

    restore()

    expect(vi.isMockFunction(logger.warn)).toBe(false)
  })
})
