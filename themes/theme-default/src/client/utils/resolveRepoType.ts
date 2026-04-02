import { isLinkHttp } from 'vuepress/shared'

export type RepoType = 'Bitbucket' | 'Gitee' | 'GitHub' | 'GitLab' | null

export const resolveRepoType = (repo: string): RepoType => {
  if (!isLinkHttp(repo) || repo.includes('github.com')) return 'GitHub'

  if (/^(https?:)?\/\/bitbucket\.org\//.test(repo)) return 'Bitbucket'
  if (/^(https?:)?\/\/gitlab\.com\//.test(repo)) return 'GitLab'
  if (/^(https?:)?\/\/gitee\.com\//.test(repo)) return 'Gitee'

  return null
}
