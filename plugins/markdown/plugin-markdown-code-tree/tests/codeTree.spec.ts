import { container } from '@mdit/plugin-container'
import { codeBlockTitle } from '@vuepress/highlighter-helper'
import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { codeTree } from '../src/node/codeTree.js'

describe(codeTree, () => {
  const markdownIt = new MarkdownIt({ linkify: true }).use(codeTree)

  it('should render code tree', () => {
    const content = `\
::: code-tree title="Vue App" height="400px" entry="src/main.ts"
\`\`\`ts title="src/utils.ts"
export const foo = 'foo'
\`\`\`

\`\`\`ts title="src/main.ts"
console.log('main')
\`\`\`

\`\`\`json title="package.json"
{}
\`\`\`
:::
`
    const result = markdownIt.render(content)

    expect(result).toContain(
      '<CodeTree title="Vue App" height="400px" entry="src/main.ts">',
    )
    expect(result).toContain('<template #file-tree>')
    expect(result).toContain('</CodeTree>')
    expect(result).toMatchSnapshot()
  })

  it('should build file tree from file paths', () => {
    const content = `\
::: code-tree
\`\`\`vue title="src/components/HelloWorld.vue"
\`\`\`

\`\`\`vue title="src/App.vue"
\`\`\`

\`\`\`ts title="src/main.ts"
\`\`\`

\`\`\`json title="package.json"
\`\`\`
:::
`
    const result = markdownIt.render(content)

    expect(result).toContain(
      '<CodeTree height="320px" entry="src/components/HelloWorld.vue">',
    )
    expect(result).toContain(
      '<CodeTreeFileNode path="src" type="folder" icon="vscode-icons:folder-type-src">',
    )
    expect(result).toContain(
      '<CodeTreeFileNode path="src/App.vue" type="file" icon="vscode-icons:file-type-vue">',
    )
    expect(result).toContain(
      '<CodeTreeFileNode path="src/main.ts" type="file" icon="vscode-icons:file-type-typescript">',
    )
    expect(result).toContain(
      '<CodeTreeFileNode path="package.json" type="file" icon="vscode-icons:file-type-node">',
    )
  })

  it('should use the file marked with :active as entry', () => {
    const content = `\
::: code-tree entry="src/index.ts"
\`\`\`ts title="src/index.ts"
\`\`\`

\`\`\`ts title="src/utils.ts" :active
\`\`\`
:::
`
    const result = markdownIt.render(content)

    expect(result).toContain('<CodeTree height="320px" entry="src/utils.ts">')
  })

  it('should fallback to the first file when entry does not exist', () => {
    const content = `\
::: code-tree entry="src/not-exist.ts"
\`\`\`ts title="src/index.ts"
\`\`\`

\`\`\`ts title="src/utils.ts"
\`\`\`
:::
`
    const result = markdownIt.render(content)

    expect(result).toContain('<CodeTree height="320px" entry="src/index.ts">')
  })

  it('should ignore code blocks without title', () => {
    const content = `\
::: code-tree
\`\`\`ts
const foo = 'foo'
\`\`\`

\`\`\`ts title="src/index.ts"
\`\`\`
:::
`
    const result = markdownIt.render(content)

    expect(result).toContain('<CodeTree height="320px" entry="src/index.ts">')
    expect(result).toContain(
      '<CodeTreeFileNode path="src" type="folder" icon="vscode-icons:folder-type-src">',
    )
    // Only the code block with a title is added to the file tree
    expect(result.match(/<CodeTreeFileNode/gu)).toHaveLength(2)
  })

  it('should not render file tree when no code block has title', () => {
    const content = `\
::: code-tree
\`\`\`ts
const foo = 'foo'
\`\`\`
:::
`
    const result = markdownIt.render(content)

    expect(result).toContain('<CodeTree height="320px">')
    expect(result).not.toContain('file-tree')
  })

  it('should not be broken by nested containers', () => {
    const markdown = new MarkdownIt({ linkify: true }).use(codeTree)

    // A nested container, whose content is tokenized as usual blocks
    container(markdown, {
      name: 'hint',
      openRenderer: () => '<div class="hint">',
      closeRenderer: () => '</div>',
    })

    const content = `\
:::: code-tree entry="src/index.ts"
::: hint
A nested container.
:::

\`\`\`ts title="src/index.ts"
\`\`\`
::::
`
    const result = markdown.render(content)

    expect(result).toContain('<CodeTree height="320px" entry="src/index.ts">')
    expect(result).toContain('A nested container.')
    expect(result).toContain('path="src/index.ts"')
  })

  it('should escape attributes', () => {
    const content = `\
::: code-tree title="A & B"
\`\`\`ts title="a&b.ts"
\`\`\`
:::
`
    const result = markdownIt.render(content)

    expect(result).toContain('<CodeTree title="A &amp; B"')
    expect(result).toContain('path="a&amp;b.ts"')
  })

  it('should support a number height', () => {
    const markdown = new MarkdownIt({ linkify: true }).use(codeTree, {
      height: 400,
    })

    expect(markdown.render('::: code-tree\n:::\n')).toContain('height="400px"')
  })

  it('should treat a bare number height of the container as pixels', () => {
    const markdown = new MarkdownIt({ linkify: true }).use(codeTree)

    expect(markdown.render('::: code-tree height="400"\n:::\n')).toContain(
      'height="400px"',
    )
    expect(markdown.render('::: code-tree height="40%"\n:::\n')).toContain(
      'height="40%"',
    )
  })

  it('should trim the file path of a code block', () => {
    const content = `\
::: code-tree
\`\`\`ts title=" src/index.ts "
\`\`\`
:::
`
    const result = markdownIt.render(content)

    // Keep it in sync with the rendered code block title
    expect(result).toContain('<CodeTree height="320px" entry="src/index.ts">')
    expect(result).toContain('path="src/index.ts"')
    expect(result).toContain('icon="vscode-icons:file-type-typescript"')
  })

  it('should apply the default height', () => {
    expect(markdownIt.render('::: code-tree\n:::\n')).toContain(
      'height="320px"',
    )
  })

  it('should work with the code block title of the highlighter', () => {
    // The client relies on the markup rendered by the highlighter, which wraps
    // the code block with a `.code-block-with-title` element.
    const markdown = new MarkdownIt({ linkify: true })
      .use(codeBlockTitle, { codeBlockTitle: true })
      .use(codeTree)

    const result = markdown.render(`\
::: code-tree entry="src/index.ts"
\`\`\`ts title="src/index.ts"
export const foo = 'foo'
\`\`\`
:::
`)

    expect(result).toContain(
      '<div class="code-block-title-bar" data-title="src/index.ts">',
    )
    // The wrapper is a direct child of the code tree, which is required by the
    // styles that hide the inactive code blocks
    expect(result).toMatch(
      /<CodeTree[^>]*>(?:<template #file-tree>.*?<\/template>)?<div class="code-block-with-title">/su,
    )
    expect(result).toContain('</CodeTree>')
  })

  it('should not affect other containers', () => {
    const result = markdownIt.render('::: file-tree\n- src\n:::\n')

    expect(result).not.toContain('<CodeTree')
  })
})
