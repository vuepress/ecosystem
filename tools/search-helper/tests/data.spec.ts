import { describe, expect, it } from 'vitest'

import {
  isCustomFieldIndexItem,
  isSectionIndexItem,
  parseIndexId,
} from '../src/shared/data.js'
import type { IndexItem } from '../src/shared/data.js'

const pageItem: IndexItem = { id: '0', h: 'Title' }
const sectionItem: IndexItem = { id: '0#anchor', h: 'Title' }
const customFieldItem: IndexItem = { id: '0@1', c: ['author: Mr.Hope'] }

describe(parseIndexId, () => {
  it('should parse a page id', () => {
    expect(parseIndexId('0')).toStrictEqual({ pageId: 0, info: '' })
    expect(parseIndexId('12')).toStrictEqual({ pageId: 12, info: '' })
  })

  it('should parse a section id', () => {
    expect(parseIndexId('0#anchor')).toStrictEqual({
      pageId: 0,
      info: 'anchor',
    })
    expect(parseIndexId('3#install-guide')).toStrictEqual({
      pageId: 3,
      info: 'install-guide',
    })
  })

  it('should parse a custom field id', () => {
    expect(parseIndexId('0@1')).toStrictEqual({ pageId: 0, info: '1' })
  })

  it('should only split on the first separator', () => {
    // Anchors may contain `#` or `@` characters
    expect(parseIndexId('0#a@b')).toStrictEqual({ pageId: 0, info: 'a' })
  })
})

describe(isCustomFieldIndexItem, () => {
  it('should detect custom field items', () => {
    expect(isCustomFieldIndexItem(customFieldItem)).toBe(true)
    expect(isCustomFieldIndexItem(pageItem)).toBe(false)
    expect(isCustomFieldIndexItem(sectionItem)).toBe(false)
  })
})

describe(isSectionIndexItem, () => {
  it('should detect section items', () => {
    expect(isSectionIndexItem(sectionItem)).toBe(true)
    expect(isSectionIndexItem(pageItem)).toBe(false)
    expect(isSectionIndexItem(customFieldItem)).toBe(false)
  })
})
