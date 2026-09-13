import { describe, expect, it } from 'vitest'
import type { App, Page, PluginFunction, PluginObject } from 'vuepress/core'

import { markdownCodeTreePlugin } from '../src/node/markdownCodeTreePlugin.js'

const createPlugin = (): PluginObject =>
  (markdownCodeTreePlugin() as PluginFunction)({
    dir: { source: () => '/source' },
  } as unknown as App)

describe(markdownCodeTreePlugin, () => {
  it('should provide the plugin name', () => {
    expect(createPlugin().name).toBe('@vuepress/plugin-markdown-code-tree')
  })

  it('should register the markdown extensions', () => {
    const plugin = createPlugin()

    expect(plugin.extendsMarkdown).toBeTypeOf('function')
    expect(plugin.clientConfigFile).toContain('client/config.js')
  })

  it('should add the embedded files to the page dependencies', async () => {
    const plugin = createPlugin()
    const page = {
      deps: [],
      markdownEnv: { codeTreeFiles: ['/source/a.ts', '/source/b.ts'] },
    } as unknown as Page

    await plugin.extendsPage?.(page, {} as App)

    expect(page.deps).toStrictEqual(['/source/a.ts', '/source/b.ts'])
  })

  it('should not add anything without embedded files', async () => {
    const plugin = createPlugin()
    const page = { deps: [], markdownEnv: {} } as unknown as Page

    await plugin.extendsPage?.(page, {} as App)

    expect(page.deps).toStrictEqual([])
  })
})
