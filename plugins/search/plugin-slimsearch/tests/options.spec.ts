import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'

import { slimsearchPlugin } from '../src/node/index.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(import.meta.dirname, './__fixtures__/src'),
  theme: emptyTheme,
})

await app.init()

// Read the options that the plugin injects into the client
const getClientOptions = (
  options: Parameters<typeof slimsearchPlugin>[0] = {},
): { suggestion?: boolean } => {
  const plugin = slimsearchPlugin(options)(app)

  return (plugin.define as Record<string, { suggestion?: boolean }>)
    .__SLIMSEARCH_OPTIONS__
}

describe(slimsearchPlugin, () => {
  it('should enable suggestions by default', () => {
    expect(getClientOptions().suggestion).toBe(true)
  })

  it('should forward the suggestion option to the client', () => {
    // The search box is shared by every search plugin, so the flag has to be
    // injected by each of them instead of being a compile-time global
    expect(getClientOptions({ suggestion: false }).suggestion).toBe(false)
  })
})
