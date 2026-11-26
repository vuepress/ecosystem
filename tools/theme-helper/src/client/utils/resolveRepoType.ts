import { isLinkHttp } from 'vuepress/shared'

/**
 * Type of the repository
 *
 * 仓库类型
 */
export type RepoType = 'Bitbucket' | 'Gitee' | 'GitHub' | 'GitLab' | null

/**
 * Resolve the type of the repository from its link
 *
 * A repository without a complete link is considered to be hosted on GitHub.
 *
 * 从仓库链接解析仓库类型
 *
 * 没有完整链接的仓库会被视为托管在 GitHub 上。
 *
 * @param repo - Repository link or `owner/repo` / 仓库链接或 `owner/repo`
 * @returns Type of the repository, or `null` if it is not recognized /
 *   仓库类型，无法识别时为 `null`
 */
export const resolveRepoType = (repo: string): RepoType => {
  if (!isLinkHttp(repo) || /^(?:https?:)?\/\/github\.com\//u.test(repo))
    return 'GitHub'

  if (/^(?:https?:)?\/\/bitbucket\.org\//u.test(repo)) return 'Bitbucket'
  if (/^(?:https?:)?\/\/gitlab\.com\//u.test(repo)) return 'GitLab'
  if (/^(?:https?:)?\/\/gitee\.com\//u.test(repo)) return 'Gitee'

  return null
}
