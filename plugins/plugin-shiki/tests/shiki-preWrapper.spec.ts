import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import {
  highlightLinesPlugin,
  lineNumberPlugin,
  preWrapperPlugin,
} from '../src/node/markdown/index.js'
import { resolveHighlight } from '../src/node/resolveHighlight.js'
import type {
  LineNumberOptions,
  PreWrapperOptions,
  ShikiHighlightOptions,
} from '../src/node/types.js'

const createMarkdown = async ({
  preWrapper = true,
  lineNumbers = true,
  ...options
}: LineNumberOptions &
  PreWrapperOptions &
  ShikiHighlightOptions = {}): Promise<MarkdownIt> => {
  const md = MarkdownIt()
  md.options.highlight = await resolveHighlight(options)

  md.use(highlightLinesPlugin)
  md.use<PreWrapperOptions>(preWrapperPlugin, { preWrapper })
  if (preWrapper) {
    md.use<LineNumberOptions>(lineNumberPlugin, { lineNumbers })
  }
  return md
}

const codeFence = '```'

describe('@vuepress/plugin-shiki > fence preWrapper', () => {
  describe('plugin options', () => {
    const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}ts
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts title="config/foo.ts" foo="foo" {1,2-4,5-5}
const foo = 'foo'

function bar () {
  return 1024
}

const baz = () => {
  return 2048
}
${codeFence}

${codeFence}ts
console.log('1 + 2 + 3 =' + {{ 1 + 2 + 3 }})
${codeFence}

${codeFence}{{ inlineCode }}${codeFence}
`

    it('should process code fences with default options', async () => {
      const md = await createMarkdown()

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `highlightLines`', async () => {
      const md = await createMarkdown({
        highlightLines: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `lineNumbers`', async () => {
      const md = await createMarkdown({
        lineNumbers: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should enable `lineNumbers` according to number of code lines', async () => {
      const md = await createMarkdown({
        lineNumbers: 4,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should disable `preWrapper`', async () => {
      const md = await createMarkdown({
        preWrapper: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should always disable `lineNumbers` if `preWrapper` is disabled', async () => {
      const mdWithLineNumbers = await createMarkdown({
        lineNumbers: true,
        preWrapper: false,
      })
      const mdWithoutLineNumbers = await createMarkdown({
        lineNumbers: false,
        preWrapper: false,
      })

      expect(mdWithLineNumbers.render(source)).toBe(
        mdWithoutLineNumbers.render(source),
      )
    })
  })

  describe(':line-numbers / :no-line-numbers', () => {
    const source = `\
${codeFence}
Raw text
${codeFence}

${codeFence}:line-numbers
Raw text
${codeFence}

${codeFence}:no-line-numbers
Raw text
${codeFence}

${codeFence}ts
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts:no-line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts{1,2}:line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}

${codeFence}ts title="config/foo.ts" foo="foo" {1,2}:no-line-numbers
const foo = 'foo'

function bar () {
  return 1024
}
${codeFence}
`

    it('should work properly if `lineNumbers` is enabled by default', async () => {
      const md = await createMarkdown({
        lineNumbers: true,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work properly if `lineNumbers` is disabled by default', async () => {
      const md = await createMarkdown({
        lineNumbers: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work properly if `lineNumbers` is set to a number by default', async () => {
      const md = await createMarkdown({
        lineNumbers: 4,
      })

      expect(md.render(source)).toMatchSnapshot()
    })
  })

  describe(':line-numbers=number', () => {
    const source = `\
${codeFence}ts:line-numbers=2
const line2 = 'line 2'
const line3 = 'line 3'
${codeFence}

${codeFence}ts{2,3}:line-numbers=3
const line3 = 'line 3'
const line4 = 'line 4'
const line5 = 'line 5'
${codeFence}

${codeFence}ts title="config/foo.ts" foo="foo" {1,2}:line-numbers=10
const line10 = 'line 10'
const line11 = 'line 11'
${codeFence}
`
    it('should work properly if `lineNumbers` is enabled by default', async () => {
      const md = await createMarkdown({
        lineNumbers: true,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work properly if `lineNumbers` is disabled by default', async () => {
      const md = await createMarkdown({
        lineNumbers: false,
      })

      expect(md.render(source)).toMatchSnapshot()
    })

    it('should work properly if `lineNumbers` is set to a number by default', async () => {
      const md = await createMarkdown({
        lineNumbers: 4,
      })

      expect(md.render(source)).toMatchSnapshot()
    })
  })

  describe('notation transformers', () => {
    const source = `\
${codeFence}ts
const foo = 'foo' // [!code highlight]
const bar = 'bar' // [!code ++]
const baz = 'baz' // [!code --]
const bax = 'bax' // [!code warning]
const buz = 'buz' // [!code error]
const qux = 'qux' // [!code focus]
${codeFence}

${codeFence}ts
// [!code highlight:3]
const foo = 'foo'
const bar = 'bar'
${codeFence}
`
    it('should work notation enabled', async () => {
      const md = await createMarkdown({
        notationDiff: true,
        notationErrorLevel: true,
        notationFocus: true,
        notationHighlight: true,
      })

      expect(md.render(source)).toMatchSnapshot()
    })
  })
})
