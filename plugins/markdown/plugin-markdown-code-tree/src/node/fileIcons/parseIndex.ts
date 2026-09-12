/**
 * Parse a generated icon index
 *
 * The index is stored as compact text instead of a data structure, since the
 * icon table is by far the largest part of the package, and a plain object
 * repeats the syntax characters of every entry.
 *
 * The text holds one icon per line, which is the icon name without the shared
 * {@link prefix}, followed by the keys that use it:
 *
 * ```text
 * access accda accdb
 * typescript ts mts cts
 * ```
 *
 * 解析生成的图标索引
 *
 * 该索引以紧凑文本而不是数据结构存储，因为图标表是包中最大的一部分，而普通对象会重复 每一个条目的语法字符。
 *
 * 文本中每行一个图标，内容为去掉共有 {@link prefix} 的图标名称，后接使用它的键：
 *
 * ```text
 * access accda accdb
 * typescript ts mts cts
 * ```
 *
 * @param prefix - Prefix shared by every icon name of the index /
 *   索引中每个图标名称共有的前缀
 * @param data - Compact index text / 紧凑的索引文本
 * @returns Key to icon name lookup / 键到图标名称的查询表
 */
export const parseIconIndex = (
  prefix: string,
  data: string,
): Map<string, string> => {
  const index = new Map<string, string>()

  for (const line of data.split('\n')) {
    if (line === '') continue

    const separator = line.indexOf(' ')
    const icon = `${prefix}${line.slice(0, separator)}`

    for (const key of line.slice(separator + 1).split(' ')) index.set(key, icon)
  }

  return index
}
