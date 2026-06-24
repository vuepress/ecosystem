#!/usr/bin/env node
/* oxlint-disable no-console */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { createCommand } from 'commander'

import { VERSION } from './config/index.js'
import {
  checkTaobaoRegistry,
  getPackageManager,
  getUpdateCommand,
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

    const dir = path.resolve(process.cwd(), targetDir)
    const packageJSON = path.resolve(dir, 'package.json')

    if (!existsSync(packageJSON)) {
      return program.error(
        `No package.json found in ${targetDir || 'current dir'}`,
      )
    }

    const packageManager = getPackageManager()

    checkTaobaoRegistry(packageManager)

    const content = await readFile(packageJSON, 'utf-8')

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

    await writeFile(
      packageJSON,
      `${JSON.stringify(packageJSONContent, null, 2)}\n`,
    )

    console.info('Installing deps...')

    spawnSync(`${packageManager} install`, {
      shell: true,
      stdio: 'inherit',
    })

    console.info('Upgrading deps...')

    spawnSync(getUpdateCommand(packageManager), {
      shell: true,
      stdio: 'inherit',
    })
  })

program.version(VERSION)
program.showHelpAfterError('add --help for additional information')

await program.parseAsync()
