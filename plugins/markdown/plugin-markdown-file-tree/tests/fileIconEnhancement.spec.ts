import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress/core'

import {
  FILE_ICON_SET,
  FILE_ICON_SET_PACKAGE,
  getUsedFileIcons,
  isFileIconEnhancementAvailable,
  prepareFileIconEntry,
} from '../src/node/fileIcons/iconify.js'

/**
 * Create an app with the given rendered contents
 *
 * 创建带有给定渲染内容的 app
 *
 * @param contents - Rendered contents of the pages / 页面的渲染内容
 * @returns Fake app / 伪造的 app
 */
const createApp = (contents: string[]): App =>
  ({
    pages: contents.map((contentRendered) => ({ contentRendered })),
    writeTemp: (name: string, content: string) =>
      Promise.resolve(`${name}\n${content}`),
  }) as unknown as App

describe(getUsedFileIcons, () => {
  it('should collect the icons of the rendered nodes', () => {
    const icons = getUsedFileIcons(
      createApp([
        '<VPFileTreeNode type="file" filename="a.ts" icon="vscode-icons:file-type-typescript"></VPFileTreeNode>',
        '<vp-file-tree-node type="folder" filename="src" icon="vscode-icons:folder-type-src"></vp-file-tree-node>',
      ]),
    )

    expect(icons).toStrictEqual([
      'vscode-icons:file-type-typescript',
      'vscode-icons:folder-type-src',
    ])
  })

  it('should collect every icon only once', () => {
    const node =
      '<VPFileTreeNode type="file" filename="a.ts" icon="vscode-icons:file-type-typescript"></VPFileTreeNode>'

    expect(getUsedFileIcons(createApp([node, node]))).toStrictEqual([
      'vscode-icons:file-type-typescript',
    ])
  })

  it('should not collect the icons of the other elements', () => {
    const icons = getUsedFileIcons(
      createApp([
        '<VPIcon icon="mdi:home"></VPIcon>',
        '<span icon="vscode-icons:file-type-vue"></span>',
      ]),
    )

    expect(icons).toStrictEqual([])
  })

  it('should not collect the icons of the HTML comments', () => {
    const icons = getUsedFileIcons(
      createApp([
        '<!-- <VPFileTreeNode icon="vscode-icons:file-type-vue"> -->',
      ]),
    )

    expect(icons).toStrictEqual([])
  })

  it('should skip the pages without content', () => {
    expect(getUsedFileIcons(createApp(['']))).toStrictEqual([])
  })
})

describe(prepareFileIconEntry, () => {
  it('should reduce the icon set to the icons in use', async () => {
    const entry = await prepareFileIconEntry(
      createApp([
        '<VPFileTreeNode type="file" filename="a.ts" icon="vscode-icons:file-type-typescript"></VPFileTreeNode>',
        '<VPFileTreeNode type="folder" filename="src" icon="vscode-icons:folder-type-src"></VPFileTreeNode>',
      ]),
    )

    expect(entry).toContain('markdown-file-tree/iconify.js')
    expect(entry).toContain('export const setupFileIcons = () => {')
    expect(entry).toContain('addCollection(')
    // Only the icons in use are registered
    expect(entry).toContain('file-type-typescript')
    expect(entry).toContain('folder-type-src')
    expect(entry).not.toContain('file-type-rust')
  })

  it('should register nothing without an icon in use', async () => {
    const entry = await prepareFileIconEntry(createApp(['<p>no icon</p>']))

    expect(entry).toContain('export const setupFileIcons = () => {')
    expect(entry).not.toContain('addCollection(')
  })

  it('should skip the icons the icon set does not provide', async () => {
    const entry = await prepareFileIconEntry(
      createApp([
        '<VPFileTreeNode icon="vscode-icons:file-type-nope"></VPFileTreeNode>',
      ]),
    )

    expect(entry).not.toContain('addCollection(')
    expect(entry).not.toContain('file-type-nope')
  })
})

describe('icon set', () => {
  it('should target the vscode-icons icon set', () => {
    expect(FILE_ICON_SET).toBe('vscode-icons')
    expect(FILE_ICON_SET_PACKAGE).toBe('@iconify-json/vscode-icons')
  })

  it('should detect the installed iconify packages', () => {
    expect(isFileIconEnhancementAvailable()).toBe(true)
  })
})
