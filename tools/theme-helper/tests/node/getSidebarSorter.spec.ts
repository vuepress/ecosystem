import { describe, expect, it } from 'vitest'

import {
  getSidebarSorter,
  sidebarDateDescSorter,
  sidebarDateSorter,
  sidebarFilenameSorter,
  sidebarOrderSorter,
  sidebarReadmeSorter,
  sidebarTitleSorter,
} from '../../src/node/getSidebarSorter.js'
import type {
  SidebarDirInfo,
  SidebarFileInfo,
  SidebarInfo,
} from '../../src/shared/index.js'

const createFile = (
  filename: string,
  options: Partial<SidebarFileInfo> = {},
): SidebarFileInfo => ({
  type: 'file',
  filename,
  title: filename.replace(/\.md$/u, ''),
  order: null,
  path: `/${filename}`,
  frontmatter: {},
  pageData: null,
  ...options,
})

const createDir = (
  dirname: string,
  options: Partial<SidebarDirInfo> = {},
): SidebarDirInfo => ({
  type: 'dir',
  dirname,
  title: dirname,
  order: null,
  groupInfo: { collapsible: true },
  children: [],
  frontmatter: null,
  pageData: null,
  ...options,
})

const orderSorter = (infoA: SidebarInfo, infoB: SidebarInfo): number =>
  (infoA.order ?? 0) - (infoB.order ?? 0)

const sort = (
  items: SidebarInfo[],
  sorter?: Parameters<typeof getSidebarSorter>[0],
): string[] =>
  items
    .sort((infoA, infoB) => {
      for (const sorterFunction of getSidebarSorter(sorter)) {
        const result = sorterFunction(infoA, infoB)

        if (result !== 0) return result
      }

      return 0
    })
    .map((item) => (item.type === 'file' ? item.filename : item.dirname))

describe(getSidebarSorter, () => {
  it('should resolve the built-in keywords', () => {
    expect(getSidebarSorter('order')).toStrictEqual([sidebarOrderSorter])
    expect(getSidebarSorter(['readme', 'date'])).toStrictEqual([
      sidebarReadmeSorter,
      sidebarDateSorter,
    ])
  })

  it('should use a custom sorter function', () => {
    expect(getSidebarSorter(orderSorter)).toStrictEqual([orderSorter])
  })

  it('should fall back to the default sorters', () => {
    expect(getSidebarSorter()).toStrictEqual([
      sidebarReadmeSorter,
      sidebarOrderSorter,
      sidebarTitleSorter,
      sidebarFilenameSorter,
    ])
    expect(getSidebarSorter([])).toStrictEqual([
      sidebarReadmeSorter,
      sidebarOrderSorter,
      sidebarTitleSorter,
      sidebarFilenameSorter,
    ])
  })

  it('should put the README.md in front of the other items', () => {
    expect(
      sort([createFile('a.md'), createFile('README.md')], 'readme'),
    ).toStrictEqual(['README.md', 'a.md'])
  })

  it('should sort by the order frontmatter', () => {
    const items = [
      createFile('none.md'),
      createFile('negative.md', { order: -1 }),
      createFile('second.md', { order: 2 }),
      createFile('first.md', { order: 1 }),
    ]

    expect(sort(items, 'order')).toStrictEqual([
      'first.md',
      'second.md',
      'none.md',
      'negative.md',
    ])
  })

  it('should sort by the filename naturally and put files before directories', () => {
    expect(
      sort(
        [
          createDir('guide'),
          createFile('page10.md'),
          createFile('page2.md'),
          createFile('guide.md'),
        ],
        'filename',
      ),
    ).toStrictEqual(['guide.md', 'guide', 'page2.md', 'page10.md'])
  })

  it('should sort by the date frontmatter', () => {
    const older = createFile('older.md', {
      frontmatter: { date: new Date('2024-01-01') },
    })
    const newer = createFile('newer.md', {
      frontmatter: { date: new Date('2025-01-01') },
    })
    const noDate = createFile('no-date.md')

    expect([newer, noDate, older].sort(sidebarDateSorter)).toStrictEqual([
      older,
      newer,
      noDate,
    ])
    expect(sidebarDateDescSorter(older, newer)).toBeGreaterThan(0)
    expect([older, noDate, newer].sort(sidebarDateDescSorter)).toStrictEqual([
      newer,
      older,
      noDate,
    ])
  })

  it('should sort by the title', () => {
    expect(
      sort(
        [
          createFile('b.md', { title: 'Item 10' }),
          createFile('a.md', { title: 'Item 2' }),
        ],
        'title',
      ),
    ).toStrictEqual(['a.md', 'b.md'])
  })
})
