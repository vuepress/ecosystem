import type { SpawnSyncReturns } from 'node:child_process'
import { spawnSync } from 'node:child_process'

export const checkWorkSpaceStatus = (): boolean => {
  let gitProcess: SpawnSyncReturns<string>

  try {
    gitProcess = spawnSync('git', ['status', '-s'], {
      encoding: 'utf8',
    })
  } catch (spawnError) {
    throw new Error(
      `Failed to spawn 'git' process: ${(spawnError as Error).message}`,
    )
  }

  const { error, status, stderr } = gitProcess

  if (error) {
    throw new Error(`Failed to start git process: ${error.message}`)
  }

  if (status !== 0) {
    throw new Error(`Git command failed with exit code ${status}: ${stderr}`)
  }

  return gitProcess.stdout.trim() === ''
}
