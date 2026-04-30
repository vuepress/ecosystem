// oxlint-disable vitest/max-expects
import { describe, expect, it } from 'vitest'

import {
  endsWith,
  entries,
  fromEntries,
  isBoolean,
  isDef,
  isFunction,
  isNumber,
  isRegExp,
  isString,
  keys,
  startsWith,
  values,
} from '../../src/shared/helper.js'

describe(isDef, () => {
  it('should return true for defined values', () => {
    expect(isDef(true)).toBe(true)
    expect(isDef(false)).toBe(true)
    expect(isDef(0)).toBe(true)
    expect(isDef(1)).toBe(true)
    expect(isDef('')).toBe(true)
    expect(isDef('abc')).toBe(true)
    expect(isDef([])).toBe(true)
    expect(isDef({})).toBe(true)
    expect(isDef(null)).toBe(true)
  })

  it('should return false for undefined values', () => {
    expect(isDef(undefined)).toBe(false)
    expect(isDef(void 0)).toBe(false)
  })
})

describe(isBoolean, () => {
  it('should return true for boolean values', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  it('should return false for non-boolean values', () => {
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean('abc')).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean([])).toBe(false)
  })
})

describe(isFunction, () => {
  it('should return true for function values', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function test() {})).toBe(true)
    expect(isFunction(async function test() {})).toBe(true)
    expect(isFunction(async () => {})).toBe(true)
    // oxlint-disable-next-line no-console
    expect(isFunction(console.log)).toBe(true)
    expect(isFunction(isBoolean)).toBe(true)
  })

  it('should return false for non-function values', () => {
    expect(isFunction(1)).toBe(false)
    expect(isFunction('abc')).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
  })
})

describe(isNumber, () => {
  it('should return true for number values', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(1.3)).toBe(true)
    expect(isNumber(0xac1)).toBe(true)
  })

  it('should return false for non-number values', () => {
    expect(isNumber(false)).toBe(false)
    expect(isNumber('abc')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber([])).toBe(false)
  })
})

describe(isString, () => {
  it('should return true for string values', () => {
    expect(isString('')).toBe(true)
    expect(isString('abc')).toBe(true)
    expect(
      isString(`\
test
`),
    ).toBe(true)
  })

  it('should return false for non-string values', () => {
    expect(isString(false)).toBe(false)
    expect(isString(1)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
  })
})

describe(isRegExp, () => {
  it('should return true for RegExp values', () => {
    expect(isRegExp(new RegExp('abc'))).toBe(true)
    expect(isRegExp(/\.html$/)).toBe(true)
  })

  it('should return false for non-RegExp values', () => {
    expect(isRegExp(console)).toBe(false)
    expect(isRegExp(false)).toBe(false)
    expect(isRegExp(3)).toBe(false)
  })
})

describe(startsWith, () => {
  it('should return true if the string starts with the specified prefix', () => {
    expect(startsWith('abc', 'a')).toBe(true)
    expect(startsWith('abc', 'ab')).toBe(true)
    expect(startsWith('abc', '')).toBe(true)
  })

  it('should return false if the string does not start with the specified prefix', () => {
    expect(startsWith('abc', 'b')).toBe(false)
    expect(startsWith('abc', 'c')).toBe(false)
    expect(startsWith('abc', 'd')).toBe(false)
  })
})

describe(endsWith, () => {
  it('should return true if the string ends with the specified suffix', () => {
    expect(endsWith('abc', 'c')).toBe(true)
    expect(endsWith('abc', 'bc')).toBe(true)
    expect(endsWith('abc', '')).toBe(true)
  })

  it('should return false if the string does not end with the specified suffix', () => {
    expect(endsWith('abc', 'a')).toBe(false)
    expect(endsWith('abc', 'b')).toBe(false)
    expect(endsWith('abc', 'd')).toBe(false)
  })
})

describe(entries, () => {
  it('should return an array of key-value pairs from the object', () => {
    expect(entries({ a: 1, b: 2 })).toEqual([
      ['a', 1],
      ['b', 2],
    ])
  })
})

describe(fromEntries, () => {
  it('should create an object from an array of key-value pairs', () => {
    expect(
      fromEntries([
        ['a', 1],
        ['b', 2],
      ]),
    ).toEqual({ a: 1, b: 2 })
  })
})

describe(keys, () => {
  it('should return an array of keys from the object', () => {
    expect(keys({ a: 1, b: 2 })).toEqual(['a', 'b'])
  })
})

describe(values, () => {
  it('should return an array of values from the object', () => {
    expect(values({ a: 1, b: 2 })).toEqual([1, 2])
  })
})
