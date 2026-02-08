import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { logger } from 'vuepress/utils'
import { getWorkspaceStatus } from './utils.js'

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
  } catch (err) {
    logger.warn(`Failed to get commit message: ${(err as Error).message}`)
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
