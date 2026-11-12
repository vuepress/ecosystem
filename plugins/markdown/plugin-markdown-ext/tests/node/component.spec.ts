import markdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { component } from '../../src/node/markdown-it-plugins/component.js'

describe(component, () => {
  const md = markdownIt({ linkify: true }).use(component)

  it('should resolve component fence', () => {
    const result1 = md.render(
      `
\`\`\`component VPCard
title: A card
desc: A card desc
logo: https://example.com/logo.png
link: https://example.com
color: "#000"
\`\`\`
`,
      {},
    )

    const result2 = md.render(
      `
\`\`\`component VPCard
{
  "title": "A card",
  "desc": "A card desc",
  "logo": "https://example.com/logo.png",
  "link": "https://example.com",
  "color": "#000"
}
\`\`\`
`,
      {},
    )

    expect(result1).toContain('VPCard')
    expect(result1).toMatchSnapshot('yaml')
    expect(result2).toContain('VPCard')
    expect(result2).toMatchSnapshot('json')
  })

  it('should not throw with invalid syntax', () => {
    const result1 = md.render(
      `
\`\`\`component VPCard
title: a
title: b
\`\`\`
`,
      {},
    )

    const result2 = md.render(
      `
\`\`\`component VPCard
title: a
title: b
\`\`\`
`,
      {},
    )

    expect(result1).toBe('')
    expect(result2).toBe('')
  })

  it('should drop when receiving a invalid syntax', () => {
    const result = md.render(
      `
\`\`\`component VPCard
{a:1}
\`\`\`
`,
      {},
    )

    expect(result).toMatch('')
  })

  it('should not break markdown fence', () => {
    const result = md.render(
      `
\`\`\`js
const a = 1;
\`\`\`
`,
      {},
    )

    expect(result).toMatch(/<pre.*>[\s\S]*<\/pre>/u)
    expect(result).toMatchSnapshot()
  })
})
