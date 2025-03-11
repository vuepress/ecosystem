import { isPlainObject } from 'vuepress/shared'
import type {
  GitInjectOptions,
  GitUrlPattern,
  KnownGitProvider,
} from '../../shared/index.js'
import type { ChangelogOptions } from '../options.js'

const PATTERN_PRESET: Record<KnownGitProvider, GitUrlPattern> = {
  github: {
    issue: ':repo/issues/:issue',
    tag: ':repo/releases/tag/:tag',
    commit: ':repo/commit/:hash',
  },
  gitlab: {
    issue: ':repo/-/issues/:issue',
    tag: ':repo/-/releases/:tag',
    commit: ':repo/-/commit/:hash',
  },
  gitee: {
    issue: ':repo/issues/:issue',
    tag: ':repo/releases/tag/:tag',
    commit: ':repo/commit/:hash',
  },
  bitbucket: {
    issue: ':repo/issues/:issue',
    tag: ':repo/src/:hash',
    commit: ':repo/commits/:hash',
  },
}

const getPattern = (
  { commitUrlPattern, issueUrlPattern, tagUrlPattern }: ChangelogOptions,
  provider: KnownGitProvider | null,
): GitUrlPattern => {
  const fallback = provider ? PATTERN_PRESET[provider] : {}

  return {
    commit: commitUrlPattern ?? fallback.commit,
    issue: issueUrlPattern ?? fallback.issue,
    tag: tagUrlPattern ?? fallback.tag,
  }
}

export const injectGitOptions = (
  provider: KnownGitProvider | null,
  changelog: ChangelogOptions | boolean,
): GitInjectOptions => {
  const data: GitInjectOptions = {
    provider,
  }
  if (changelog) {
    const changelogOptions = isPlainObject(changelog) ? changelog : {}
    data.pattern = getPattern(changelogOptions, provider)
    data.repo = changelogOptions.repoUrl
  }

  return data
}
