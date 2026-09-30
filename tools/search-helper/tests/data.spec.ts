import { describe, expect, it } from 'vitest'

import {
  INDEX_ID_SEPARATOR,
  isCustomFieldIndexItem,
  isSectionIndexItem,
  parseIndexId,
} from '../src/shared/data.js'
import type { IndexItem } from '../src/shared/data.js'

const pageItem: IndexItem = { id: '0', heading: 'Title' }
const sectionItem: IndexItem = {
  id: `0${INDEX_ID_SEPARATOR}#anchor`,
  heading: 'Title',
}
const customFieldItem: IndexItem = {
  id: `0${INDEX_ID_SEPARATOR}@1`,
  customFields: ['author: Mr.Hope'],
}

describe(parseIndexId, () => {
  it('should parse a page id', () => {
    expect(parseIndexId('0')).toStrictEqual({
      pageId: 0,
      kind: 'page',
      info: '',
    })
    expect(parseIndexId('12')).toStrictEqual({
      pageId: 12,
      kind: 'page',
      info: '',
    })
  })

  it('should parse a section id', () => {
    expect(parseIndexId(`0${INDEX_ID_SEPARATOR}#anchor`)).toStrictEqual({
      pageId: 0,
      kind: 'section',
      info: 'anchor',
    })
    expect(parseIndexId(`3${INDEX_ID_SEPARATOR}#install-guide`)).toStrictEqual({
      pageId: 3,
      kind: 'section',
      info: 'install-guide',
    })
  })

  it('should parse a custom field id', () => {
    expect(parseIndexId(`0${INDEX_ID_SEPARATOR}@1`)).toStrictEqual({
      pageId: 0,
      kind: 'customField',
      info: '1',
    })
  })

  it('should keep the markers of an anchor', () => {
    // Anchors may contain `#` or `@`, e.g. an explicit heading id `{#a@b}`
    expect(parseIndexId(`0${INDEX_ID_SEPARATOR}#a@b`)).toStrictEqual({
      pageId: 0,
      kind: 'section',
      info: 'a@b',
    })
    expect(parseIndexId(`0${INDEX_ID_SEPARATOR}#a#b`)).toStrictEqual({
      pageId: 0,
      kind: 'section',
      info: 'a#b',
    })
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
