import { describe, expect, it } from 'vitest'

import { injectGitOptions } from '../../src/node/utils/injectGitOptions.js'

describe('inject git options', () => {
  it('should only expose the provider when the changelog is disabled', () => {
    expect(injectGitOptions('github', false)).toStrictEqual({
      provider: 'github',
    })
  })

  it('should use the url patterns of the provider', () => {
    expect(injectGitOptions('github', true)).toStrictEqual({
      pattern: {
        commit: ':repo/commit/:hash',
        issue: ':repo/issues/:issue',
        tag: ':repo/releases/tag/:tag',
      },
      provider: 'github',
      repo: undefined,
    })

    expect(injectGitOptions('gitlab', true).pattern).toStrictEqual({
      commit: ':repo/-/commit/:hash',
      issue: ':repo/-/issues/:issue',
      tag: ':repo/-/releases/:tag',
    })

    expect(injectGitOptions('bitbucket', true).pattern).toStrictEqual({
      commit: ':repo/commits/:hash',
      issue: ':repo/issues/:issue',
      tag: ':repo/src/:tag',
    })
  })

  it('should let the changelog options override the provider patterns', () => {
    expect(
      injectGitOptions('github', {
        commitUrlPattern: 'https://example.com/commit/:hash',
        repoUrl: 'https://example.com/repo',
      }),
    ).toStrictEqual({
      pattern: {
        commit: 'https://example.com/commit/:hash',
        issue: ':repo/issues/:issue',
        tag: ':repo/releases/tag/:tag',
      },
      provider: 'github',
      repo: 'https://example.com/repo',
    })
  })

  it('should not expose any pattern when the provider is unknown', () => {
    expect(injectGitOptions(null, true)).toStrictEqual({
      pattern: { commit: undefined, issue: undefined, tag: undefined },
      provider: null,
      repo: undefined,
    })
  })
})
