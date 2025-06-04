const padZero = (num: number, length = 2): string =>
  num.toString().padStart(length, '0')

const getFullYear = (date: Date): string => padZero(date.getFullYear(), 4)

const getMonth = (date: Date): string => padZero(date.getMonth() + 1)

const getDate = (date: Date): string => padZero(date.getDate())

const getHours = (date: Date): string => padZero(date.getHours())

const getMinutes = (date: Date): string => padZero(date.getMinutes())

const getSeconds = (date: Date): string => padZero(date.getSeconds())

/**
 * Get date string in YYYY-MM-DD format
 *
 * 获取 YYYY-MM-DD 格式的日期字符串
 *
 * @param date - Date object / 日期对象
 */
export const getDateString = (date: Date): string =>
  `${getFullYear(date)}-${getMonth(date)}-${getDate(date)}`

/**
 * Get time string in HH:mm:ss format
 *
 * 获取 HH:mm:ss 格式的时间字符串
 *
 * @param date - Date object / 日期对象
 */
export const getTimeString = (date: Date): string =>
  `${getHours(date)}:${getMinutes(date)}:${getSeconds(date)}`

/**
 * Get full date string in YYYY-MM-DD HH:mm:ss format
 *
 * 获取 YYYY-MM-DD HH:mm:ss 格式的完整日期时间字符串
 *
 * @param date - Date object / 日期对象
 */
export const getFullDateString = (date: Date): string =>
  `${getDateString(date)} ${getTimeString(date)}`
