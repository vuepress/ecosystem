import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { logger } from 'vuepress/utils'

export const getWorkspaceStatus = (cwd = process.cwd()): string => {
  let gitProcess: SpawnSyncReturns<string>

  try {
    gitProcess = spawnSync('git', ['status', '--porcelain'], {
      cwd,
      encoding: 'utf8',
    })
  } catch (spawnError) {
    throw new Error(
      `Failed to spawn 'git' process: ${(spawnError as Error).message}`,
    )
  }

  const { error, status, stderr, stdout } = gitProcess

  if (error) {
    throw new Error(`Failed to start git process: ${error.message}`)
  }

  if (status !== 0) {
    throw new Error(`Git command failed with exit code ${status}: ${stderr}`)
  }

  return stdout.trim()
}

/**
 * Checks if a full rescrape is needed by examining the most recent commit
 * Returns true if workspace is clean and the most recent commit message contains [full-scrape]
 *
 * @param cwd Current working directory
 * @returns Whether a full rescrape should be performed
 */
export const shouldRescrape = (cwd = process.cwd()): boolean => {
  // First check if the workspace is clean
  const status = getWorkspaceStatus(cwd)

  if (status) {
    // If there are changes in the workspace, no need for a full rescrape
    return false
  }

  // Check the latest commit message
  let gitProcess: SpawnSyncReturns<string>

  try {
    gitProcess = spawnSync('git', ['log', '-1', '--pretty=%B'], {
      cwd,
      encoding: 'utf-8',
    })
  } catch (spawnError) {
    logger.warn(
      `Failed to get commit message: ${(spawnError as Error).message}`,
    )
    return false
  }

  const { error, status: exitStatus, stderr, stdout } = gitProcess

  if (error || exitStatus !== 0) {
    logger.warn(`Failed to get commit message: ${error?.message || stderr}`)
    return false
  }

  const commitMessage = stdout.trim()

  // Check if the commit message contains the [full-scrape] marker
  return commitMessage.includes('[full-scrape]')
}

/**
 * Gets files changed in the most recent commit
 */
export const getChangedFilesByDiff = (cwd = process.cwd()): string[] => {
  let gitProcess: SpawnSyncReturns<string>

  try {
    gitProcess = spawnSync('git', ['diff', 'HEAD~1', 'HEAD', '--name-only'], {
      cwd,
      encoding: 'utf-8',
    })
  } catch (spawnError) {
    throw new Error(
      `Failed to spawn 'git' process: ${(spawnError as Error).message}`,
    )
  }

  const { error, status, stderr, stdout } = gitProcess

  if (error) {
    throw new Error(`Failed to start git process: ${error.message}`)
  }

  if (status !== 0) {
    throw new Error(`Git command failed with exit code ${status}: ${stderr}`)
  }

  return stdout.trim().split('\n').filter(Boolean)
}

/**
 * Parse git status output and return file paths
 */
export const parseGitStatus = (status: string): string[] => {
  const changedFiles: string[] = []

  // Handle empty status case
  if (!status) return []

  status.split('\n').forEach((line) => {
    if (!line) return

    const statusX = line[0]
    const statusY = line[1]

    // Check for unstaged changes
    if (statusY !== ' ' && statusY !== '?' && statusX === ' ') {
      throw new Error(
        'There are unstaged changes in the workspace. Please stage all changes before proceeding.',
      )
    }

    // Check for untracked files and throw error
    if (line.startsWith('??')) {
      throw new Error(
        'There are untracked files in the workspace. Please stage or remove them before proceeding.',
      )
    }

    // Handle the file path
    let filePath: string

    if (statusX === 'R' || statusX === 'C') {
      // For renamed files, get the new path (after "->")
      filePath = line.substring(3).split(' -> ')[1]
    } else {
      filePath = line.substring(3)
    }

    changedFiles.push(filePath)
  })

  return changedFiles
}

/**
 * Get changed files based on repository state
 *
 * @param cwd Current working directory
 * @returns Array of changed file paths
 */
export const getChangedFiles = (cwd = process.cwd()): string[] => {
  const status = getWorkspaceStatus(cwd)

  // If workspace is clean, return files from the last commit
  if (!status) {
    return getChangedFilesByDiff(cwd)
  }

  // Otherwise, parse the status output and ensure all changes are staged
  return parseGitStatus(status)
}
