import { startsWith } from '@vuepress/helper'
import type { Page } from 'vuepress/core'
import { path } from 'vuepress/utils'

/**
 * Information of a page file in the structure
 *
 * 结构中页面文件的信息
 */
export interface StructureFileInfo {
  /**
   * Type of the item
   *
   * 条目类型
   */
  type: 'file'

  /**
   * Name of the file
   *
   * 文件名
   */
  filename: string

  /**
   * Path of the file relative to the scope
   *
   * 文件相对于范围的路径
   */
  path: string
}

/**
 * Information of a directory in the structure
 *
 * 结构中目录的信息
 */
export interface StructureDirInfo {
  /**
   * Type of the item
   *
   * 条目类型
   */
  type: 'dir'

  /**
   * Name of the directory
   *
   * 目录名
   */
  dirname: string

  /**
   * Path of the directory relative to the scope
   *
   * 目录相对于范围的路径
   */
  path: string

  /**
   * Children of the directory
   *
   * 目录的子项
   */
  children: StructureInfo[]
}

/**
 * Information of an item in the file structure
 *
 * 文件结构中条目的信息
 */
export type StructureInfo = StructureDirInfo | StructureFileInfo

/**
 * Get the file structure of pages inside a scope
 *
 * 获取范围内页面的文件结构
 *
 * @param pages - Pages of the site / 站点的页面
 * @param scope - File path scope, should have no leading slash and end with a
 *   slash, e.g. `guide/` or an empty string for the root directory /
 *   文件路径范围，不应以斜线开头并应以斜线结尾，例如 `guide/`，根目录为空字符串
 * @returns The file structure of the scope / 范围的文件结构
 */
export const getStructureInfo = (
  pages: Page[],
  scope: string,
): StructureInfo[] => {
  const relatedPages = pages.filter(
    ({ filePathRelative, pathLocale }) =>
      // Generated from file and inside current scope
      startsWith(filePathRelative, scope) &&
      // Filter other locales in root dir
      (scope !== '' || pathLocale === '/'),
  )

  const sortedPages = relatedPages.sort(
    (
      { filePathRelative: filePathRelative1 },
      { filePathRelative: filePathRelative2 },
    ) =>
      filePathRelative1!.localeCompare(filePathRelative2!, undefined, {
        numeric: true,
        sensitivity: 'accent',
      }),
  )

  const structure: StructureInfo[] = []

  sortedPages.forEach((page) => {
    const relativePath = path.relative(scope, page.filePathRelative!)
    const filename = path.basename(relativePath)

    let currentDir = structure
    const levels = relativePath.split('/')

    levels.forEach((level, index) => {
      // It's a file
      if (index === levels.length - 1) {
        currentDir.push({ type: 'file', filename, path: relativePath })
      } else {
        // It's a directory
        const result = currentDir.find(
          (item): item is StructureDirInfo =>
            item.type === 'dir' && item.dirname === level,
        )

        if (result) {
          currentDir = result.children
        } else {
          const dirInfo: StructureDirInfo = {
            type: 'dir',
            dirname: level,
            path: levels.slice(0, index + 1).join('/'),
            children: [],
          }

          currentDir.push(dirInfo)
          currentDir = dirInfo.children
        }
      }
    })
  })

  return structure
}
