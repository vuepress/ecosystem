#!/usr/bin/env node
/* oxlint-disable no-console */
import { spawn } from 'node:child_process'
import { access, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { createCommand } from 'commander'

import { VERSION } from './config/index.js'
import {
  checkTaobaoRegistry,
  getPackageManager,
  updatePackages,
} from './utils/index.js'

const runCommand = (command: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const child = spawn(command, { shell: true, stdio: 'inherit' })

    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`"${command}" exited with code ${code}`))
    })
  })

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

    try {
      await access(packageJSON)
    } catch {
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

    console.info('Install deps...')

    await runCommand(`${packageManager} install`)

    console.info('Upgrading deps...')

    await runCommand(
      packageManager === 'pnpm'
        ? `pnpm update`
        : packageManager === 'yarn1'
          ? `yarn upgrade`
          : packageManager === 'yarn'
            ? `yarn up`
            : packageManager === 'bun'
              ? `bun update`
              : `npm update`,
    )
  })

program.version(VERSION)
program.showHelpAfterError('add --help for additional information')

await program.parseAsync()
