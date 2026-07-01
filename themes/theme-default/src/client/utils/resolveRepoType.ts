import { isLinkHttp } from 'vuepress/shared'

export type RepoType = 'Bitbucket' | 'Gitee' | 'GitHub' | 'GitLab' | null

export const resolveRepoType = (repo: string): RepoType => {
  if (!isLinkHttp(repo) || /^(?:https?:)?\/\/github\.com\//u.test(repo))
    return 'GitHub'

  if (/^(?:https?:)?\/\/bitbucket\.org\//u.test(repo)) return 'Bitbucket'
  if (/^(?:https?:)?\/\/gitlab\.com\//u.test(repo)) return 'GitLab'
  if (/^(?:https?:)?\/\/gitee\.com\//u.test(repo)) return 'Gitee'

  return null
}
