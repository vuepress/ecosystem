import { expect, it } from 'vitest'
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

it('isDef', () => {
  expect(isDef(true)).toBeTruthy()
  expect(isDef(false)).toBeTruthy()
  expect(isDef(0)).toBeTruthy()
  expect(isDef(1)).toBeTruthy()
  expect(isDef('')).toBeTruthy()
  expect(isDef('abc')).toBeTruthy()
  expect(isDef([])).toBeTruthy()
  expect(isDef({})).toBeTruthy()
  expect(isDef(null)).toBeTruthy()
  // oxlint-disable-next-line unicorn/no-useless-undefined
  expect(isDef(undefined)).toBeFalsy()
  expect(isDef(void 0)).toBeFalsy()
})

it('isBoolean', () => {
  expect(isBoolean(true)).toBeTruthy()
  expect(isBoolean(false)).toBeTruthy()
  expect(isBoolean(1)).toBeFalsy()
  expect(isBoolean('abc')).toBeFalsy()
})

it('isFunction', () => {
  expect(isFunction(isBoolean)).toBeTruthy()
  expect(isFunction(console.log)).toBeTruthy()
  expect(isFunction(1)).toBeFalsy()
  expect(isFunction('abc')).toBeFalsy()
})

it('isNumber', () => {
  expect(isNumber(1)).toBeTruthy()
  expect(isNumber(1.3)).toBeTruthy()
  expect(isNumber(0xac1)).toBeTruthy()
  expect(isNumber(false)).toBeFalsy()
  expect(isNumber('abc')).toBeFalsy()
})

it('isString', () => {
  expect(isString('abc')).toBeTruthy()
  expect(
    isString(`\
test
`),
  ).toBeTruthy()
  expect(isString(console)).toBeFalsy()
  expect(isString(false)).toBeFalsy()
  expect(isString(3)).toBeFalsy()
})

it('isRegExp', () => {
  // eslint-disable-next-line prefer-regex-literals
  expect(isRegExp(new RegExp('abc'))).toBeTruthy()
  expect(isRegExp(/\.html$/)).toBeTruthy()
  expect(isRegExp(console)).toBeFalsy()
  expect(isRegExp(false)).toBeFalsy()
  expect(isRegExp(3)).toBeFalsy()
})

it('startsWith', () => {
  expect(startsWith('abc', 'a')).toBeTruthy()
  expect(startsWith('abc', 'b')).toBeFalsy()
})

it('endsWith', () => {
  expect(endsWith('abc', 'c')).toBeTruthy()
  expect(endsWith('abc', 'b')).toBeFalsy()
})

it('entries', () => {
  expect(entries({ a: 1, b: 2 })).toEqual([
    ['a', 1],
    ['b', 2],
  ])
})

it('fromEntries', () => {
  expect(
    fromEntries([
      ['a', 1],
      ['b', 2],
    ]),
  ).toEqual({ a: 1, b: 2 })
})

it('keys', () => {
  expect(keys({ a: 1, b: 2 })).toEqual(['a', 'b'])
})

it('values', () => {
  expect(values({ a: 1, b: 2 })).toEqual([1, 2])
})
