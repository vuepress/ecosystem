import { execaCommandSync } from 'execa'
import inquirer from 'inquirer'
import type { Lang } from '../i18n/index.js'
import type { PackageManager } from './getPackageManager.js'

interface RegistryAnswer {
  registry: '国内镜像源' | '当前源'
}

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
      }} ${NPM_MIRROR_REGISTRY}`,
    )
  }

  if (lang === '简体中文') {
    const { registry } = await inquirer.prompt<RegistryAnswer>([
      {
        name: 'registry',
        type: 'list',
        message: '选择你想使用的源',
        choices: ['国内镜像源', '当前源'],
      },
    ])

    return registry === '国内镜像源' ? NPM_MIRROR_REGISTRY : userRegistry
  }

  return userRegistry
}
