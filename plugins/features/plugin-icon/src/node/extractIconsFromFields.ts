import { isArray, isString } from '@vuepress/helper'

import { logger } from './utils.js'

/**
 * Path segment of a field, where `[*]` matches every element of an array
 *
 * 字段的路径片段，其中 `[*]` 匹配数组的每个元素
 */
interface PathSegment {
  /** Field name / 字段名 */
  name: string
  /** Whether every element of the array is matched / 是否匹配数组的每个元素 */
  every: boolean
  /** Array index to read, when the path gives one / 需要读取的数组下标，路径给出时 */
  index?: number
}

/**
 * Parse a field path, e.g. `features[*].name` or `items[0].icon`
 *
 * 解析字段路径，例如 `features[*].name` 或 `items[0].icon`
 *
 * Only the field access and the array index are supported. The path is
 * traversed step by step, so a field that does not exist is skipped silently,
 * which makes the path behave like an optional chain.
 *
 * 仅支持字段访问与数组下标。路径会逐级遍历，因此不存在的字段会被静默跳过，使路径的行为 与可选链一致。
 *
 * @param path - Field path / 字段路径
 * @returns Path segments, `null` when the path is invalid / 路径片段，路径无效时为
 * `null`
 */
const parsePath = (path: string): PathSegment[] | null => {
  const segments: PathSegment[] = []

  for (const part of path.split('.')) {
    const match = /^(?<name>[^[\]]+)(?<index>\[(?:\*|\d+)\])?$/u.exec(part)

    if (!match?.groups) return null

    const { index, name } = match.groups

    segments.push({
      name,
      every: index === '[*]',
      ...(index && index !== '[*]'
        ? { index: Number(index.slice(1, -1)) }
        : {}),
    })
  }

  return segments
}

/**
 * Get the values of a field of an object
 *
 * 获取对象某个字段的值
 *
 * @param data - Object to read / 需要读取的对象
 * @param segments - Path segments / 路径片段
 * @returns Values of the field / 字段的值
 */
const getFieldValues = (data: unknown, segments: PathSegment[]): unknown[] => {
  const [segment, ...rest] = segments

  if (!segment || !data || typeof data !== 'object') return []

  const value = (data as Record<string, unknown>)[segment.name]

  // the last segment may be an array itself, e.g. `files`, unless the path
  // gives an index
  if (!rest.length && segment.index === undefined)
    return isArray(value) ? value : [value]

  const values = isArray(value)
    ? segment.every
      ? value
      : [value[segment.index ?? 0]]
    : [value]

  return values.flatMap((item) =>
    rest.length ? getFieldValues(item, rest) : [item],
  )
}

/**
 * Get the icons of the fields of an object
 *
 * 获取对象某些字段中的图标
 *
 * This is exported so that a custom scanner can reuse it, e.g. for the theme
 * config or for a data file.
 *
 * 该函数会被导出，以便自定义扫描器复用，例如用于主题配置或数据文件。
 *
 * @example
 *   extractIconsFromFields(page.frontmatter, ['icon', 'features[*].name'])
 *
 * @param data - Object to read / 需要读取的对象
 * @param fields - Field paths, e.g. `['icon', 'features[*].name']` / 字段路径， 例如
 *   `['icon', 'features[*].name']`
 * @returns Icons in the fields / 字段中的图标
 */
export const extractIconsFromFields = (
  data: unknown,
  fields: string[],
): string[] => {
  const icons: string[] = []

  for (const field of fields) {
    const segments = parsePath(field)

    if (!segments) {
      logger.error(
        `The field path "${field}" is invalid, only the field access and the array index are supported, e.g. "icon" or "features[*].name".`,
      )
      continue
    }

    for (const value of getFieldValues(data, segments))
      if (isString(value)) icons.push(value)
  }

  return icons
}
