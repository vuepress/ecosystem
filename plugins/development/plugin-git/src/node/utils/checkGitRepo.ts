import { execSync } from 'node:child_process'

/**
 * Check if the directory is likely a valid Git repository root or subdirectory
 *
 * @param cwd The directory to check.
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
