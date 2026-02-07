import { execSync } from 'node:child_process'
import { select } from '@inquirer/prompts'
import type { Lang } from '../i18n/index.js'
import { checkYarnClassic } from './checkYarnClassic.js'
import type { PackageManager } from './getPackageManager.js'

const NPM_MIRROR_REGISTRY = 'https://registry.npmmirror.com/'

const getUserRegistry = (
  packageManager: PackageManager,
  isYarnModern: boolean,
): string =>
  execSync(
    `${packageManager} config get ${
      isYarnModern ? 'npmRegistryServer' : 'registry'
    }`,
    { encoding: 'utf-8' },
  ).trim()

export const getRegistry = async (
  packageManager: PackageManager,
  lang: Lang,
): Promise<string> => {
  const isYarnModern = packageManager === 'yarn' && !checkYarnClassic()

  const userRegistry = getUserRegistry(packageManager, isYarnModern)

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
