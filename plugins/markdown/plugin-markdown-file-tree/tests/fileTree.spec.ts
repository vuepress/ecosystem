import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import { fileTree } from '../src/node/fileTree.js'

describe(fileTree, () => {
  const markdownIt = new MarkdownIt({ linkify: true }).use(fileTree)

  it('should render basic file tree', () => {
    const content = `
::: file-tree
- file1.js
- file2.ts
:::
`
    const result = markdownIt.render(content)
    expect(result).toContain('<div class="vp-file-tree">')
    expect(result).toContain('filename="file1.js"')
    expect(result).toContain('filename="file2.ts"')
    expect(result).toContain('type="file"')
    expect(result).toMatchSnapshot()
  })

  it('should render nested structure', () => {
    const content = `
::: file-tree
- folder/
  - file1.js
- file2.ts
:::
`
    const result = markdownIt.render(content)
    expect(result).toContain('type="folder"')
    expect(result).toContain('filename="folder"')
    expect(result).toContain('level="1"')
    // folder/ implies collapsed
    expect(result).not.toContain('expanded')
    expect(result).toMatchSnapshot()
  })

  it('should render expanded folder', () => {
    const content = `
::: file-tree
- folder
  - file.js
:::
`
    const result = markdownIt.render(content)
    expect(result).toContain('expanded')
    expect(result).toMatchSnapshot()
  })

  it('should render with title', () => {
    const content = `
::: file-tree My Project
- file.txt
:::
`
    const result = markdownIt.render(content)
    expect(result).toContain('<div class="file-tree-title">My Project</div>')
    expect(result).toMatchSnapshot()
  })

  it('should handle comments', () => {
    const content = `
::: file-tree
- file.js # This is a comment
:::
`
    const result = markdownIt.render(content)
    expect(result).toContain('This is a comment')
    expect(result).toMatchSnapshot()
  })

  it('should handle focus', () => {
    const content = `
::: file-tree
- **file.js**
:::
`
    const result = markdownIt.render(content)
    expect(result).toContain('focus')
    expect(result).toMatchSnapshot()
  })

  it('should handle diff', () => {
    const content = `
::: file-tree
- ++ added.js
- -- removed.js
:::
`
    const result = markdownIt.render(content)
    expect(result).toContain('diff="add"')
    expect(result).toContain('diff="remove"')
    expect(result).toMatchSnapshot()
  })

  it('should handle empty folder with ellipsis', () => {
    const content = `
::: file-tree
- empty-folder/
:::
`
    const result = markdownIt.render(content)
    expect(result).toContain('filename="…"')
    expect(result).toMatchSnapshot()
  })
})
