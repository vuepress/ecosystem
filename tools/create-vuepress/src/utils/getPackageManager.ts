import { spawnSync } from 'node:child_process'
import { select } from '@inquirer/prompts'

const checkPnpmInstalled = (): boolean => {
  try {
    return (
      spawnSync('pnpm --version', [], {
        stdio: 'ignore',
        shell: true,
      }).status === 0
    )
  } catch {
    return false
  }
}

const checkYarnInstalled = (): boolean => {
  try {
    return (
      spawnSync('yarn --version', [], {
        stdio: 'ignore',
        shell: true,
      }).status === 0
    )
  } catch {
    return false
  }
}

export type PackageManager = 'npm' | 'pnpm' | 'yarn'

const availablePackageManagers: PackageManager[] = ['npm']

if (checkYarnInstalled()) availablePackageManagers.unshift('yarn')
if (checkPnpmInstalled()) availablePackageManagers.unshift('pnpm')

export const getPackageManager = (message: string): Promise<PackageManager> =>
  select<PackageManager>({
    message,
    choices: availablePackageManagers.map((pm) => ({
      name: pm,
      value: pm,
    })),
  })
