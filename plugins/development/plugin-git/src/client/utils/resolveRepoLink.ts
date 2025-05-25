import { isLinkHttp } from '@vuepress/helper/client'
import type { KnownGitProvider } from '../../shared/index.js'

export const resolveRepoLink = (
  link?: string,
  provider?: KnownGitProvider | null,
): string | undefined => {
  if (!link || isLinkHttp(link)) return link

  if (provider === 'github') return `https://github.com/${link}`

  if (provider === 'gitee') return `https://gitee.com/${link}`

  return link
}
