import type { App } from 'vuepress'
import type { ChangelogOptions, ContributorInfo } from './options.js'
import type {
  GitChangelog,
  KnownGitProvider,
  MergedRawCommit,
} from './typings.js'
import {
  getContributorInfo,
  getUserNameWithNoreplyEmail,
} from './utils/index.js'

interface Pattern {
  issue?: string
  tag?: string
  commit?: string
}

const RE_ISSUE = /#(\d+)/g
const RE_CLEAN_REFS = /[()]/g

const patterns: Record<KnownGitProvider, Pattern> = {
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
): Pattern => {
  const fallback = provider ? patterns[provider] : {}

  return {
    commit: commitUrlPattern ?? fallback.commit,
    issue: issueUrlPattern ?? fallback.issue,
    tag: tagUrlPattern ?? fallback.tag,
  }
}

const parseTagName = (refs: string): string | undefined => {
  if (!refs) return

  const tags = refs
    .replace(RE_CLEAN_REFS, '')
    .split(',')
    .map((tag) => tag.trim())

  return tags[0]?.includes('tag:') ? tags[0].replace('tag:', '').trim() : ''
}

export const resolveChangelog = (
  app: App,
  commits: MergedRawCommit[],
  options: ChangelogOptions,
  gitProvider: KnownGitProvider | null,
  contributors: ContributorInfo[],
): GitChangelog[] => {
  const pattern = getPattern(options, gitProvider)
  const repo = options.repoUrl
  const result: GitChangelog[] = []

  const sliceCommits = options.maxCount
    ? commits.slice(0, options.maxCount)
    : commits

  for (const commit of sliceCommits) {
    const { hash, message, date, author, email, refs, coAuthors } = commit
    const tag = parseTagName(refs)
    const contributor = getContributorInfo(
      getUserNameWithNoreplyEmail(email) ?? author,
      contributors,
    )
    const resolved: GitChangelog = {
      hash,
      date,
      email,
      author: contributor?.name ?? contributor?.username ?? author,
      message: app.markdown.renderInline(message),
    }

    if (coAuthors.length) resolved.coAuthors = coAuthors

    if (pattern.issue && repo) {
      resolved.message = resolved.message.replace(
        RE_ISSUE,
        (matched, issue: string) => {
          const url = pattern
            .issue!.replace(':issue', issue)
            .replace(':repo', repo)
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${matched}</a>`
        },
      )
    }

    if (pattern.commit && repo)
      resolved.commitUrl = pattern.commit
        .replace(':hash', hash)
        .replace(':repo', repo)

    if (tag) resolved.tag = tag

    if (pattern.tag && repo && tag)
      resolved.tagUrl = pattern.tag.replace(':tag', tag).replace(':repo', repo)

    result.push(resolved)
  }

  return result
}
