import { describe, expect, it, vi } from 'vitest'
import type { App } from 'vuepress/core'

import { prepareArtPlayerEntry } from '../../src/node/prepareArtPlayerEntry.js'

const createApp = (): App =>
  ({
    options: { lang: 'en-US', locales: {} },
    pages: [],
    writeTemp: vi.fn<(path: string, content: string) => Promise<string>>(
      (_, content) => Promise.resolve(content),
    ),
  }) as unknown as App

describe(prepareArtPlayerEntry, () => {
  it('should not resolve artplayer when it is disabled', async () => {
    const app = createApp()

    const content = await prepareArtPlayerEntry(app, false)

    // `artplayer` is an optional peer, so a disabled Artplayer must not resolve
    // it: doing so fails the build with ERR_MODULE_NOT_FOUND when it is absent.
    expect(content).not.toContain('artplayer')
    expect(content).toContain('export default undefined')
    expect(content).toContain('export const i18n = {}')
  })

  it('should resolve artplayer when it is enabled', async () => {
    const app = createApp()

    const content = await prepareArtPlayerEntry(app, true)

    expect(content).toContain('import Artplayer from')
    expect(content).toContain('export default Artplayer')
  })
})
