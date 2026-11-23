import { describe, expect, it } from 'vitest'

import { resolveEditLink } from '../../src/client/utils/resolveEditLink.js'

const resolve = (options: {
  docsRepo: string
  docsBranch?: string
  docsDir?: string
  filePathRelative?: string | null
  editLinkPattern?: string
}): string | null =>
  resolveEditLink({
    docsBranch: 'main',
    docsDir: '',
    filePathRelative: 'guide/index.md',
    ...options,
  })

describe(resolveEditLink, () => {
  it('should resolve the link with the default pattern of the repository', () => {
    expect(resolve({ docsRepo: 'vuepress/ecosystem' })).toBe(
      'https://github.com/vuepress/ecosystem/edit/main/guide/index.md',
    )
    expect(resolve({ docsRepo: 'https://gitlab.com/vuepress/ecosystem' })).toBe(
      'https://gitlab.com/vuepress/ecosystem/-/edit/main/guide/index.md',
    )
    expect(
      resolve({ docsRepo: 'https://bitbucket.org/vuepress/ecosystem' }),
    ).toBe(
      'https://bitbucket.org/vuepress/ecosystem/src/main/guide/index.md?mode=edit&spa=0&at=main&fileviewer=file-view-default',
    )
  })

  it('should resolve the link with the branch, directory and pattern', () => {
    expect(
      resolve({
        docsRepo: 'vuepress/ecosystem',
        docsBranch: 'next',
        docsDir: 'docs',
      }),
    ).toBe(
      'https://github.com/vuepress/ecosystem/edit/next/docs/guide/index.md',
    )

    expect(
      resolve({
        docsRepo: 'vuepress/ecosystem',
        docsDir: '/docs/',
        editLinkPattern: 'https://example.com/edit/:branch/:path',
      }),
    ).toBe('https://example.com/edit/main/docs/guide/index.md')
  })

  it('should return null when the link can not be resolved', () => {
    expect(
      resolve({ docsRepo: 'vuepress/ecosystem', filePathRelative: null }),
    ).toBeNull()
    expect(resolve({ docsRepo: 'https://example.com/vuepress' })).toBeNull()
  })
})
