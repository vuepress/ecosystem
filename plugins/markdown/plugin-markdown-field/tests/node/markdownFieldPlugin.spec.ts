import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import type { App, PluginFunction } from 'vuepress/core'
import type { MarkdownOptions } from 'vuepress/markdown'

import { markdownFieldPlugin } from '../../src/node/markdownFieldPlugin.js'

const createApp = (markdown: MarkdownOptions): App =>
  ({
    options: {
      debug: false,
      lang: 'en-US',
      locales: {},
      markdown,
    },
    writeTemp: (_name: string, content: string) => Promise.resolve(content),
  }) as unknown as App

const render = (markdown: MarkdownOptions, source: string): string => {
  const plugin = (markdownFieldPlugin({ fields: true }) as PluginFunction)(
    createApp(markdown),
  )
  const md = new MarkdownIt()

  void plugin.extendsMarkdown?.(md, createApp(markdown))

  return md.render(source)
}

const SOURCE = `::: fields
@theme@ type="object"
Theme config
:::
`

describe(markdownFieldPlugin, () => {
  it('should use the anchor slugify function for field ids', () => {
    expect(
      render({ anchor: { slugify: (str) => `anchor-${str}` } }, SOURCE),
    ).toContain('id="anchor-theme"')
  })

  it('should fall back to the markdown slugify function', () => {
    expect(render({ slugify: (str) => `markdown-${str}` }, SOURCE)).toContain(
      'id="markdown-theme"',
    )
  })

  it('should prefer the anchor slugify function over the markdown one', () => {
    expect(
      render(
        {
          anchor: { slugify: (str) => `anchor-${str}` },
          slugify: (str) => `markdown-${str}`,
        },
        SOURCE,
      ),
    ).toContain('id="anchor-theme"')
  })

  it('should fall back to the default slugify function', () => {
    expect(render({}, SOURCE)).toContain('id="theme"')
  })

  it('should fall back to the markdown slugify function when anchor is disabled', () => {
    expect(
      render({ anchor: false, slugify: (str) => `markdown-${str}` }, SOURCE),
    ).toContain('id="markdown-theme"')
  })
})
