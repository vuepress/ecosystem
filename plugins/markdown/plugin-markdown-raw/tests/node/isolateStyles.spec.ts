import postcss from 'postcss'
import { describe, expect, it } from 'vitest'

import { postcssIsolateStyles } from '../../src/node/isolateStyles.js'
import type { IsolateStylesOptions } from '../../src/node/isolateStyles.js'

const ISOLATION_PREFIX = ':not(:where(.vp-raw, .vp-raw *))'

const processCss = (
  css: string,
  from = 'theme/styles/base.css',
  options: IsolateStylesOptions = {},
): Promise<string> =>
  postcss([postcssIsolateStyles(options)])
    .process(css, { from })
    .then((result) => result.css)

describe(postcssIsolateStyles, () => {
  it('should prefix selectors of the default matched files', async () => {
    await expect(
      processCss('.vp-doc h1 { color: red; }', 'base.css'),
    ).resolves.toBe(`.vp-doc h1${ISOLATION_PREFIX} { color: red; }`)

    await expect(
      processCss('.vp-doc h1 { color: red; }', 'vp-doc.css'),
    ).resolves.toBe(`.vp-doc h1${ISOLATION_PREFIX} { color: red; }`)
  })

  it('should not touch unmatched files', async () => {
    const css = '.vp-doc h1 { color: red; }'

    await expect(processCss(css, 'other.css')).resolves.toBe(css)
  })

  it('should not touch selectors that are already isolated', async () => {
    const css = `.vp-doc h1${ISOLATION_PREFIX} { color: red; }`

    await expect(processCss(css, 'base.css')).resolves.toBe(css)
  })

  it('should not touch keyframes rules', async () => {
    const css = '@keyframes spin { from { opacity: 0; } to { opacity: 1; } }'

    await expect(processCss(css, 'base.css')).resolves.toBe(css)
  })

  it('should support custom include files', async () => {
    await expect(
      processCss('h1 { color: red; }', 'custom.css', {
        includeFiles: [/custom\.css/u],
      }),
    ).resolves.toBe(`h1${ISOLATION_PREFIX} { color: red; }`)
  })

  it('should support custom ignore files', async () => {
    const css = '.vp-doc h1 { color: red; }'

    await expect(
      processCss(css, 'base.css', { ignoreFiles: [/base\.css/u] }),
    ).resolves.toBe(css)
  })

  it('should support a custom prefix', async () => {
    const prefix = ':not(:where(.isolated, .isolated *))'

    await expect(
      processCss('h1 { color: red; }', 'base.css', { prefix }),
    ).resolves.toBe(`h1${prefix} { color: red; }`)
  })

  it('should handle complex selectors and nested rules', async () => {
    const css = [
      'a:hover { color: red; }',
      '.vp-doc :is(h1, h2)::before { content: ""; }',
      '@media (min-width: 640px) { .vp-doc > .box + .box { margin: 0; } }',
      'html, body { margin: 0; }',
      '::selection { color: red; }',
    ].join('\n')

    const result = await processCss(css, 'vp-doc.css')

    expect(result).toContain(`a${ISOLATION_PREFIX}:hover`)
    expect(result).toContain(`.vp-doc ${ISOLATION_PREFIX}:is(h1, h2)::before`)
    expect(result).toContain(`.box${ISOLATION_PREFIX}`)
    expect(result).toContain(`html${ISOLATION_PREFIX}`)
    expect(result).toContain(`body${ISOLATION_PREFIX}`)
    expect(result).toContain(`${ISOLATION_PREFIX}::selection`)
  })

  it('should isolate files without a file path', async () => {
    const result = await postcss([postcssIsolateStyles()]).process(
      '.vp-doc h1 { color: red; }',
    )

    expect(result.css).toBe(`.vp-doc h1${ISOLATION_PREFIX} { color: red; }`)
  })

  it('should isolate all files when includeFiles is empty', async () => {
    await expect(
      processCss('h1 { color: red; }', 'other.css', { includeFiles: [] }),
    ).resolves.toBe(`h1${ISOLATION_PREFIX} { color: red; }`)
  })

  it('should be idempotent', async () => {
    const once = await processCss('.vp-doc h1 { color: red; }', 'base.css')
    const twice = await processCss(once, 'base.css')

    expect(twice).toBe(once)
  })
})
