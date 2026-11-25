import type { useThemeLocaleData as useThemeLocaleDataType } from '@vuepress/plugin-theme-data/client'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import type {
  usePageData as usePageDataType,
  usePageFrontmatter as usePageFrontmatterType,
} from 'vuepress/client'

import { useEditLink } from '../../src/client/composables/useEditLink.js'
import type {
  EditLinkFrontmatter,
  EditLinkPageData,
} from '../../src/shared/index.js'

const state = vi.hoisted(
  (): {
    theme: Record<string, unknown>
    frontmatter: EditLinkFrontmatter
    page: EditLinkPageData
  } => ({
    theme: {},
    frontmatter: {},
    page: { filePathRelative: 'guide/index.md' },
  }),
)

vi.mock(import('vuepress/client'), () => ({
  usePageData: (() => ref(state.page)) as unknown as typeof usePageDataType,
  usePageFrontmatter: (() =>
    ref(state.frontmatter)) as unknown as typeof usePageFrontmatterType,
}))

vi.mock(import('@vuepress/plugin-theme-data/client'), () => ({
  useThemeLocaleData: (() =>
    ref(state.theme)) as unknown as typeof useThemeLocaleDataType,
}))

const resolve = (
  theme: Record<string, unknown> = {},
): {
  text: string
  link: string
} | null => {
  state.theme = theme
  state.frontmatter = {}
  state.page = { filePathRelative: 'guide/index.md' }

  return useEditLink().value
}

describe(useEditLink, () => {
  it('should resolve the edit link from the theme data', () => {
    expect(resolve({ repo: 'vuepress/ecosystem' })).toStrictEqual({
      text: 'Edit this page',
      link: 'https://github.com/vuepress/ecosystem/edit/main/guide/index.md',
    })

    expect(
      resolve({
        repo: 'vuepress/ecosystem',
        docsRepo: 'vuepress/docs',
        docsBranch: 'next',
        docsDir: 'docs',
        editLinkText: '编辑此页面',
      }),
    ).toStrictEqual({
      text: '编辑此页面',
      link: 'https://github.com/vuepress/docs/edit/next/docs/guide/index.md',
    })
  })

  it('should resolve the edit link from the frontmatter', () => {
    state.theme = {
      repo: 'vuepress/ecosystem',
      editLinkPattern: 'https://example.com/theme/:path',
    }
    state.frontmatter = { editLinkPattern: 'https://example.com/page/:path' }
    state.page = { filePathRelative: 'guide/index.md' }

    expect(useEditLink().value).toStrictEqual({
      text: 'Edit this page',
      link: 'https://example.com/page/guide/index.md',
    })
  })

  it('should return null when the edit link is disabled', () => {
    expect(resolve({ repo: 'vuepress/ecosystem', editLink: false })).toBeNull()

    state.theme = { repo: 'vuepress/ecosystem' }
    state.frontmatter = { editLink: false }
    expect(useEditLink().value).toBeNull()
  })

  it('should return null when the edit link can not be resolved', () => {
    expect(resolve()).toBeNull()

    state.theme = { repo: 'vuepress/ecosystem' }
    state.page = { filePathRelative: null }
    expect(useEditLink().value).toBeNull()
  })
})
