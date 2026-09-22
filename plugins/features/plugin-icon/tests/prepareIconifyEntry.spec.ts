import { fileURLToPath } from 'node:url'

import { describe, expect, it, vi } from 'vitest'
import type { App } from 'vuepress/core'

import { prepareIconifyEntry } from '../src/node/prepareIconifyEntry.js'
import { logger } from '../src/node/utils.js'

// whether the packages are installed is out of scope here
const packageMocks = vi.hoisted(() => ({
  isIconifyInstalled: vi.fn<() => boolean>(() => true),
  isIconifySetInstalled: vi.fn<() => boolean>(() => true),
}))

vi.mock(import('../src/node/getIconifyOffline.js'), async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    ...packageMocks,
  }
})

// the icon sets are real packages, they are linked to the package itself so
// that they are available while testing
const PACKAGE_DIR = fileURLToPath(new URL('..', import.meta.url))

const createApp = (
  pages: { contentRendered?: string; template?: string }[] = [],
  isDev = false,
): App => {
  const app = {
    dir: { source: (): string => PACKAGE_DIR },
    env: { isDev },
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

describe(prepareIconifyEntry, () => {
  it('should bundle the icons of the pages', async () => {
    const app = createApp([
      {
        contentRendered:
          '<VPIcon icon="mdi:home" /><VPIcon icon="mdi:account" />',
      },
    ])

    await prepareIconifyEntry(app, { offline: true })

    expect(getAppOutput(app)).toContain('"prefix":"mdi"')
    expect(getAppOutput(app)).toContain('"home"')
    expect(getAppOutput(app)).toContain('"account"')
    // the unused icons are not bundled
    expect(getAppOutput(app)).not.toContain('"beer"')
  })

  it('should use the `prefix` option for the icons without a prefix', async () => {
    const app = createApp([{ contentRendered: '<VPIcon icon="home" />' }])

    await prepareIconifyEntry(app, { offline: true, prefix: 'mdi:' })

    expect(getAppOutput(app)).toContain('"prefix":"mdi"')
    expect(getAppOutput(app)).toContain('"home"')
  })

  it('should merge the icons of the scanner', async () => {
    const app = createApp([{ contentRendered: '<VPIcon icon="mdi:home" />' }])

    await prepareIconifyEntry(app, {
      scan: { scanner: () => Promise.resolve(['mdi:account']) },
    })

    expect(getAppOutput(app)).toContain('"home"')
    expect(getAppOutput(app)).toContain('"account"')
  })

  it('should ignore what the scanner returns wrongly', async () => {
    const app = createApp()

    await prepareIconifyEntry(app, {
      scan: { scanner: () => ['mdi:home', 1, null] as unknown as string[] },
    })

    expect(getAppOutput(app)).toContain('"home"')
  })

  it('should skip the icons that their icon set does not provide', async () => {
    const app = createApp([
      { contentRendered: '<VPIcon icon="mdi:not-an-icon" />' },
    ])

    await prepareIconifyEntry(app, { offline: true })

    // no icon set is registered at all
    expect(getAppOutput(app)).not.toContain('addCollection({')
  })

  it('should warn about the icons without an icon set', async () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {})
    const app = createApp([{ contentRendered: '<VPIcon icon="home" />' }])

    await prepareIconifyEntry(app, { offline: true })

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('do not have an icon set'),
    )

    warnSpy.mockRestore()
  })

  it('should ignore image icons silently', async () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {})
    const app = createApp([
      {
        contentRendered:
          '<VPIcon icon="/images/logo.svg" /><VPIcon icon="mdi:home" />',
      },
    ])

    await prepareIconifyEntry(app, { offline: true })

    // an image icon is a supported usage, it must not be reported as an icon
    // without an icon set
    expect(warnSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('do not have an icon set'),
    )
    expect(getAppOutput(app)).toContain('"home"')

    warnSpy.mockRestore()
  })

  it('should ignore the icons in HTML comments', async () => {
    const app = createApp([
      {
        contentRendered: `\
<!-- <VPIcon icon="mdi:beer" /> -->
<VPIcon icon="mdi:home" />`,
      },
    ])

    await prepareIconifyEntry(app, { offline: true })

    expect(getAppOutput(app)).toContain('"home"')
    expect(getAppOutput(app)).not.toContain('"beer"')
  })

  it('should detect the kebab-case form of the component', async () => {
    const app = createApp([{ contentRendered: '<my-icon icon="mdi:home" />' }])

    await prepareIconifyEntry(app, { component: 'MyIcon', offline: true })

    expect(getAppOutput(app)).toContain('"home"')
  })

  it('should warn when no icon is detected', async () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {})
    const app = createApp()

    await prepareIconifyEntry(app, { offline: true })

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('No Iconify icon is detected'),
    )

    warnSpy.mockRestore()
  })

  it('should bundle the icons of several icon sets', async () => {
    const app = createApp([
      {
        contentRendered:
          '<VPIcon icon="mdi:home" /><VPIcon icon="lucide:house" />',
      },
    ])

    await prepareIconifyEntry(app, { offline: true })

    expect(getAppOutput(app)).toContain('"prefix":"lucide"')
    expect(getAppOutput(app)).toContain('"prefix":"mdi"')
  })

  it('should block the Iconify API in the dev server', async () => {
    const app = createApp(
      [{ contentRendered: '<VPIcon icon="mdi:home" />' }],
      true,
    )

    await prepareIconifyEntry(app, { offline: true })

    expect(getAppOutput(app)).toContain('_api?.setFetch?.(')
  })

  it('should not block the Iconify API in a build', async () => {
    const app = createApp([{ contentRendered: '<VPIcon icon="mdi:home" />' }])

    await prepareIconifyEntry(app, { offline: true })

    expect(getAppOutput(app)).not.toContain('_api')
  })

  it('should fail when the web component is missing', async () => {
    packageMocks.isIconifyInstalled.mockReturnValueOnce(false)

    const app = createApp([{ contentRendered: '<VPIcon icon="mdi:home" />' }])

    await expect(prepareIconifyEntry(app, { offline: true })).rejects.toThrow(
      'iconify-icon',
    )
  })

  it('should fail when an icon set package is missing', async () => {
    packageMocks.isIconifySetInstalled.mockReturnValueOnce(false)

    const app = createApp([{ contentRendered: '<VPIcon icon="mdi:home" />' }])

    await expect(prepareIconifyEntry(app, { offline: true })).rejects.toThrow(
      '@iconify-json/mdi',
    )
  })

  it('should use the given component name', async () => {
    const app = createApp([{ contentRendered: '<MyIcon icon="mdi:home" />' }])

    await prepareIconifyEntry(app, { component: 'MyIcon', offline: true })

    expect(getAppOutput(app)).toContain('"home"')
  })
})
