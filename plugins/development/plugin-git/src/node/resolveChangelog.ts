import type { App } from 'vuepress'
import type { GitChangelogInfo } from '../shared/index.js'
import type { ChangelogOptions, ContributorInfo } from './options.js'
import type { MergedRawCommit } from './typings.js'
import {
  getContributorInfo,
  getUserNameWithNoreplyEmail,
  sanitizeHTML,
} from './utils/index.js'

const RE_CLEAN_REFS = /[()]/g

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
  contributors: ContributorInfo[],
): GitChangelogInfo[] => {
  const result: GitChangelogInfo[] = []

  const sliceCommits = options.maxCount
    ? commits.slice(0, options.maxCount)
    : commits

  for (const commit of sliceCommits) {
    const { hash, message, time, author, email, refs, coAuthors } = commit
    const tag = parseTagName(refs)
    const contributor = getContributorInfo(
      { name: getUserNameWithNoreplyEmail(email) ?? author, email },
      contributors,
    )
    const resolved: GitChangelogInfo = {
      hash,
      time,
      email: contributor?.email || email,
      author: contributor?.name ?? contributor?.username ?? author,
      message: sanitizeHTML(app.markdown.renderInline(message)),
    }

    if (coAuthors.length) resolved.coAuthors = coAuthors

    if (tag) resolved.tag = tag

    result.push(resolved)
  }

  return result
}
