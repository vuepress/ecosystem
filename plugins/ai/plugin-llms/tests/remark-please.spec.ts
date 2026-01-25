import { remark } from 'remark'
import { describe, expect, it } from 'vitest'
import { remarkPlease } from '../src/node/remark-plugins/remarkPlease.js'

describe('@vuepress/plugin-llms > remarkPlease > unwrap', () => {
  const instance = remark().use(remarkPlease('unwrap', 'llm-only'))

  it('should unwrap content from a single HTML node', () => {
    const content = '<llm-only>Special text for LLMs</llm-only>'
    expect(instance.processSync(content).toString()).toBe(
      'Special text for LLMs\n',
    )
  })

  it('should unwrap content between separate HTML nodes', () => {
    const content = '<llm-only>\n\n## Special section for LLMs\n\n</llm-only>'
    expect(instance.processSync(content).toString()).toBe(
      '## Special section for LLMs\n',
    )
  })

  it('should handle multiple blocks of content', () => {
    const content =
      '<llm-only>First block</llm-only>\n\nRegular content\n\n<llm-only>Second block</llm-only>'
    expect(instance.processSync(content).toString()).toBe(
      'First block\n\nRegular content\n\nSecond block\n',
    )
  })
})

describe('@vuepress/plugin-llms > remarkPlease > remove', () => {
  const instance = remark().use(remarkPlease('remove', 'llm-exclude'))

  it('should remove a single HTML node with content', () => {
    const content = '<llm-exclude>\n## Section to remove\n</llm-exclude>'
    expect(instance.processSync(content).toString()).toBe('')
  })

  it('should remove content between separate HTML nodes', () => {
    const content = '<llm-exclude>\n\n## Section to remove\n\n</llm-exclude>'
    expect(instance.processSync(content).toString()).toBe('')
  })

  it('should remove multiple blocks', () => {
    const content =
      '<llm-exclude>First block to remove</llm-exclude>\n\nKeep this content\n\n<llm-exclude>Second block to remove</llm-exclude>\n\n<llm-exclude>Third block to remove</llm-exclude>'
    expect(instance.processSync(content).toString()).toBe('Keep this content\n')
  })
})
