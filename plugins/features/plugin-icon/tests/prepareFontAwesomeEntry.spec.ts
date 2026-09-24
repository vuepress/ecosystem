import { fileURLToPath } from 'node:url'

import { describe, expect, it, vi } from 'vitest'
import type { App } from 'vuepress/core'

import { prepareFontAwesomeEntry } from '../src/node/prepareFontAwesomeEntry.js'

// whether the optional peer packages are installed is out of scope here
const packageMocks = vi.hoisted(() => ({
  isFontAwesomeInstalled: vi.fn<() => boolean>(() => true),
  isFontAwesomeStyleInstalled: vi.fn<() => boolean>(() => true),
}))

vi.mock(
  import('../src/node/getFontAwesomeOffline.js'),
  async (importOriginal) => {
    const actual = await importOriginal()

    return {
      ...actual,
      ...packageMocks,
    }
  },
)

// the packages are optional peer dependencies, they are linked to the package
// itself so that they are available while testing
const PACKAGE_DIR = fileURLToPath(new URL('..', import.meta.url))

const createApp = (
  pages: { contentRendered?: string; template?: string }[] = [],
): App => {
  const app = {
    dir: { source: (): string => PACKAGE_DIR },
    pages: pages.map(({ contentRendered = '', template }) => ({
      contentRendered,
      sfcBlocks: { template: template ? { content: template } : null },
    })),
    writeTemp: vi.fn<(filePath: string, content: string) => Promise<string>>(
      (filePath, content) => {
        app.output = content

        return Promise.resolve(filePath)
      },
    ),
    output: '',
  }

  return app as unknown as App
}

const getAppOutput = (app: App): string =>
  (app as unknown as { output: string }).output

describe(prepareFontAwesomeEntry, () => {
  it('should fail when a required package is missing', async () => {
    packageMocks.isFontAwesomeStyleInstalled.mockReturnValueOnce(false)

    const app = createApp([
      { contentRendered: '<VPIcon icon="brands:apple" />' },
    ])

    await expect(
      prepareFontAwesomeEntry(app, { offline: true }, false),
    ).rejects.toThrow('@fortawesome/free-brands-svg-icons')
  })

  it('should fail when the core package is missing', async () => {
    packageMocks.isFontAwesomeInstalled.mockReturnValueOnce(false)

    const app = createApp([{ contentRendered: '<VPIcon icon="house" />' }])

    await expect(
      prepareFontAwesomeEntry(app, { offline: true }, false),
    ).rejects.toThrow('@fortawesome/fontawesome-svg-core')
  })

  it('should bundle the icons of the pages', async () => {
    const app = createApp([
      {
        contentRendered:
          '<VPIcon icon="house" /><VPIcon icon="brands:apple" />',
      },
    ])

    await prepareFontAwesomeEntry(app, { offline: true }, false)

    expect(getAppOutput(app)).toContain(
      '@fortawesome/free-brands-svg-icons/faApple',
    )
    expect(getAppOutput(app)).toContain(
      '@fortawesome/free-solid-svg-icons/faHouse',
    )
    expect(getAppOutput(app)).toContain('library.add(faApple, faHouse);')
    // the packages are resolved from the plugin, as the entry lives in the temp
    // folder of the site which may not see them
    expect(getAppOutput(app)).not.toContain('from "@fortawesome/')
  })

  it('should merge the icons of the scanner', async () => {
    const app = createApp([{ contentRendered: '<VPIcon icon="house" />' }])

    await prepareFontAwesomeEntry(
      app,
      { scan: { scanner: () => Promise.resolve(['regular:clock']) } },
      false,
    )

    expect(getAppOutput(app)).toContain(
      '@fortawesome/free-regular-svg-icons/faClock',
    )
    expect(getAppOutput(app)).toContain('library.add(faClock, faHouse);')
  })

  it('should ignore what the scanner returns wrongly', async () => {
    const app = createApp()

    await prepareFontAwesomeEntry(
      app,
      { scan: { scanner: () => ['house', 1, null] as unknown as string[] } },
      false,
    )

    expect(getAppOutput(app)).toContain('library.add(faHouse);')
  })

  it('should skip the icons that FontAwesome does not provide', async () => {
    const app = createApp([
      { contentRendered: '<VPIcon icon="not-an-icon" />' },
    ])

    await prepareFontAwesomeEntry(app, { offline: true }, false)

    expect(getAppOutput(app)).toContain('library.add();')
    expect(getAppOutput(app)).not.toContain('not-an-icon')
  })

  it('should handle the extra classes in any order', async () => {
    const app = createApp([
      {
        contentRendered: `\
<VPIcon icon="house fa-sm" />
<VPIcon icon="fa-rotate-180 fa-house" />
<VPIcon icon="fa-spin fas fa-user" />`,
      },
    ])

    await prepareFontAwesomeEntry(app, { offline: true }, false)

    expect(getAppOutput(app)).toContain('library.add(faHouse, faUser);')
  })

  it('should skip the icons of other libraries', async () => {
    const app = createApp([{ contentRendered: '<VPIcon icon="mdi:home" />' }])

    await prepareFontAwesomeEntry(app, { offline: true }, false)

    expect(getAppOutput(app)).toContain('library.add();')
    expect(getAppOutput(app)).not.toContain('mdi')
  })

  it('should bundle every style when all icons are bundled', async () => {
    const app = createApp([
      { contentRendered: '<VPIcon icon="not-an-icon" />' },
    ])

    await prepareFontAwesomeEntry(app, { offline: 'all' }, true)

    expect(getAppOutput(app)).toContain('@fortawesome/free-brands-svg-icons')
    expect(getAppOutput(app)).toContain('@fortawesome/free-regular-svg-icons')
    expect(getAppOutput(app)).toContain('@fortawesome/free-solid-svg-icons')
    expect(getAppOutput(app)).toContain('library.add(fab, far, fas);')
  })

  it('should use the given component name', async () => {
    const app = createApp([{ contentRendered: '<MyIcon icon="house" />' }])

    await prepareFontAwesomeEntry(
      app,
      { component: 'MyIcon', offline: true },
      false,
    )

    expect(getAppOutput(app)).toContain('library.add(faHouse);')
  })
})
