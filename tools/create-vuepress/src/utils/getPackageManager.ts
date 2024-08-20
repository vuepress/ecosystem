import { select } from '@inquirer/prompts'
import { execaCommandSync } from 'execa'

const checkPnpmInstalled = (): boolean => {
  try {
    return (
      execaCommandSync('pnpm --version', { stdio: 'ignore' }).exitCode === 0
    )
  } catch {
    return false
  }
}

const checkYarnInstalled = (): boolean => {
  try {
    return (
      execaCommandSync('yarn --version', { stdio: 'ignore' }).exitCode === 0
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
