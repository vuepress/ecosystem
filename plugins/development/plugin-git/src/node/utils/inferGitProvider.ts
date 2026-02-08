import type { ExecSyncOptionsWithStringEncoding } from 'node:child_process' // Import native execSync
import { execSync } from 'node:child_process'
import type { KnownGitProvider } from '../../shared/index.js'

/**
 * Gets the URL of a Git remote.
 *
 * 获取 Git 远程仓库的 URL
 *
 * @param cwd - The directory where the git commands should be executed. / 执行 git 命令的目录
 *
 * @returns The URL of the Git remote, or null if it cannot be determined. / Git 远程仓库的 URL，如果无法确定则返回 null
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
 * Infer git provider from remote URL
 *
 * 从远程 URL 推断 Git 提供商
 *
 * @param cwd - The directory where the git commands should be executed / 执行 git 命令的目录
 *
 * @returns The inferred git provider, or null if it cannot be determined / 推断出的 Git 提供商，如果无法确定则返回 null
 */
export const inferGitProvider = (cwd: string): KnownGitProvider | null => {
  const remoteUrl = getRemoteUrl(cwd)

  if (!remoteUrl) return null

  if (remoteUrl.includes('github.com')) {
    return 'github'
  }

  if (remoteUrl.includes('gitlab.com')) {
    return 'gitlab'
  }

  if (remoteUrl.includes('gitee.com')) {
    return 'gitee'
  }

  if (remoteUrl.includes('bitbucket.org')) {
    return 'bitbucket'
  }

  return null
}
