import { describe, expect, it } from 'vitest'

import { parseFontAwesomeIcon } from '../src/node/parseFontAwesomeIcon.js'

describe(parseFontAwesomeIcon, () => {
  it('should use the solid style by default', () => {
    expect(parseFontAwesomeIcon('house')).toStrictEqual({
      type: 'icon',
      candidates: ['house'],
      style: 'solid',
    })
    expect(parseFontAwesomeIcon('fa-house')).toStrictEqual({
      type: 'icon',
      candidates: ['house'],
      style: 'solid',
    })
  })

  it('should support a style before the icon name', () => {
    expect(parseFontAwesomeIcon('solid:house')).toStrictEqual({
      type: 'icon',
      candidates: ['house'],
      style: 'solid',
    })
    expect(parseFontAwesomeIcon('fas:house')).toStrictEqual({
      type: 'icon',
      candidates: ['house'],
      style: 'solid',
    })
    expect(parseFontAwesomeIcon('regular:heart')).toStrictEqual({
      type: 'icon',
      candidates: ['heart'],
      style: 'regular',
    })
    expect(parseFontAwesomeIcon('brands:apple')).toStrictEqual({
      type: 'icon',
      candidates: ['apple'],
      style: 'brands',
    })
  })

  it('should support a style given as a class', () => {
    expect(parseFontAwesomeIcon('fa-solid fa-house')).toStrictEqual({
      type: 'icon',
      candidates: ['house'],
      style: 'solid',
    })
    expect(parseFontAwesomeIcon('fas fa-house')).toStrictEqual({
      type: 'icon',
      candidates: ['house'],
      style: 'solid',
    })
    expect(parseFontAwesomeIcon('fa-regular fa-heart')).toStrictEqual({
      type: 'icon',
      candidates: ['heart'],
      style: 'regular',
    })
    expect(parseFontAwesomeIcon('fab fa-apple')).toStrictEqual({
      type: 'icon',
      candidates: ['apple'],
      style: 'brands',
    })
    expect(parseFontAwesomeIcon('fa fa-house')).toStrictEqual({
      type: 'icon',
      candidates: ['house'],
      style: 'solid',
    })
  })

  it('should collect extra classes after the icon name', () => {
    expect(parseFontAwesomeIcon('house fa-sm')).toStrictEqual({
      type: 'icon',
      candidates: ['house', 'sm'],
      style: 'solid',
    })
    expect(parseFontAwesomeIcon('house rotate-180')).toStrictEqual({
      type: 'icon',
      candidates: ['house', 'rotate-180'],
      style: 'solid',
    })
  })

  it('should collect extra classes before the icon name', () => {
    expect(parseFontAwesomeIcon('fa-sm fa-house')).toStrictEqual({
      type: 'icon',
      candidates: ['sm', 'house'],
      style: 'solid',
    })
    expect(parseFontAwesomeIcon('fa-rotate-180 fas fa-house')).toStrictEqual({
      type: 'icon',
      candidates: ['rotate-180', 'house'],
      style: 'solid',
    })
  })

  it('should support the style class after the icon name', () => {
    expect(parseFontAwesomeIcon('house fa-regular')).toStrictEqual({
      type: 'icon',
      candidates: ['house'],
      style: 'regular',
    })
  })

  it('should detect image icons', () => {
    expect(parseFontAwesomeIcon('https://example.com/icon.png')).toStrictEqual({
      type: 'image',
    })
    expect(parseFontAwesomeIcon('/images/icon.svg')).toStrictEqual({
      type: 'image',
    })
  })

  it('should detect icons of other libraries and of the pro styles', () => {
    expect(parseFontAwesomeIcon('mdi:home')).toStrictEqual({
      type: 'unsupported',
    })
    expect(parseFontAwesomeIcon('lucide:house')).toStrictEqual({
      type: 'unsupported',
    })
    expect(parseFontAwesomeIcon('fad:house')).toStrictEqual({
      type: 'unsupported',
    })
    expect(parseFontAwesomeIcon('fa-duotone fa-house')).toStrictEqual({
      type: 'unsupported',
    })
    expect(parseFontAwesomeIcon('fad fa-house')).toStrictEqual({
      type: 'unsupported',
    })
  })

  it('should detect icons without a name', () => {
    expect(parseFontAwesomeIcon('')).toStrictEqual({ type: 'empty' })
    expect(parseFontAwesomeIcon('fa-solid')).toStrictEqual({ type: 'empty' })
    expect(parseFontAwesomeIcon('solid:')).toStrictEqual({ type: 'empty' })
  })
})
