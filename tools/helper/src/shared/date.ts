/**
 * Get Date info from user input
 *
 * 从用户输入获取日期信息
 *
 * @param input - The input to parse / 要解析的输入
 *
 * @returns Date object or null if input is invalid / 日期对象，如果输入无效则返回 null
 *
 * @example
 * ```ts
 * getDate('2023-01-01') // Date object
 * getDate(1640995200000) // Date object
 * getDate('invalid') // null
 * ```
 */
export const getDate = (input: unknown): Date | null => {
  if (input) {
    if (typeof input === 'number') return new Date(input)

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const date = Date.parse(input.toString())

    if (!Number.isNaN(date)) return new Date(date)
  }

  return null
}

/**
 * Date sorter from latest to oldest
 *
 * 从最新到最旧的日期排序器
 *
 * @param valueA - First date value / 第一个日期值
 * @param valueB - Second date value / 第二个日期值
 *
 * @returns Comparison result / 比较结果
 *
 * @example
 * ```ts
 * const dates = ['2023-01-01', '2023-12-31', '2023-06-15']
 * dates.sort(dateSorter) // ['2023-12-31', '2023-06-15', '2023-01-01']
 * ```
 */
export const dateSorter = (
  valueA: Date | number | string | undefined,
  valueB: Date | number | string | undefined,
): number => {
  const dateA = getDate(typeof valueA === 'number' ? new Date(valueA) : valueA)
  const dateB = getDate(typeof valueB === 'number' ? new Date(valueB) : valueB)

  if (!dateA) return dateB ? 1 : 0
  if (!dateB) return -1

  return dateB.getTime() - dateA.getTime()
}
