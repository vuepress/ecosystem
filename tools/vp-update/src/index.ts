#!/usr/bin/env node
/* eslint-disable no-console */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createCommand } from 'commander'
import { VERSION } from './config/index.js'
import {
  checkTaobaoRegistry,
  getPackageManager,
  updatePackages,
} from './utils/index.js'

const program = createCommand('vp-update')

program
  .summary('Update VuePress project')
  .argument('[dir]', 'Dir of VuePress project', '')
  .usage(
    `
pnpm dlx vp-update [dir] / npx vp-update [dir] / bunx vp-update [dir]\
`,
  )
  .action(async (targetDir: string = ''): Promise<void> => {
    console.log('Bumping deps...')

    const dir = resolve(process.cwd(), targetDir)
    const packageJSON = resolve(dir, 'package.json')

    if (!existsSync(packageJSON))
      return program.error(
        `No package.json found in ${targetDir || 'current dir'}`,
      )

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

program.version(VERSION)
program.showHelpAfterError('add --help for additional information')

await program.parseAsync()
