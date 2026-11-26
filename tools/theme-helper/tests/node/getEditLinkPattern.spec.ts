import { describe, expect, it } from 'vitest'

import {
  getEditLinkPattern,
  resolveRepoType,
} from '../../src/shared/editLink.js'

describe(resolveRepoType, () => {
  it('should resolve the supported repository types', () => {
    expect(resolveRepoType('vuepress/ecosystem')).toBe('GitHub')
    expect(resolveRepoType('https://github.com/vuepress/ecosystem')).toBe(
      'GitHub',
    )
    expect(resolveRepoType('https://gitlab.com/vuepress/ecosystem')).toBe(
      'GitLab',
    )
    expect(resolveRepoType('https://gitee.com/vuepress/ecosystem')).toBe(
      'Gitee',
    )
    expect(resolveRepoType('https://bitbucket.org/vuepress/ecosystem')).toBe(
      'Bitbucket',
    )
    expect(resolveRepoType('https://example.com/vuepress/ecosystem')).toBeNull()
  })
})

describe(getEditLinkPattern, () => {
  it('should build the pattern of the supported repositories', () => {
    expect(getEditLinkPattern({ repo: 'vuepress/ecosystem' })).toBe(
      'https://github.com/vuepress/ecosystem/edit/main/:path',
    )
    expect(
      getEditLinkPattern({ repo: 'https://gitlab.com/vuepress/ecosystem' }),
    ).toBe('https://gitlab.com/vuepress/ecosystem/-/edit/main/:path')
    expect(
      getEditLinkPattern({ repo: 'https://bitbucket.org/vuepress/ecosystem' }),
    ).toBe(
      'https://bitbucket.org/vuepress/ecosystem/src/main/:path?mode=edit&spa=0&at=main&fileviewer=file-view-default',
    )
  })

  it('should add the branch and the directory', () => {
    expect(
      getEditLinkPattern({
        branch: 'next',
        dir: 'docs',
        repo: 'vuepress/ecosystem',
      }),
    ).toBe('https://github.com/vuepress/ecosystem/edit/next/docs/:path')
  })

  it('should normalize the directory', () => {
    expect(
      getEditLinkPattern({ dir: '/docs/', repo: 'vuepress/ecosystem' }),
    ).toBe('https://github.com/vuepress/ecosystem/edit/main/docs/:path')
  })

  it('should fall back to the generic pattern for an unknown host', () => {
    expect(
      getEditLinkPattern({ repo: 'https://example.com/vuepress/ecosystem' }),
    ).toBe('https://example.com/vuepress/ecosystem/edit/main/:path')
  })
})
