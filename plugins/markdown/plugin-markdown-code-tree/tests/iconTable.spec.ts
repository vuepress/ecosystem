import fs from 'node:fs'
import path from 'node:path'

import { aliases, icons } from '@iconify-json/vscode-icons/icons.json'
import { describe, expect, it } from 'vitest'

import { extensions } from '../src/node/fileIcons/generated/extensions.js'
import { files } from '../src/node/fileIcons/generated/files.js'
import { folders } from '../src/node/fileIcons/generated/folders.js'
import { defaultFile, defaultFolder } from '../src/node/fileIcons/index.js'
import {
  extensions as overlayExtensions,
  files as overlayFiles,
  folders as overlayFolders,
} from '../src/node/fileIcons/overlay.js'

const PREFIX = 'vscode-icons:'

/**
 * Icon names that the Iconify collection provides
 *
 * The table is rendered by an iconify component, and a name that does not exist
 * is rendered as nothing, so every name has to be validated.
 *
 * Iconify 图标集中提供的图标名称
 *
 * 该表会由 iconify 组件渲染，不存在的名称会渲染为空白，因此所有名称都必须校验。
 */
const available = new Set<string>([
  ...Object.keys(icons),
  ...Object.keys(aliases),
])

/**
 * Generated lookups
 *
 * 生成的查询表
 */
const generated: Map<string, string>[] = [files, extensions, folders]

/**
 * Hand written patches
 *
 * 人工补丁
 */
const overlay: Record<string, string> = {
  ...overlayExtensions,
  ...overlayFiles,
  ...overlayFolders,
}

const allIcons: string[] = [
  ...new Set([
    ...generated.flatMap((index) => [...index.values()]),
    ...Object.values(overlay),
    defaultFile,
    defaultFolder,
  ]),
]

/**
 * Whether an icon name is provided by the collection
 *
 * @param name - Icon name / 图标名称
 * @returns Whether it is available / 是否可用
 */
const isAvailable = (name: string): boolean =>
  name.startsWith(PREFIX) && available.has(name.slice(PREFIX.length))

/**
 * Read the compact index text of a generated module
 *
 * @param name - Module name / 模块名称
 * @returns Index text / 索引文本
 */
const readGeneratedData = (name: string): string => {
  const source = fs.readFileSync(
    path.resolve(
      import.meta.dirname,
      `../src/node/fileIcons/generated/${name}.ts`,
    ),
    'utf-8',
  )

  return /^\s*`(?<data>[^`]*)`,$/mu.exec(source)!.groups!.data
}

/**
 * Count the keys listed in an index text
 *
 * @param data - Index text / 索引文本
 * @returns Number of listed keys / 列出的键的数量
 */
const countListedKeys = (data: string): number =>
  data
    .split('\n')
    .filter((line) => line !== '')
    .flatMap((line) => line.slice(line.indexOf(' ') + 1).split(' ')).length

describe('icon table', () => {
  it('should cover far more than a hand written table', () => {
    // The table is derived from a package, so it is expected to be large
    expect(files.size).toBeGreaterThan(1000)
    expect(extensions.size).toBeGreaterThan(500)
    expect(folders.size).toBeGreaterThan(300)
  })

  it('should only use icons that the collection provides', () => {
    expect(allIcons.filter((name) => !isAvailable(name))).toStrictEqual([])
  })

  it('should not map a key to an empty value', () => {
    const empty = [
      ...generated.flatMap((index) =>
        [...index.entries()].flatMap(([key, icon]) =>
          [key, icon].filter((value) => value === ''),
        ),
      ),
      ...Object.keys(overlay).filter((key) => key === ''),
      ...Object.values(overlay).filter((icon) => icon === ''),
    ]

    expect(empty).toStrictEqual([])
  })

  it('should parse the shared prefix of every icon name', () => {
    // The prefix is stripped when the table is generated, and added back when it
    // is parsed, so a wrong prefix would break every icon at once
    for (const index of [files, extensions]) {
      for (const icon of index.values())
        expect(icon).toMatch(/^vscode-icons:file-type-[a-z0-9-]+$/u)
    }

    for (const icon of folders.values())
      expect(icon).toMatch(/^vscode-icons:folder-type-[a-z0-9-]+$/u)
  })

  it('should not list the same key twice in the generated text', () => {
    // A `Map` silently overwrites a duplicate key, so the raw text is counted
    // instead: a duplicated key would make the counts differ
    for (const [name, index] of [
      ['files', files],
      ['extensions', extensions],
      ['folders', folders],
    ] as const) {
      const data = readGeneratedData(name)

      expect(data).not.toBe('')
      expect(countListedKeys(data)).toBe(index.size)
    }
  })

  it('should use a valid icon name in the overlay', () => {
    // The overlay is written by hand, so a typo would silently render nothing
    const invalid = Object.entries(overlay).filter(
      ([, icon]) => !isAvailable(icon),
    )

    expect(invalid).toStrictEqual([])
  })

  it('should only patch keys that the generated table does not cover', () => {
    // Otherwise the patch is redundant, and regenerating would not be the only
    // source of truth for it
    expect(
      Object.keys(overlayFiles).filter((key) => files.has(key)),
    ).toStrictEqual([])
    expect(
      Object.keys(overlayExtensions).filter((key) => extensions.has(key)),
    ).toStrictEqual([])
    expect(
      Object.keys(overlayFolders).filter((key) => folders.has(key)),
    ).toStrictEqual([])
  })
})
