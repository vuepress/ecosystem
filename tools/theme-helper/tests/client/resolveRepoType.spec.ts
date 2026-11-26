import { describe, expect, it } from 'vitest'

import { resolveRepoType } from '../../src/client/utils/resolveRepoType.js'

describe(resolveRepoType, () => {
  it('should resolve the type of the known repositories', () => {
    expect(resolveRepoType('vuepress/ecosystem')).toBe('GitHub')
    expect(resolveRepoType('https://github.com/vuepress/ecosystem')).toBe(
      'GitHub',
    )
    expect(resolveRepoType('https://gitlab.com/vuepress/ecosystem')).toBe(
      'GitLab',
    )
    expect(resolveRepoType('https://bitbucket.org/vuepress/ecosystem')).toBe(
      'Bitbucket',
    )
    expect(resolveRepoType('https://gitee.com/vuepress/ecosystem')).toBe(
      'Gitee',
    )
  })

  it('should return null for the unknown repository', () => {
    expect(resolveRepoType('https://example.com/vuepress/ecosystem')).toBeNull()
  })
})
