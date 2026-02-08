import { execSync } from 'node:child_process'

/**
 * Check if the directory is likely a valid Git repository root or subdirectory
 *
 * 检查目录是否为有效的 Git 仓库根目录或子目录
 *
 * @param cwd The directory to check / 要检查的目录
 * @returns True if it's a Git repository, false otherwise / 如果是 Git 仓库则返回 true，否则返回 false
 */
export const checkGitRepo = (cwd: string): boolean => {
  try {
    execSync('git status', {
      cwd,
      stdio: 'ignore',
      timeout: 5000, // prevent hanging
    })
    return true
  } catch {
    return false
  }
}
