import { spawnSync } from 'node:child_process'

export const checkYarnClassic = (): boolean => {
  try {
    return spawnSync('yarn --version', [], {
      stdio: 'ignore',
      shell: true,
    })
      .stdout.toString()
      .startsWith('1')
  } catch {
    return false
  }
}
