import { isString } from 'vuepress/shared'

export { isFunction, isString, isPlainObject } from 'vuepress/shared'

/* Type helper */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDef = <T = any>(val?: T | undefined): val is T =>
  typeof val !== 'undefined'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isNumber = (val: any): val is number => typeof val === 'number'
export const { isArray } = Array
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp

/* String helper */
export const startsWith = (str: unknown, prefix: string): boolean =>
  isString(str) && str.startsWith(prefix)

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
