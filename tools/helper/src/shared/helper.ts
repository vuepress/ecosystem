import { isString } from 'vuepress/shared'

export { isFunction, isString, isPlainObject } from 'vuepress/shared'

/* Type helper */

/**
 * Check if a value is defined
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'

/**
 * Check if a value is boolean
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

/**
 * Check if a value is number
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isNumber = (val: any): val is number => typeof val === 'number'

/**
 * Check if a value is array
 */
export const { isArray } = Array

/**
 * Check if a value is regexp
 */
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp

/* String helper */

/**
 * Check if a value is starting with the given prefix
 */
export const startsWith = (str: unknown, prefix: string): boolean =>
  isString(str) && str.startsWith(prefix)

/**
 * Check if a value is ending with the given suffix
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
export const { keys } = Object
export const { values } = Object
