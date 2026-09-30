// oxlint-disable vitest/no-conditional-in-test
// oxlint-disable vitest/max-expects
import { getPageExcerpt } from '@vuepress/helper'
import { describe, expect, it } from 'vitest'
import type { Bundler, Page } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'

import { INDEX_ID_SEPARATOR, TEXT_INDEX_ID } from '../src/node/index.js'
import type { IndexItem, SectionIndexItem } from '../src/node/index.js'
import { generatePageIndex } from '../src/node/pageIndex.js'
import { PathStore } from '../src/node/pathStore.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(__dirname, './__fixtures__/src'),
  theme: emptyTheme,
})

// oxlint-disable-next-line node/no-top-level-await
await app.init()

/**
 * Replace the NUL separator of the index ids with a readable placeholder.
 *
 * A raw NUL character would make Git treat the snapshot file as binary. The
 * separator itself is asserted by the `data` unit tests.
 *
 * 把索引 id 的 NUL 分隔符替换为可读的占位符。
 *
 * 裸 NUL 字符会让 Git 把快照文件当成二进制文件。分隔符本身由 `data` 单元测试断言。
 *
 * @param items - Index items 索引项
 * @returns Index items with placeholder ids 占位符 id 的索引项
 */
const normalizeIndexIds = (items: IndexItem[]): unknown[] =>
  items.map((item) => ({
    ...item,
    id: item.id.replaceAll(INDEX_ID_SEPARATOR, '<nul>'),
  }))

describe(generatePageIndex, () => {
  it('should generate index', () => {
    const store = new PathStore()

    app.pages.forEach((page) => {
      page.data.excerpt = getPageExcerpt(app, page, {
        length: 0,
      })

      expect(
        normalizeIndexIds(generatePageIndex(page, store)),
      ).toMatchSnapshot()
    })
  })

  it('should generate full index', () => {
    const store = new PathStore()

    app.pages.forEach((page) => {
      page.data.excerpt = getPageExcerpt(app, page, {
        length: 0,
      })

      expect(
        normalizeIndexIds(
          generatePageIndex(page, store, {
            indexContent: true,
          }),
        ),
      ).toMatchSnapshot()
    })
  })

  it('should support customFields', () => {
    const store = new PathStore()

    app.pages.forEach((page) => {
      page.data.excerpt = getPageExcerpt(app, page, {
        length: 0,
      })

      expect(
        normalizeIndexIds(
          generatePageIndex(page, store, {
            customFields: [
              {
                getter: ({ frontmatter }: Page): string[] | string | null =>
                  (frontmatter.tag as string[] | string) || null,
              },
            ],
          }),
        ),
      ).toMatchSnapshot()
    })
  })

  it('should support customFields with full index', () => {
    const store = new PathStore()

    app.pages.forEach((page) => {
      expect(
        normalizeIndexIds(
          generatePageIndex(page, store, {
            customFields: [
              {
                getter: ({ frontmatter }: Page): string[] | string | null =>
                  (frontmatter.tag as string[] | string) || null,
              },
            ],
            indexContent: true,
          }),
        ),
      ).toMatchSnapshot()
    })
  })

  it('should remove custom tags by default', () => {
    const store = new PathStore()

    // Create a mock page with custom tags
    const page = app.pages.find((p) => p.path === '/component.html')!

    const result = generatePageIndex(page, store, {
      indexContent: true,
    })

    expect(normalizeIndexIds(result)).toMatchSnapshot('default')

    const text = (
      result.find((item): item is SectionIndexItem => 'text' in item)?.[
        TEXT_INDEX_ID
      ] ?? []
    ).join('')

    expect(text).toContain('Text 1')
    expect(text).toContain('Text 2')
    expect(text).toContain('Text 11')
    // Content inside custom tags should be removed
    expect(text).not.toContain('Text 3')
    expect(text).not.toContain('Text 4')
    expect(text).not.toContain('Text 5')
    expect(text).not.toContain('Text 6')
    expect(text).not.toContain('Text 7')
    expect(text).not.toContain('Text 8')
    expect(text).not.toContain('Text 9')
    expect(text).not.toContain('Text 10')
    expect(text).not.toContain('Text 12')
    expect(text).not.toContain('Text 13')
    expect(text).not.toContain('Text 14')
    expect(text).not.toContain('Text 15')
  })

  it('should preserve content inside custom tags with preserveTags', () => {
    const store = new PathStore()

    // Create a mock page with custom tags
    const page = app.pages.find((p) => p.path === '/preserve-tag.html')!

    // Without preserveTags, human-only content should be lost
    const resultWithoutPreserve = generatePageIndex(page, store, {
      indexContent: true,
    })

    // With preserveTags, human-only content should be preserved
    const resultWithPreserve = generatePageIndex(page, store, {
      indexContent: true,
      preserveTags: ['human-only', 'badge', 'donate-info'],
    })

    expect(normalizeIndexIds(resultWithoutPreserve)).toMatchSnapshot(
      'not preserve',
    )
    expect(normalizeIndexIds(resultWithPreserve)).toMatchSnapshot('preserve')

    const textWithoutPreserve = JSON.stringify(resultWithoutPreserve)
    const textWithPreserve = JSON.stringify(resultWithPreserve)

    expect(textWithoutPreserve).not.toContain('Human readable content')
    expect(textWithoutPreserve).not.toContain('text1')
    expect(textWithoutPreserve).not.toContain('text2')
    expect(textWithoutPreserve).not.toContain('text3')
    expect(textWithoutPreserve).not.toContain('text4')

    expect(textWithPreserve).toContain('Human readable content')
    // Robot-only content should still be lost since it's not in preserveTags
    expect(textWithPreserve).not.toContain('Robot content')
    expect(textWithPreserve).toContain('text1')
    expect(textWithPreserve).toContain('text2')
    expect(textWithPreserve).toContain('text3')
    expect(textWithPreserve).toContain('text4')
  })
})
