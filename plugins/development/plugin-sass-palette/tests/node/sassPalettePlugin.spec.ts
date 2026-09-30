import path from 'node:path'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress/core'
import { fs } from 'vuepress/utils'

import {
  prepareClientConfigFile,
  prepareConfigSass,
  prepareInjectSass,
  preparePaletteSass,
} from '../../src/node/prepare/index.js'
import { sassPalettePlugin } from '../../src/node/sassPalettePlugin.js'
import { useSassPalettePlugin } from '../../src/node/useSassPalettePlugin.js'
import { getIdPrefix, PLUGIN_NAME } from '../../src/node/utils.js'

const EMPTY_FILE = path.resolve(import.meta.dirname, '../../styles/empty.scss')
const HELPER_FILE = path.resolve(
  import.meta.dirname,
  '../../styles/helper.scss',
)

describe(getIdPrefix, () => {
  it('should prefix a non-empty id', () => {
    expect(getIdPrefix('hope')).toBe('hope-')
    expect(getIdPrefix('')).toBe('')
  })
})

describe(prepareConfigSass, () => {
  it('should import the default config then the user config', async () => {
    const app = await createTestApp({
      files: { '.vuepress/styles/hope-config.scss': '$color: red;' },
    })

    try {
      const userConfig = app.dir.source('.vuepress/styles/hope-config.scss')
      const filepath = await prepareConfigSass(
        app,
        'hope',
        EMPTY_FILE,
        userConfig,
      )

      await expect(fs.readFile(filepath, 'utf-8')).resolves.toBe(
        `@import "file:///${EMPTY_FILE}";\n@import "file:///${userConfig}";\n`,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should fall back to the empty file for a missing path', async () => {
    const app = await createTestApp()

    try {
      const filepath = await prepareConfigSass(
        app,
        'missing',
        path.join(app.dir.source(), 'not-exist.scss'),
        path.join(app.dir.source(), 'also-not-exist.scss'),
      )

      await expect(fs.readFile(filepath, 'utf-8')).resolves.toBe(
        `@import "file:///${EMPTY_FILE}";\n@import "file:///${EMPTY_FILE}";\n`,
      )
    } finally {
      app.cleanup()
    }
  })
})

describe(preparePaletteSass, () => {
  it('should import the default palette, the user palette and the generator', async () => {
    const app = await createTestApp({
      files: { '.vuepress/styles/hope-palette.scss': '$x: 1;' },
    })

    try {
      const userPalette = app.dir.source('.vuepress/styles/hope-palette.scss')
      const filepath = await preparePaletteSass(app, {
        id: 'hope',
        defaultPalette: EMPTY_FILE,
        generator: HELPER_FILE,
        userPalette,
      })

      await expect(fs.readFile(filepath, 'utf-8')).resolves.toBe(
        `@import "file:///${EMPTY_FILE}";\n@import "file:///${userPalette}";\n@import "file:///${HELPER_FILE}";\n`,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should skip the default palette import when it is not given', async () => {
    const app = await createTestApp()

    try {
      const filepath = await preparePaletteSass(app, {
        id: '',
        generator: HELPER_FILE,
        userPalette: path.join(app.dir.source(), 'nope.scss'),
      })

      // the first line is empty because the default palette import is omitted
      await expect(fs.readFile(filepath, 'utf-8')).resolves.toBe(
        `\n@import "file:///${EMPTY_FILE}";\n@import "file:///${HELPER_FILE}";\n`,
      )
    } finally {
      app.cleanup()
    }
  })
})

describe(prepareInjectSass, () => {
  it('should inject the palette variables with the helper', async () => {
    const app = await createTestApp()

    try {
      const filepath = await prepareInjectSass(app, 'hope')

      await expect(fs.readFile(filepath, 'utf-8')).resolves.toBe(
        [
          '@use "sass:meta";',
          '@use "@sass-palette/helper";',
          '@use "@sass-palette/hope-palette";',
          '',
          '$palette-variables: meta.module-variables("hope-palette");',
          '',
          '',
          '@include helper.inject($palette-variables);',
          '',
        ].join('\n'),
      )
    } finally {
      app.cleanup()
    }
  })

  it('should add debug output in debug mode', async () => {
    const writes: Record<string, string> = {}
    const app = {
      env: { isDebug: true },
      writeTemp: (file: string, content: string): Promise<string> => {
        writes[file] = content
        return Promise.resolve(file)
      },
    } as unknown as App

    await prepareInjectSass(app, 'hope')

    expect(writes['sass-palette/hope-inject.scss']).toContain(
      '@debug "hope config variables:',
    )
    expect(writes['sass-palette/hope-inject.scss']).toContain(
      '@debug "hope palette variables:',
    )
  })
})

describe(prepareClientConfigFile, () => {
  it('should import the inject module and name the file after the id', async () => {
    const app = await createTestApp()

    try {
      const hookFile = await prepareClientConfigFile(app, 'hope')
      const defaultFile = await prepareClientConfigFile(app, '')

      expect(hookFile.endsWith('sass-palette/load-hope.js')).toBe(true)
      expect(defaultFile.endsWith('sass-palette/load-default.js')).toBe(true)

      await expect(fs.readFile(hookFile, 'utf-8')).resolves.toBe(
        'import "@sass-palette/hope-inject";\n',
      )
      await expect(fs.readFile(defaultFile, 'utf-8')).resolves.toBe(
        'import "@sass-palette/inject";\n',
      )
    } finally {
      app.cleanup()
    }
  })
})

describe(sassPalettePlugin, () => {
  it('should register the sass palette aliases and client config', async () => {
    const app = await createTestApp()
    const plugin = sassPalettePlugin({ id: 'hope' })(app)

    try {
      expect(plugin.name).toBe(PLUGIN_NAME)
      expect(plugin.multiple).toBe(true)

      const alias = plugin.alias as Record<string, string>

      expect(Object.keys(alias).sort()).toStrictEqual([
        '@sass-palette/helper',
        '@sass-palette/hope-config',
        '@sass-palette/hope-inject',
        '@sass-palette/hope-palette',
      ])

      expect(plugin.clientConfigFile).toBeTypeOf('function')

      const clientConfigFile = await prepareClientConfigFile(app, 'hope')

      expect(clientConfigFile.endsWith('sass-palette/load-hope.js')).toBe(true)
    } finally {
      app.cleanup()
    }
  })

  it('should write the config, inject and palette files on initialized', async () => {
    const app = await createTestApp()
    const plugin = sassPalettePlugin({ id: 'hope' })(app)

    try {
      await plugin.onInitialized?.(app)

      await expect(
        fs.pathExists(app.dir.temp('sass-palette/hope-config.scss')),
      ).resolves.toBe(true)
      await expect(
        fs.pathExists(app.dir.temp('sass-palette/hope-inject.scss')),
      ).resolves.toBe(true)
      await expect(
        fs.pathExists(app.dir.temp('sass-palette/hope-palette.scss')),
      ).resolves.toBe(true)
    } finally {
      app.cleanup()
    }
  })
})

describe(useSassPalettePlugin, () => {
  it('should register the plugin once per id', async () => {
    const app = await createTestApp()

    try {
      const count = (): number =>
        app.pluginApi.plugins.filter((plugin) => plugin.name === PLUGIN_NAME)
          .length

      expect(count()).toBe(0)

      useSassPalettePlugin(app, { id: 'hope' })
      expect(count()).toBe(1)

      // the same id is not registered twice
      useSassPalettePlugin(app, { id: 'hope' })
      expect(count()).toBe(1)

      useSassPalettePlugin(app, { id: 'other' })
      expect(count()).toBe(2)
    } finally {
      app.cleanup()
    }
  })
})
