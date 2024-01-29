import { isDef, isString } from './helper.js'

export interface DateInfo {
  type: 'date' | 'time' | 'full'
  value: Date | null
}

const TIME_REG =
  /(?:(\d{2,4})[/-](\d{1,2})[/-](\d{1,2}))?\s*(?:(\d{1,2}):(\d{1,2})(?::(\d{1,2})(?::(\d{3}))?)?)?/u

/**
 * Get Date info from user input, return null when input is invalid
 *
 * 从用户输入中获取日期信息，输入无效时返回 null
 */
export const parseDate = (date: unknown): DateInfo | null => {
  if (date instanceof Date) {
    if (date.valueOf() === null) return null

    const isDate =
      date.getHours() === 0 &&
      date.getMinutes() === 0 &&
      date.getSeconds() === 0 &&
      date.getMilliseconds() === 0

    return {
      type: isDate ? 'date' : 'full',
      value: date,
    }
  }

  if (isString(date)) {
    const result = new Date(date)

    if (result.valueOf()) {
      const isDate =
        result.getHours() === 0 &&
        result.getMinutes() === 0 &&
        result.getSeconds() === 0 &&
        result.getMilliseconds() === 0

      return {
        type: isDate ? 'date' : 'full',
        value: result,
      }
    } else {
      const match = TIME_REG.exec(date.trim())

      if (match) {
        const [year, month, day, hour, minute, second] = match
          .slice(1)
          .map((item) => (isDef(item) ? parseInt(item) : item))

        if (isDef(year) && isDef(month) && isDef(day)) {
          const isDate = !isDef(hour) && !isDef(minute) && !isDef(second)

          return {
            type: isDate ? 'date' : 'full',
            value: isDate
              ? new Date(
                  year && Number(year) < 100 ? year + 2000 : year,
                  month - 1,
                  day,
                )
              : new Date(
                  year && Number(year) < 100 ? year + 2000 : year,
                  month - 1,
                  day,
                  hour,
                  minute,
                  hour && minute && !second ? 0 : second,
                ),
          }
        }
      }
    }
  }

  return null
}

/**
 * Date sorter from latest to oldest
 *
 * @description Invalid date will appear at last
 *
 * 最新到最旧的日期排序器
 *
 * @description 无效日期将出现在最后
 */
export const dateSorter = (
  valueA: Date | number | string | undefined,
  valueB: Date | number | string | undefined,
): number => {
  const dateA = parseDate(
    typeof valueA === 'number' ? new Date(valueA) : valueA,
  )?.value
  const dateB = parseDate(
    typeof valueB === 'number' ? new Date(valueB) : valueB,
  )?.value

  if (!dateA) return dateB ? 1 : 0
  if (!dateB) return -1

  return dateB.getTime() - dateA.getTime()
}
