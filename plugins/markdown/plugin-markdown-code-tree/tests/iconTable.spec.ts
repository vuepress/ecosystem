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
import type { IconIndex } from '../src/node/fileIcons/types.js'

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

const generated: IconIndex[] = [files, extensions, folders]

const overlay: Record<string, string> = {
  ...overlayExtensions,
  ...overlayFiles,
  ...overlayFolders,
}

const allIcons: string[] = [
  ...new Set([
    ...generated.flatMap((index) => Object.keys(index)),
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
 * Count the keys of a reverse index
 *
 * @param index - Reverse index / 反查索引
 * @returns Number of keys / 键的数量
 */
const countKeys = (index: IconIndex): number =>
  Object.values(index).reduce((sum, keys) => sum + keys.length, 0)

describe('icon table', () => {
  it('should cover far more than a hand written table', () => {
    // The table is derived from a package, so it is expected to be large
    expect(countKeys(files)).toBeGreaterThan(1000)
    expect(countKeys(extensions)).toBeGreaterThan(500)
    expect(countKeys(folders)).toBeGreaterThan(300)
  })

  it('should only use icons that the collection provides', () => {
    expect(allIcons.filter((name) => !isAvailable(name))).toStrictEqual([])
  })

  it('should not map a key to an empty value', () => {
    const empty = generated.flatMap((index) =>
      Object.entries(index).flatMap(([icon, keys]) =>
        [icon, ...keys].filter((value) => value === ''),
      ),
    )

    expect(empty).toStrictEqual([])
    expect(Object.keys(overlay).filter((key) => key === '')).toStrictEqual([])
  })

  it('should not map the same key twice in a category', () => {
    for (const index of generated) {
      const keys = Object.values(index).flat()

      expect(new Set(keys).size).toBe(keys.length)
    }
  })

  it('should use a valid icon name in the overlay', () => {
    // The overlay is written by hand, so a typo would silently render nothing
    const invalid = Object.entries(overlay).filter(
      ([, icon]) => !isAvailable(icon),
    )

    expect(invalid).toStrictEqual([])
  })
})
