import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { revealJs } from '../../src/node/revealJs.js'

const demo = `
## Slide 1

A paragraph with some text and a [link](https://mister-hope.com)

---

## Slide 2

- Item 1
- Item 2

---

## Slide 3.1

\`\`\`js
const a = 1;
\`\`\`

--

## Slide 3.2

$$
J(\\theta_0,\\theta_1) = \\sum_{i=0}
$$
`

describe(revealJs, () => {
  const markdownIt = new MarkdownIt({ linkify: true }).use(revealJs)

  it('should render', () => {
    const renderResult = markdownIt.render(`
@slidestart
${demo}
@slideend
`)

    expect(renderResult).toMatch(
      /<RevealJs code=".*?" theme=".*?"><\/RevealJs>/u,
    )
    expect(renderResult).toMatchSnapshot()
  })

  it('should not render', () => {
    const cases = [
      `
${demo}
`,
      `
@slidestar
${demo}
@slideend
`,
    ]

    cases.forEach((caseContent) => {
      const result = markdownIt.render(caseContent)

      expect(result).not.toContain('RevealJs')
    })
  })
})
