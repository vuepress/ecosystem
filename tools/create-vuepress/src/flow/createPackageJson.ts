import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import inquirer from 'inquirer'
import type { CreateLocaleOptions } from '../i18n/index.js'
import type { PackageManager } from '../utils/index.js'

const PACKAGE_NAME_REG =
  /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/u

const VERSION_REG = /^[0-9]+\.[0-9]+\.(?:[0-9]+|[0-9]+-[a-z]+\.[0-9])$/u

interface CreatePackageJsonOptions {
  targetDir: string
  packageManager: PackageManager
  locale: CreateLocaleOptions
  preset: 'blog' | 'docs'
  bundler: 'vite' | 'webpack'
}

interface PackageJsonAnswer {
  name: string
  version: string
  description: string
  license: string
}

/**
 * generate package.json
 */
export const createPackageJson = async ({
  targetDir,
  packageManager,
  locale,
  preset,
  bundler,
}: CreatePackageJsonOptions): Promise<void> => {
  const packageJsonPath = join(targetDir, 'package.json')
  // TODO: Update it
  const devDependencies = {
    '@vuepress/client': '^2.0.0-rc.0',
    [`@vuepress/bundler-${bundler}`]: '^2.0.0-rc.0',
    '@vuepress/theme-default': '^2.0.0-rc.0',
    'vue': '^3.4.0',
    'vuepress': '^2.0.0-rc.0',
  }

  if (preset === 'blog') {
    devDependencies['@vuepress/core'] = '^2.0.0-rc.0'
    devDependencies['vue-router'] = '^4.2.5'
  }

  console.log(locale.flow.createPackage)

  const result = await inquirer.prompt<PackageJsonAnswer>([
    {
      name: 'name',
      type: 'input',
      message: locale.question.name,
      default: 'my-vuepress-site',
      validate: (input: string): true | string =>
        PACKAGE_NAME_REG.exec(input) ? true : locale.error.name,
    },
    {
      name: 'version',
      type: 'input',
      message: locale.question.version,
      default: '0.0.1',
      validate: (input: string): true | string =>
        VERSION_REG.exec(input) ? true : locale.error.version,
    },
    {
      name: 'description',
      type: 'input',
      message: locale.question.description,
      default: 'A VuePress project',
    },
    {
      name: 'license',
      type: 'input',
      message: locale.question.license,
      default: 'MIT',
    },
  ])

  const packageContent = {
    ...result,
    type: 'module',
    scripts: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'docs:build': `vuepress build src`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'docs:clean-dev': `vuepress dev src --clean-cache`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'docs:dev': `vuepress dev src`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'docs:update-package': `${
        packageManager === 'npm' ? 'npx' : `${packageManager} dlx`
      } vp-update`,
    },
    devDependencies,
  }

  writeFileSync(
    packageJsonPath,
    `${JSON.stringify(packageContent, null, 2)}\n`,
    { encoding: 'utf-8' },
  )
}
