import type { ExecSyncOptionsWithStringEncoding } from 'node:child_process' // Import native execSync
import { execSync } from 'node:child_process'

import type { KnownGitProvider } from '../../shared/index.js'

/**
 * Gets the URL of a Git remote.
 *
 * 获取 Git 远程仓库的 URL
 *
 * @param cwd - The directory where the git commands should be executed. / 执行
 *   git 命令的目录
 * @returns The URL of the Git remote, or null if it cannot be determined. / Git
 *   远程仓库的 URL，如果无法确定则返回 null
 */
export const getRemoteUrl = (cwd: string): string | null => {
  const execOptions: ExecSyncOptionsWithStringEncoding = {
    cwd,
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'ignore'],
    // prevent hanging
    timeout: 5000,
  }

  try {
    const originUrl = execSync('git remote get-url origin', execOptions)

    return originUrl.trim()
  } catch {
    try {
      const remotesOutput = execSync('git remote', execOptions)
      const firstRemote = remotesOutput.split('\n')[0]?.trim()

      if (firstRemote) {
        const remoteUrl = execSync(
          `git remote get-url ${firstRemote}`,
          execOptions,
        )

        return remoteUrl.trim()
      }

      return null
    } catch {
      return null
    }
  }
}

/**
 * Normalize git remote URL to clean HTTPS format
 *
 * 将 Git 远程 URL 规范化为干净的 HTTPS 格式
 *
 * @example
 *   normalizeRepoUrl('https://github.com/user/repo.git') // 'https://github.com/user/repo'
 *   normalizeRepoUrl('git@github.com:user/repo.git') // 'https://github.com/user/repo'
 *   normalizeRepoUrl('ssh://git@github.com/user/repo.git') // 'https://github.com/user/repo'
 *
 * @param url - The git remote URL / Git 远程 URL
 * @returns Normalized HTTPS URL / 规范化后的 HTTPS URL
 */
export const normalizeRepoUrl = (url: string): string => {
  const normalized = url.replace(/\.git$/u, '')

  const sshMatch = /^git@([^:]+):(.+)$/u.exec(normalized)
  if (sshMatch) return `https://${sshMatch[1]}/${sshMatch[2]}`

  const sshProtocolMatch = /^ssh:\/\/git@([^/]+)\/(.+)$/u.exec(normalized)
  if (sshProtocolMatch)
    return `https://${sshProtocolMatch[1]}/${sshProtocolMatch[2]}`

  const gitProtocolMatch = /^git:\/\/([^/]+)\/(.+)$/u.exec(normalized)
  if (gitProtocolMatch)
    return `https://${gitProtocolMatch[1]}/${gitProtocolMatch[2]}`

  return normalized
}

/**
 * Infer git provider from remote URL
 *
 * 从远程 URL 推断 Git 提供商
 *
 * @param cwd - The directory where the git commands should be executed / 执行 git
 *   命令的目录
 * @returns The inferred git provider, or null if it cannot be determined / 推断出的
 *   Git 提供商，如果无法确定则返回 null
 */
export const inferGitProvider = (cwd: string): KnownGitProvider | null => {
  const remoteUrl = getRemoteUrl(cwd)

  if (!remoteUrl) return null

  if (remoteUrl.includes('github.com')) return 'github'

  if (remoteUrl.includes('gitlab.com')) return 'gitlab'

  if (remoteUrl.includes('gitee.com')) return 'gitee'

  if (remoteUrl.includes('bitbucket.org')) return 'bitbucket'

  return null
}
