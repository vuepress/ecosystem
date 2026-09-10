import { defaultFile, defaultFolder } from './generated/defaults.js'
import { extensions as generatedExtensions } from './generated/extensions.js'
import { files as generatedFiles } from './generated/files.js'
import { folders as generatedFolders } from './generated/folders.js'
import {
  extensions as overlayExtensions,
  files as overlayFiles,
  folders as overlayFolders,
} from './overlay.js'
import type { IconIndex, IconMap } from './types.js'

/**
 * Build a lookup from a generated reverse index and the overlay
 *
 * The overlay wins, so that a patch is never lost when the table is
 * regenerated.
 *
 * 根据生成的反查索引与补丁构建查询表
 *
 * 补丁的优先级更高，因此重新生成表时补丁不会丢失。
 *
 * @param index - Generated reverse index / 生成的反查索引
 * @param overlay - Hand written patches / 人工补丁
 * @returns Key to icon name lookup / 键到图标名称的查询表
 */
const createLookup = (
  index: IconIndex,
  overlay: IconMap,
): Map<string, string> => {
  const lookup = new Map<string, string>()

  for (const [icon, keys] of Object.entries(index))
    for (const key of keys) lookup.set(key, icon)

  for (const [key, icon] of Object.entries(overlay)) lookup.set(key, icon)

  return lookup
}

const files = createLookup(generatedFiles, overlayFiles)
const extensions = createLookup(generatedExtensions, overlayExtensions)
const folders = createLookup(generatedFolders, overlayFolders)

/**
 * Resolve the icon of a file from its extension
 *
 * The longest extension wins, so that `index.spec.ts` is resolved by `spec.ts`
 * before `ts`.
 *
 * 从文件的扩展名解析文件的图标
 *
 * 最长匹配优先，因此 `index.spec.ts` 会先用 `spec.ts` 解析，而不是 `ts`。
 *
 * @example
 *   getFileIconByExtension('index.spec.ts') // 'vscode-icons:file-type-testts'
 *
 * @param fileName - File name / 文件名称
 * @returns The icon name, or `null` when there is no match / 图标名称，没有匹配时返回
 *   `null`
 */
export const getFileIconByExtension = (fileName: string): string | null => {
  const segments = fileName.toLowerCase().split('.')

  for (let index = 1; index < segments.length; index++) {
    const icon = extensions.get(segments.slice(index).join('.'))

    if (icon) return icon
  }

  return null
}

/**
 * Resolve the icon of a file or a folder
 *
 * A file is resolved by its full name first, then by its extension.
 *
 * 解析文件或文件夹的图标
 *
 * 文件会先用完整名称解析，再用扩展名解析。
 *
 * @example
 *   getFileIcon('src', 'folder') // 'vscode-icons:folder-type-src'
 *   getFileIcon('src/main.ts') // 'vscode-icons:file-type-typescript'
 *
 * @default type 'file'
 * @param fileName - Name of the file or the folder / 文件或文件夹的名称
 * @param type - Type of the node / 节点类型
 * @returns The icon name / 图标名称
 */
export const getFileIcon = (
  fileName: string,
  type: 'file' | 'folder' = 'file',
): string => {
  // Only the name of the file matters, its directories do not
  const name = fileName.slice(fileName.lastIndexOf('/') + 1).toLowerCase()

  if (type === 'folder') return folders.get(name) ?? defaultFolder

  return files.get(name) ?? getFileIconByExtension(name) ?? defaultFile
}
