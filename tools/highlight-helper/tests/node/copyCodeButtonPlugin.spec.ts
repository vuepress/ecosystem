import MarkdownIt from 'markdown-it'
import { describe, expect, it, vi } from 'vitest'
import type { App } from 'vuepress'
import { copyCodeButtonPlugin } from '../../src/node/copy-code-button/copyCodeButtonPlugin.js'

const createApp = () =>
  ({
    siteData: {
      lang: 'en-US',
      locales: {},
    },
    env: {},
  }) as App

describe('@vuepress/highlight-helper -> copyCodeButtonPlugin', () => {
  it('should work', () => {
    const app = createApp()
    const md = MarkdownIt()
    const originalFence = md.renderer.rules.fence!
    const mockFence = vi.fn((...args) => {
      const result = originalFence(...args)
      return `<div class="wrapper">${result}</div>`
    })
    md.renderer.rules.fence = mockFence
    copyCodeButtonPlugin(md, app)

    const source = `\
\`\`\`js
const a = 1
\`\`\`
`

    expect(md.render(source)).toBe(`\
<div class="wrapper"><button class="copy" title="Copy code" data-copied="Copied"></button><pre><code class="language-js">const a = 1
</code></pre>
</div>`)
    expect(mockFence).toBeCalledTimes(1)
  })
})
