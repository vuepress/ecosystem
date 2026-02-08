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

/**
 * Resolve changelog
 *
 * 解析变更日志
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param commits - Git commits / Git 提交记录
 * @param options - Changelog options / 变更日志选项
 * @param contributors - Contributor info / 贡献者信息
 * @returns Resolved changelog info / 解析后的变更日志信息
 */
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

    if (coAuthors.length > 0) resolved.coAuthors = coAuthors

    if (tag) resolved.tag = tag

    result.push(resolved)
  }

  return result
}
