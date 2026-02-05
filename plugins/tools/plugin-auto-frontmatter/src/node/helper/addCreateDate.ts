import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import type { AutoFrontmatterContext, AutoFrontmatterData } from '../types.js'

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
const getTimeString = (date: Date): string =>
  `${getHours(date)}:${getMinutes(date)}:${getSeconds(date)}`

/**
 * Get full date string in YYYY-MM-DD HH:mm:ss format
 *
 * 获取 YYYY-MM-DD HH:mm:ss 格式的完整日期时间字符串
 *
 * @param date - Date object / 日期对象
 */
const getFullDateString = (date: Date): string =>
  `${getDateString(date)} ${getTimeString(date)}`

const getGitCreateDate = (filepath: string): Date | undefined => {
  try {
    const cwd = process.cwd()
    const time = execSync(
      `git -no-pager log --follow --diff-filter=A --format=%at ${path.relative(cwd, filepath)}`,
      {
        cwd,
        encoding: 'utf-8',
        timeout: 5000,
        stdio: ['pipe', 'pipe', 'ignore'],
      },
    )
    return new Date(Number.parseInt(time, 10) * 1000)
  } catch {
    return undefined
  }
}

const getFileCreateDate = (filepath: string): Date => {
  const stats = fs.statSync(filepath)
  return stats.birthtime.getFullYear() === 1970 ? stats.atime : stats.birthtime
}

export interface AddCreateDateOptions {
  /**
   * Frontmatter key to use when add date
   *
   * 添加时间时使用的 frontmatter 键名
   *
   * @default "date"
   */
  key?: string

  /**
   * Format of the date value when add date
   *
   * 添加时间时使用的日期格式
   *
   * @default "date"
   */
  format?: 'date' | 'full' | 'time'
}

/**
 * Add create date to frontmatter
 * @param data
 * @param context
 * @param options
 * @param option.key - Frontmatter key to use when add date / 添加时间时使用的 frontmatter 键名
 * @param option.format - Format of the date value when add date / 添加时间时使用的日期格式
 * @example
 * ```ts
 * {
 *   handle(data, context) {
 *     addCreateDate(data, context)
 *     // => data.date = '2022-01-01'
 *     return data
 *   }
 * }
 * ```
 * @example
 * ```ts
 * {
 *   handle(data, context) {
 *     addCreateDate(data, context, { format: 'full' })
 *     // => data.date = '2022-01-01 00:00:00'
 *     return data
 *   }
 * }
 * ```
 */
export const addCreateDate = (
  data: AutoFrontmatterData,
  context: AutoFrontmatterContext,
  options: AddCreateDateOptions = {},
): void => {
  const { key = 'date', format = 'date' } = options
  if (data[key]) return

  const date =
    getGitCreateDate(context.filepath) ?? getFileCreateDate(context.filepath)
  data[key] =
    format === 'time'
      ? getTimeString(date)
      : format === 'full'
        ? getFullDateString(date)
        : getDateString(date)
}
