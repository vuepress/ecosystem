import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'

/**
 * Gets the relative path from git root to the current directory
 *
 * @param cwd Current working directory
 * @returns Relative path from git root to cwd, or empty string if cwd is the git root
 */
export const getGitRelativePath = (cwd = process.cwd()): string => {
  let gitProcess: SpawnSyncReturns<string>

  try {
    // Get the git root directory
    gitProcess = spawnSync('git', ['rev-parse', '--show-toplevel'], {
      cwd,
      encoding: 'utf-8',
    })
  } catch (err) {
    throw new Error(
      `Failed to spawn 'git' process: ${(err as Error).message}`,
      { cause: err },
    )
  }

  const { error, status, stderr, stdout } = gitProcess

  if (error) {
    throw new Error(`Failed to start git process: ${error.message}`)
  }

  if (status !== 0) {
    throw new Error(`Git command failed with exit code ${status}: ${stderr}`)
  }

  const gitRootPath = stdout.trim()

  // If cwd is already the git root, return empty string
  if (cwd === gitRootPath) {
    return ''
  }

  // Calculate relative path from git root to cwd
  if (cwd.startsWith(gitRootPath)) {
    // Remove the git root path and the leading slash
    const relativePath = cwd.slice(gitRootPath.length + 1)
    return relativePath
  }

  throw new Error(
    `Current directory ${cwd} is not within the git repository root ${gitRootPath}`,
  )
}

export const getWorkspaceStatus = (cwd = process.cwd()): string => {
  let gitProcess: SpawnSyncReturns<string>

  try {
    gitProcess = spawnSync('git', ['status', '--porcelain'], {
      cwd,
      encoding: 'utf-8',
    })
  } catch (err) {
    throw new Error(
      `Failed to spawn 'git' process: ${(err as Error).message}`,
      { cause: err },
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
 * Gets files changed in the most recent commit
 */
export const getChangedFilesByDiff = (cwd = process.cwd()): string[] => {
  let gitProcess: SpawnSyncReturns<string>

  try {
    gitProcess = spawnSync('git', ['diff', 'HEAD~1', 'HEAD', '--name-only'], {
      cwd,
      encoding: 'utf-8',
    })
  } catch (err) {
    throw new Error(
      `Failed to spawn 'git' process: ${(err as Error).message}`,
      { cause: err },
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

    const [statusX, statusY] = line

    // Check for unstaged changes or untracked files
    if (
      (statusY !== ' ' && statusY !== '?' && statusX === ' ') ||
      line.startsWith('??')
    ) {
      throw new Error(
        'There are unstaged/untracked files in the workspace. Please stage or remove them before proceeding.',
      )
    }

    const filePath =
      // For renamed files, get the new path (after "->")
      statusX === 'R' || statusX === 'C'
        ? line.slice(3).split(' -> ')[1]
        : line.slice(3)

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

  return status ? parseGitStatus(status) : getChangedFilesByDiff(cwd)
}
