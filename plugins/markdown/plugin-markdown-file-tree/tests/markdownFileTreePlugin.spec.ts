import { describe, expect, it } from 'vitest'
import type { App, Page, PluginFunction, PluginObject } from 'vuepress/core'

import { markdownFileTreePlugin } from '../src/node/markdownFileTreePlugin.js'
import { prepareClientConfigFile } from '../src/node/prepareClientConfigFile.js'

const createPlugin = (
  options: Parameters<typeof markdownFileTreePlugin>[0] = {},
): PluginObject =>
  (markdownFileTreePlugin(options) as PluginFunction)({
    dir: { source: () => '/source' },
  } as unknown as App)

const createApp = (): App =>
  ({
    writeTemp: (_name: string, content: string) => Promise.resolve(content),
  }) as unknown as App

describe(markdownFileTreePlugin, () => {
  it('should provide the plugin name', () => {
    expect(createPlugin().name).toBe('@vuepress/plugin-markdown-file-tree')
  })

  it('should return a minimal plugin when no feature is enabled', () => {
    expect(Object.keys(createPlugin())).toStrictEqual(['name'])
    expect(
      Object.keys(createPlugin({ fileTree: false, codeTree: false })),
    ).toStrictEqual(['name'])
  })

  it('should only register the file tree hooks', () => {
    const plugin = createPlugin({ fileTree: true })

    expect(plugin.extendsMarkdown).toBeTypeOf('function')
    expect(plugin.clientConfigFile).toBeTypeOf('function')
    // Only the embedded code tree reads files from the source directory
    expect(plugin.extendsPage).toBeUndefined()
  })

  it('should only register the code tree hooks', () => {
    const plugin = createPlugin({ codeTree: true })

    expect(plugin.extendsMarkdown).toBeTypeOf('function')
    expect(plugin.clientConfigFile).toBeTypeOf('function')
    expect(plugin.extendsPage).toBeTypeOf('function')
  })

  it('should add the embedded files to the page dependencies', async () => {
    const plugin = createPlugin({ codeTree: true })
    const page = {
      deps: [],
      markdownEnv: { codeTreeFiles: ['/source/a.ts', '/source/b.ts'] },
    } as unknown as Page

    await plugin.extendsPage?.(page, {} as App)

    expect(page.deps).toStrictEqual(['/source/a.ts', '/source/b.ts'])
  })

  it('should not add anything without embedded files', async () => {
    const plugin = createPlugin({ codeTree: true })
    const page = { deps: [], markdownEnv: {} } as unknown as Page

    await plugin.extendsPage?.(page, {} as App)

    expect(page.deps).toStrictEqual([])
  })
})

describe(prepareClientConfigFile, () => {
  it('should register the file tree without the code tree', async () => {
    const content = await prepareClientConfigFile(createApp(), {
      fileTree: true,
    })

    expect(content).toContain("app.component('FileTree'")
    expect(content).toContain("app.component('FileTreeNode'")
    expect(content).not.toContain('CodeTree')
  })

  it('should register the code tree without the file tree', async () => {
    const content = await prepareClientConfigFile(createApp(), {
      codeTree: true,
    })

    expect(content).toContain("app.component('CodeTree'")
    expect(content).toContain("app.component('FileTreeNode'")
    expect(content).not.toContain("app.component('FileTree'")
  })
})
