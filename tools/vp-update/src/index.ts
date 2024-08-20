#!/usr/bin/env node
/* eslint-disable no-console */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cac } from 'cac'
import { VERSION } from './config/index.js'
import {
  checkTaobaoRegistry,
  getPackageManager,
  updatePackages,
} from './utils/index.js'

const cli = cac('vp-update')

cli
  .command('[dir]', 'Update VuePress project')
  .usage(
    'pnpm dlx vp-update [dir] / npx vp-update [dir] / bunx vp-update [dir]',
  )
  .example('docs')
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  .action(async (targetDir: string = ''): Promise<Error | void> => {
    console.log('Bumping deps...')
    const dir = resolve(process.cwd(), targetDir)
    const packageJSON = resolve(dir, 'package.json')

    if (!existsSync(packageJSON))
      return new Error(`No package.json found in ${targetDir || 'current dir'}`)

    const packageManager = getPackageManager()

    checkTaobaoRegistry(packageManager)

    const content = readFileSync(packageJSON, { encoding: 'utf-8' })

    const packageJSONContent = JSON.parse(content) as Record<
      string,
      unknown
    > & {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }

    await Promise.all([
      packageJSONContent.dependencies
        ? updatePackages(packageManager, packageJSONContent.dependencies)
        : Promise.resolve(),
      packageJSONContent.devDependencies
        ? updatePackages(packageManager, packageJSONContent.devDependencies)
        : Promise.resolve(),
    ])

    writeFileSync(
      packageJSON,
      `${JSON.stringify(packageJSONContent, null, 2)}\n`,
    )

    console.info('Install deps...')

    spawnSync(`${packageManager} install`, {
      shell: true,
      stdio: 'inherit',
    })

    console.info('Upgrading deps...')

    spawnSync(
      packageManager === 'pnpm'
        ? `pnpm update`
        : packageManager === 'yarn1'
          ? `yarn upgrade`
          : packageManager === 'yarn'
            ? `yarn up`
            : packageManager === 'bun'
              ? `bun update`
              : `npm update`,
      {
        shell: true,
        stdio: 'inherit',
      },
    )
  })

cli.help(() => [
  {
    title:
      'pnpm dlx vp-update [dir] / npx vp-update [dir] / bunx vp-update [dir]',
    body: 'Update VuePress project in [dir]',
  },
])

cli.version(VERSION)

cli.parse()
