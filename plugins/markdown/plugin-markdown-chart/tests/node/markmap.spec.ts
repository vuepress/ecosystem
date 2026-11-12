import markdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { markmap } from '../../src/node/markdown-it-plugins/markmap.js'

const content = `\
---
markmap:
  colorDepth: 2
---

# markmap

## Links

- <https://markmap.js.org/>
- [GitHub](https://github.com/markmap/markmap)

## Features

- links
- **strong** ~~del~~ *italic* ==highlight==
- multiline
  text
- \`inline code\`
-
    \`\`\`js
    const a = 1;
    \`\`\`
- Katex
  - $x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$
- Now we can wrap very very very very long text based on \`wrapWidth\` option
`

describe('markmap plugin', () => {
  const md = markdownIt({ linkify: true }).use(markmap)

  it('should render ```markmap', () => {
    const renderResult = md.render(`
\`\`\`\`markmap
${content}
\`\`\`\`
`)

    expect(renderResult).toMatch(/<MarkMap content="[^"]*?"><\/MarkMap>/u)
    expect(renderResult).toMatchSnapshot()
  })

  it('should not render', () => {
    expect(
      md.render(`
${content}
`),
    ).toMatchSnapshot('without fence')

    expect(
      md.render(`
\`\`\`md
${content}
\`\`\`
`),
    ).toMatchSnapshot('wrong fence')
  })
})
