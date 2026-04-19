import { isString } from 'vuepress/shared'

export { isFunction, isString, isPlainObject } from 'vuepress/shared'

/* Type helper */

/**
 * Check if a value is defined
 *
 * 检查值是否已定义
 *
 * @example
 *   isDef(undefined) // false
 *   isDef(null) // true
 *   isDef(0) // true
 *
 * @param val - The value to check / 要检查的值
 * @returns Whether the value is defined / 值是否已定义
 */
// oxlint-disable-next-line typescript/no-explicit-any
export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'

/**
 * Check if a value is boolean
 *
 * 检查值是否为布尔值
 *
 * @example
 *   isBoolean(true) // true
 *   isBoolean(false) // true
 *   isBoolean('true') // false
 *
 * @param val - The value to check / 要检查的值
 * @returns Whether the value is boolean / 值是否为布尔值
 */
// oxlint-disable-next-line typescript/explicit-module-boundary-types, typescript/no-explicit-any
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

/**
 * Check if a value is number
 *
 * 检查值是否为数字
 *
 * @example
 *   isNumber(42) // true
 *   isNumber('42') // false
 *   isNumber(NaN) // true
 *
 * @param val - The value to check / 要检查的值
 * @returns Whether the value is number / 值是否为数字
 */
// oxlint-disable-next-line typescript/explicit-module-boundary-types, typescript/no-explicit-any
export const isNumber = (val: any): val is number => typeof val === 'number'

/**
 * Check if a value is array
 *
 * 检查值是否为数组
 *
 * @param val - The value to check / 要检查的值
 * @returns Whether the value is array / 值是否为数组
 */
export const isArray = <ItemType>(val: unknown): val is ItemType[] =>
  Array.isArray(val)

/**
 * Check if a value is regexp
 *
 * 检查值是否为正则表达式
 *
 * @example
 *   isRegExp(/test/) // true
 *   isRegExp('test') // false
 *
 * @param val - The value to check / 要检查的值
 * @returns Whether the value is regexp / 值是否为正则表达式
 */
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp

/* String helper */

/**
 * Check if a value is starting with the given prefix
 *
 * 检查值是否以给定前缀开头
 *
 * @example
 *   startsWith('hello world', 'hello') // true
 *   startsWith('hello world', 'world') // false
 *   startsWith(123, 'hello') // false
 *
 * @param str - The string to check / 要检查的字符串
 * @param prefix - The prefix to match / 要匹配的前缀
 * @returns Whether the string starts with the prefix / 字符串是否以前缀开头
 */
export const startsWith = (str: unknown, prefix: string): boolean =>
  isString(str) && str.startsWith(prefix)

/**
 * Check if a value is ending with the given suffix
 *
 * 检查值是否以给定后缀结尾
 *
 * @example
 *   endsWith('hello world', 'world') // true
 *   endsWith('hello world', 'hello') // false
 *   endsWith(123, 'world') // false
 *
 * @param str - The string to check / 要检查的字符串
 * @param suffix - The suffix to match / 要匹配的后缀
 * @returns Whether the string ends with the suffix / 字符串是否以后缀结尾
 */
export const endsWith = (str: unknown, suffix: string): boolean =>
  isString(str) && str.endsWith(suffix)

export {
  ensureEndingSlash,
  ensureLeadingSlash,
  removeEndingSlash,
  removeLeadingSlash,
} from 'vuepress/shared'

/* Object helper */
export const { entries } = Object
export const { fromEntries } = Object

export const keys = <ObjectType extends object>(
  obj: ObjectType,
): `${keyof ObjectType & (string | number | boolean | null | undefined)}`[] =>
  Object.keys(
    obj,
  ) as `${keyof ObjectType & (string | number | boolean | null | undefined)}`[]

export const { values } = Object
