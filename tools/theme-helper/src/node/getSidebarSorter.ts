import { isArray, isFunction, isString, keys } from '@vuepress/helper'

import type {
  SidebarInfo,
  SidebarSorter,
  SidebarSorterFunction,
} from '../shared/index.js'

/**
 * Put the `README.md` of a directory in front of the other items
 *
 * 将目录的 `README.md` 排在其它条目之前
 *
 * @param infoA - First sidebar item / 第一个侧边栏条目
 * @param infoB - Second sidebar item / 第二个侧边栏条目
 * @returns The comparison result / 比较结果
 */
export const sidebarReadmeSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo,
): number => {
  if (infoA.type === 'file' && infoA.filename.toLowerCase() === 'readme.md')
    return -1

  if (infoB.type === 'file' && infoB.filename.toLowerCase() === 'readme.md')
    return 1

  return 0
}

/**
 * Sort the items by their `order` frontmatter
 *
 * Positive orders are sorted in ascending order before the items without order,
 * negative orders are sorted after them.
 *
 * 按条目的 `order` frontmatter 排序
 *
 * 正序按升序排在未设置顺序的条目之前，负序排在它们之后。
 *
 * @param infoA - First sidebar item / 第一个侧边栏条目
 * @param infoB - Second sidebar item / 第二个侧边栏条目
 * @returns The comparison result / 比较结果
 */
export const sidebarOrderSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo,
): number => {
  // itemA order is absent
  if (infoA.order == null) {
    // both item do not have orders
    if (infoB.order == null) return 0

    // itemA order is absent while itemB order is present
    return infoB.order
  }

  // itemA order is present while itemB order is absent
  if (infoB.order == null) return -infoA.order

  // now we are sure both orders exist

  // itemA order is positive
  if (infoA.order > 0) {
    // both orders are positive
    if (infoB.order > 0) return infoA.order - infoB.order

    // infoA.order is positive while infoB.order is negative
    return -1
  }

  // both orders are negative
  if (infoB.order < 0) return infoA.order - infoB.order

  // infoA.order is negative while infoB.order is positive
  return 1
}

/**
 * Sort the items by their `date` frontmatter in ascending order
 *
 * 按条目的 `date` frontmatter 升序排序
 *
 * @param infoA - First sidebar item / 第一个侧边栏条目
 * @param infoB - Second sidebar item / 第二个侧边栏条目
 * @returns The comparison result / 比较结果
 */
export const sidebarDateSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo,
): number => {
  if (infoA.frontmatter?.date instanceof Date) {
    if (infoB.frontmatter?.date instanceof Date)
      return infoA.frontmatter.date.getTime() - infoB.frontmatter.date.getTime()

    return -1
  }

  if (infoB.frontmatter?.date instanceof Date) return 1

  return 0
}

/**
 * Sort the items by their `date` frontmatter in descending order
 *
 * 按条目的 `date` frontmatter 降序排序
 *
 * @param infoA - First sidebar item / 第一个侧边栏条目
 * @param infoB - Second sidebar item / 第二个侧边栏条目
 * @returns The comparison result / 比较结果
 */
export const sidebarDateDescSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo,
): number => {
  if (infoA.frontmatter?.date instanceof Date) {
    if (infoB.frontmatter?.date instanceof Date)
      return infoB.frontmatter.date.getTime() - infoA.frontmatter.date.getTime()

    return -1
  }

  if (infoB.frontmatter?.date instanceof Date) return 1

  return 0
}

const getFilename = (info: SidebarInfo): string =>
  info.type === 'file' ? info.filename.replace(/\.md$/u, '') : info.dirname

/**
 * Sort the items by their file or directory name
 *
 * Files are sorted before directories with the same name.
 *
 * 按文件或目录名排序
 *
 * 同名时文件排在目录之前。
 *
 * @param infoA - First sidebar item / 第一个侧边栏条目
 * @param infoB - Second sidebar item / 第二个侧边栏条目
 * @returns The comparison result / 比较结果
 */
export const sidebarFilenameSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo,
): number => {
  const result = getFilename(infoA).localeCompare(
    getFilename(infoB),
    undefined,
    {
      numeric: true,
      sensitivity: 'accent',
    },
  )

  if (result !== 0) return result

  if (infoA.type === 'file' && infoB.type === 'dir') return -1
  if (infoA.type === 'dir' && infoB.type === 'file') return 1

  return 0
}

/**
 * Sort the items by their title
 *
 * 按条目标题排序
 *
 * @param infoA - First sidebar item / 第一个侧边栏条目
 * @param infoB - Second sidebar item / 第二个侧边栏条目
 * @returns The comparison result / 比较结果
 */
export const sidebarTitleSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo,
): number =>
  infoA.title.localeCompare(infoB.title, undefined, {
    numeric: true,
  })

const sortKeyMap: Record<string, SidebarSorterFunction> = {
  'readme': sidebarReadmeSorter,
  'order': sidebarOrderSorter,
  'date': sidebarDateSorter,
  'date-desc': sidebarDateDescSorter,
  'filename': sidebarFilenameSorter,
  'title': sidebarTitleSorter,
}

const availableKeywords = keys(sortKeyMap)

/**
 * Get the sorter functions from the sidebar sorter option
 *
 * The `readme`, `order`, `title` and `filename` sorters are used by default.
 *
 * 从侧边栏排序器选项中获取排序函数
 *
 * 默认使用 `readme`、`order`、`title` 和 `filename` 排序器。
 *
 * @param sorter - Sorter option / 排序器选项
 * @returns The sorter functions / 排序函数
 */
export const getSidebarSorter = (
  sorter?: SidebarSorter,
): SidebarSorterFunction[] => {
  if (isString(sorter) && availableKeywords.includes(sorter))
    return [sortKeyMap[sorter]]

  if (isFunction(sorter)) return [sorter]

  if (isArray(sorter)) {
    const result = sorter
      .map((item) => (isString(item) ? sortKeyMap[item] : item))
      .filter((item) => isFunction(item))

    if (result.length > 0) return result
  }

  return [
    sidebarReadmeSorter,
    sidebarOrderSorter,
    sidebarTitleSorter,
    sidebarFilenameSorter,
  ]
}
