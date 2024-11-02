import type { App } from 'vuepress'
import type {
  ChangelogOptions,
  ContributorConfig,
  GitChangelog,
  GitType,
  MergedRawCommit,
} from '../types.js'
import {
  getAuthorNameWithNoreplyEmail,
  getContributorWithConfig,
} from './resolveContributors.js'

interface Pattern {
  issue?: string
  tag?: string
  commit?: string
}

const RE_ISSUE = /#(\d+)/g
const RE_CLEAN_REFS = /[()]/g

const patterns: Record<GitType, Pattern> = {
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
  type: GitType | null,
): Pattern => {
  const fallback = type ? patterns[type] : {}

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

  return tags[0]?.replace('tag:', '').trim()
}

export const resolveChangelogs = (
  app: App,
  commits: MergedRawCommit[],
  options: ChangelogOptions,
  type: GitType | null,
  contributors: ContributorConfig[],
): GitChangelog[] => {
  const pattern = getPattern(options, type)
  const repo = options.repoUrl
  const result: GitChangelog[] = []

  const sliceCommits = options.maxCount
    ? commits.slice(0, options.maxCount)
    : commits

  for (const commit of sliceCommits) {
    const { hash, message, date, author, email, refs } = commit
    const tag = parseTagName(refs)

    const resolved: GitChangelog = {
      hash,
      date,
      email,
      author:
        getContributorWithConfig(
          contributors,
          getAuthorNameWithNoreplyEmail(email) ?? author,
        )?.username ?? author,
      message: app.markdown.renderInline(message),
    }

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

    if (pattern.tag && repo && tag)
      resolved.tagUrl = pattern.tag.replace(':tag', tag).replace(':repo', repo)

    result.push(resolved)
  }

  return result
}
