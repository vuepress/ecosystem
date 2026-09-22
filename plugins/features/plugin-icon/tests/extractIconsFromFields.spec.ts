import { describe, expect, it, vi } from 'vitest'

import { extractIconsFromFields } from '../src/node/extractIconsFromFields.js'
import { logger } from '../src/node/utils.js'

const data = {
  icon: 'mdi:home',
  features: [{ name: 'mdi:a' }, { name: 'mdi:b' }, { other: 'mdi:x' }],
  items: ['mdi:c', 'mdi:d'],
  nested: { deep: { icon: 'mdi:e' } },
  mixed: ['mdi:f', 1, null],
}

describe(extractIconsFromFields, () => {
  it('should read a field', () => {
    expect(extractIconsFromFields(data, ['icon'])).toStrictEqual(['mdi:home'])
  })

  it('should read the field of every array element', () => {
    expect(extractIconsFromFields(data, ['features[*].name'])).toStrictEqual([
      'mdi:a',
      'mdi:b',
    ])
  })

  it('should read the field of an indexed array element', () => {
    expect(extractIconsFromFields(data, ['features[0].name'])).toStrictEqual([
      'mdi:a',
    ])
    expect(extractIconsFromFields(data, ['features[1].name'])).toStrictEqual([
      'mdi:b',
    ])
  })

  it('should read an array field as a whole', () => {
    expect(extractIconsFromFields(data, ['items'])).toStrictEqual([
      'mdi:c',
      'mdi:d',
    ])
    expect(extractIconsFromFields(data, ['items[*]'])).toStrictEqual([
      'mdi:c',
      'mdi:d',
    ])
  })

  it('should read an indexed element of an array field', () => {
    expect(extractIconsFromFields(data, ['items[0]'])).toStrictEqual(['mdi:c'])
    expect(extractIconsFromFields(data, ['items[1]'])).toStrictEqual(['mdi:d'])
    expect(extractIconsFromFields(data, ['items[9]'])).toStrictEqual([])
  })

  it('should read a nested field', () => {
    expect(extractIconsFromFields(data, ['nested.deep.icon'])).toStrictEqual([
      'mdi:e',
    ])
  })

  it('should merge several fields', () => {
    expect(extractIconsFromFields(data, ['icon', 'items'])).toStrictEqual([
      'mdi:home',
      'mdi:c',
      'mdi:d',
    ])
  })

  it('should skip the fields that do not exist', () => {
    expect(extractIconsFromFields(data, ['nothing'])).toStrictEqual([])
    expect(extractIconsFromFields(data, ['a.b.c'])).toStrictEqual([])
    expect(extractIconsFromFields(data, ['features[9].name'])).toStrictEqual([])
  })

  it('should skip the values that are not strings', () => {
    expect(extractIconsFromFields(data, ['mixed'])).toStrictEqual(['mdi:f'])
  })

  it('should handle data that is not an object', () => {
    expect(extractIconsFromFields(undefined, ['icon'])).toStrictEqual([])
    expect(extractIconsFromFields('text', ['icon'])).toStrictEqual([])
  })

  it('should report an invalid field path', () => {
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {})

    expect(extractIconsFromFields(data, ['features[].name'])).toStrictEqual([])
    expect(extractIconsFromFields(data, ['a b'])).toStrictEqual([])
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('is invalid'))

    errorSpy.mockRestore()
  })
})
