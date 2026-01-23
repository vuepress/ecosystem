import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import { llmOnlyPlugin } from '../src/node/markdown-it-plugins/llm-only'

describe('@vuepress/plugin-llms > llmOnlyPlugin', () => {
  const md = MarkdownIt().use(llmOnlyPlugin)

  it('should render inline empty content', () => {
    expect(md.render('<llm-only></llm-only>')).toBe('')
  })

  it('should render inline content', () => {
    expect(
      md.render(`\
<llm-only>foo</llm-only>

bar
`),
    ).toBe('<p>bar</p>\n')
    expect(
      md.render(`\
foo

<llm-only>bar</llm-only>
`),
    ).toBe('<p>foo</p>\n')
  })

  it('should render block content', () => {
    expect(
      md.render(`\
<llm-only>
</llm-only>
`),
    ).toBe('')

    expect(
      md.render(`\
foo

<llm-only>
bar
</llm-only>
`),
    ).toBe('<p>foo</p>\n')

    expect(
      md.render(`\
<llm-only>
bar
</llm-only>

foo
`),
    ).toBe('<p>foo</p>\n')
  })
})
