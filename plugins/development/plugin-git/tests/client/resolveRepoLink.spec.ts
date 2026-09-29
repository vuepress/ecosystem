import { describe, expect, it } from 'vitest'

import { resolveRepoLink } from '../../src/client/utils/resolveRepoLink.js'

describe('resolve repo link', () => {
  it('should return the link as is when it is empty', () => {
    expect(resolveRepoLink()).toBeUndefined()
    expect(resolveRepoLink('')).toBe('')
  })

  it('should keep an http link as is', () => {
    expect(
      resolveRepoLink('https://github.com/vuepress/ecosystem', 'github'),
    ).toBe('https://github.com/vuepress/ecosystem')
    expect(resolveRepoLink('http://example.com/repo', 'gitee')).toBe(
      'http://example.com/repo',
    )
  })

  it('should build a github link from a repo slug', () => {
    expect(resolveRepoLink('vuepress/ecosystem', 'github')).toBe(
      'https://github.com/vuepress/ecosystem',
    )
  })

  it('should build a gitee link from a repo slug', () => {
    expect(resolveRepoLink('vuepress/ecosystem', 'gitee')).toBe(
      'https://gitee.com/vuepress/ecosystem',
    )
  })

  it('should build a gitlab link from a repo slug', () => {
    expect(resolveRepoLink('vuepress/ecosystem', 'gitlab')).toBe(
      'https://gitlab.com/vuepress/ecosystem',
    )
  })

  it('should build a bitbucket link from a repo slug', () => {
    expect(resolveRepoLink('vuepress/ecosystem', 'bitbucket')).toBe(
      'https://bitbucket.org/vuepress/ecosystem',
    )
  })

  it('should keep the slug when the provider has no known host', () => {
    expect(resolveRepoLink('vuepress/ecosystem')).toBe('vuepress/ecosystem')
    expect(resolveRepoLink('vuepress/ecosystem', null)).toBe(
      'vuepress/ecosystem',
    )
  })
})
