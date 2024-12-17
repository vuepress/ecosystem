/* eslint-disable no-console */
import { select } from '@inquirer/prompts'
import { execaCommandSync } from 'execa'
import type { Lang } from '../i18n/index.js'
import type { PackageManager } from './getPackageManager.js'

const NPM_MIRROR_REGISTRY = 'https://registry.npmmirror.com/'

const getUserRegistry = (
  packageManager: PackageManager,
  isYarnModern: boolean,
): string =>
  execaCommandSync(
    `${packageManager} config get ${
      isYarnModern ? 'npmRegistryServer' : 'registry'
    }`,
  ).stdout

export const getRegistry = async (
  packageManager: PackageManager,
  lang: Lang,
): Promise<string> => {
  const isYarnModern =
    packageManager === 'yarn' &&
    !execaCommandSync('yarn --version').stdout.startsWith('1')

  const userRegistry = getUserRegistry(packageManager, isYarnModern)

  if (/https:\/\/registry\.npm\.taobao\.org\/?/.test(userRegistry)) {
    console.error(
      'npm.taobao.org is no longer available, resetting it to npmmirror.com',
    )

    execaCommandSync(
      `${packageManager} config set ${
        isYarnModern ? 'npmRegistryServer' : 'registry'
      } ${NPM_MIRROR_REGISTRY}`,
    )
  }

  if (lang === 'zh') {
    return select({
      message: '选择你想使用的源',
      choices: [
        {
          name: '国内镜像源',
          value: NPM_MIRROR_REGISTRY,
        },
        {
          name: '当前源',
          value: userRegistry,
        },
      ],
    })
  }

  return userRegistry
}
