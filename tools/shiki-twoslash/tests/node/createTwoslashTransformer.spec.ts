import type { ShikiTwoslashOptions } from '@vuepress/shiki-twoslash'
import { describe, expect, it } from 'vitest'

import { createTwoslashTransformer } from '../../src/node/createTwoslashTransformer.js'

const runPostprocess = (
  transformer: Awaited<ReturnType<typeof createTwoslashTransformer>>,
  meta: Record<string, unknown>,
  html: string,
): string =>
  (
    transformer.postprocess as unknown as (
      this: { meta: Record<string, unknown> },
      html: string,
    ) => string
  ).call({ meta }, html)

describe(createTwoslashTransformer, () => {
  it('returns a transformer named vuepress:twoslash', async () => {
    const transformer = await createTwoslashTransformer()

    expect(transformer.name).toBe('vuepress:twoslash')
  })

  it('enables the explicit trigger by default', async () => {
    const options: ShikiTwoslashOptions = {}

    await createTwoslashTransformer(options)

    expect(options.explicitTrigger).toBe(true)
  })

  it('keeps an explicit false trigger', async () => {
    const options: ShikiTwoslashOptions = { explicitTrigger: false }

    await createTwoslashTransformer(options)

    expect(options.explicitTrigger).toBe(false)
  })

  it('escapes braces when the block was processed by twoslash', async () => {
    const transformer = await createTwoslashTransformer()

    expect(
      runPostprocess(transformer, { twoslash: true }, '<pre>{ a: 1 }</pre>'),
    ).toBe('<pre>&#123; a: 1 }</pre>')
  })

  it('leaves braces untouched when the block was not processed by twoslash', async () => {
    const transformer = await createTwoslashTransformer()

    expect(runPostprocess(transformer, {}, '<pre>{ a: 1 }</pre>')).toBe(
      '<pre>{ a: 1 }</pre>',
    )
  })
})
