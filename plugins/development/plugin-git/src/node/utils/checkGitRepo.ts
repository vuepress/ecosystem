import { execaCommandSync } from 'execa'
import type { GitType } from '../types.js'

/**
 * Check if the git repo is valid
 */
export const checkGitRepo = (cwd: string): boolean => {
  try {
    execaCommandSync('git log', { cwd })
    return true
  } catch {
    return false
  }
}

export const checkGitRepoType = (cwd: string): GitType | null => {
  try {
    const { stdout } = execaCommandSync('git config --get remote.origin.url', {
      cwd,
    })
    if (stdout.includes('github.com')) {
      return 'github'
    }
    if (stdout.includes('gitlab.com')) {
      return 'gitlab'
    }
    if (stdout.includes('gitee.com')) {
      return 'gitee'
    }
    if (stdout.includes('bitbucket.org')) {
      return 'bitbucket'
    }
    return null
  } catch {
    return null
  }
}
