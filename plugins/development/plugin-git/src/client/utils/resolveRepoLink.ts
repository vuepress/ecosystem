import { isLinkHttp } from '@vuepress/helper/client'
import type { KnownGitProvider } from '../../shared/index.js'

/**
 * Resolve repository link
 *
 * 解析仓库链接
 *
 * @param link - Repository link
 *
 * 仓库链接
 *
 * @param provider - Git provider
 *
 * Git 提供商
 */
export const resolveRepoLink = (
  link?: string,
  provider?: KnownGitProvider | null,
): string | undefined => {
  if (!link || isLinkHttp(link)) return link

  if (provider === 'github') return `https://github.com/${link}`

  if (provider === 'gitee') return `https://gitee.com/${link}`

  return link
}
