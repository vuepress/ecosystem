import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress/core'

import { prepareClientConfigFile } from '../../src/node/prepare/prepareClientConfigFile.js'

/**
 * A stub app that returns the generated content instead of writing it
 *
 * @returns The stub app / 桩 app
 */
const createApp = (): App =>
  ({
    writeTemp: (_filePath: string, content: string): Promise<string> =>
      Promise.resolve(content),
  }) as unknown as App

describe('reveal.js client config file', () => {
  it('should register the component and the config injection', async () => {
    const content = await prepareClientConfigFile(createApp(), [], 'SlidePage')

    expect(content).toContain('app.component("RevealJs", RevealJs)')
    expect(content).toContain('injectRevealJsConfig(app)')
    expect(content).toContain('layouts: { "SlidePage": SlidePage }')
  })

  it('should import the theme and its fonts', async () => {
    const content = await prepareClientConfigFile(createApp(), ['beige'], false)

    expect(content).toMatch(/themes\/beige\.css/u)
    expect(content).toMatch(/fonts\/lato\.css/u)
  })

  it('should not repeat a theme or a font', async () => {
    const content = await prepareClientConfigFile(
      createApp(),
      ['beige', 'beige'],
      false,
    )

    expect(content.match(/themes\/beige\.css/gu)).toHaveLength(1)
    expect(content.match(/fonts\/lato\.css/gu)).toHaveLength(1)
  })

  it('should not register a layout when the layout is disabled', async () => {
    const content = await prepareClientConfigFile(createApp(), [], false)

    expect(content).not.toContain('SlidePage')
  })

  it('should always import the base theme assets', async () => {
    const content = await prepareClientConfigFile(createApp(), [], false)

    expect(content).toMatch(/reveal\.js\/dist\/reveal\.css/u)
    expect(content).toContain('styles/vars.css')
    expect(content).toContain('styles/themes/base.css')
    expect(content).toMatch(/fonts\/league-gothic\.css/u)
    expect(content).toMatch(/fonts\/source-sans-pro\.css/u)
  })
})
