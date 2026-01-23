import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import { llmExcludePlugin } from '../src/node/markdown-it-plugins/llm-exclude'

describe('@vuepress/plugin-llms > llmExcludePlugin', () => {
  const md = MarkdownIt().use(llmExcludePlugin)

  it('should render inline empty content', () => {
    expect(md.render('<llm-exclude></llm-exclude>')).toBe('<p></p>\n')
  })

  it('should render inline content', () => {
    expect(md.render('<llm-exclude>foo</llm-exclude>')).toBe('<p>foo</p>\n')
    expect(md.render('<llm-exclude> **foo** </llm-exclude>')).toBe(
      '<p> <strong>foo</strong> </p>\n',
    )
  })

  it('should render block content', () => {
    expect(md.render(`foo\n\n<llm-exclude>\nbar\n</llm-exclude>`)).toBe(
      '<p>foo</p>\n<p>\nbar\n</p>\n',
    )

    expect(md.render(`<llm-exclude>\nbar\n</llm-exclude>\n\nfoo`)).toBe(
      '<p>\nbar\n</p>\n<p>foo</p>\n',
    )
  })
})
