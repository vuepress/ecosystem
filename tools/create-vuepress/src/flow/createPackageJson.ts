/* eslint-disable no-console */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { input } from '@inquirer/prompts'
import type { CreateLocaleOptions } from '../i18n/index.js'
import type { PackageManager } from '../utils/index.js'
import { peerDependencies } from '../utils/index.js'

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
  const devDependencies = {
    [`@vuepress/bundler-${bundler}`]: '2.0.0-rc.19',
    '@vuepress/theme-default': peerDependencies['@vuepress/theme-default'],
    'sass-embedded': '^1.85.0',
    'vue': '^3.5.12',
    'vuepress': '2.0.0-rc.19',
  }

  if (preset === 'blog') {
    devDependencies['@vuepress/plugin-blog'] =
      peerDependencies['@vuepress/plugin-blog']
  }

  console.info(locale.flow.createPackage)

  const name = await input({
    message: locale.question.name,
    default: 'my-vuepress-site',
    validate: (value: string): string | true =>
      PACKAGE_NAME_REG.exec(value) ? true : locale.error.name,
  })

  const description = await input({
    message: locale.question.description,
    default: 'A VuePress project',
  })

  const version = await input({
    message: locale.question.version,
    default: '0.0.1',
    validate: (value: string): string | true =>
      VERSION_REG.exec(value) ? true : locale.error.version,
  })

  const license = await input({
    message: locale.question.license,
    default: 'MIT',
  })

  const packageContent = {
    name,
    description,
    version,
    license,
    type: 'module',
    scripts: {
      'docs:build': `vuepress build docs`,
      'docs:clean-dev': `vuepress dev docs --clean-cache`,
      'docs:dev': `vuepress dev docs`,
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
