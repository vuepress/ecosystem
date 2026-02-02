#!/usr/bin/env node
/* eslint-disable no-console */
import { execSync, spawn } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { resolve as pathResolve } from 'node:path'
import { confirm, select } from '@inquirer/prompts'
import type { Command } from 'commander'
import { KNOWN_THEME_COMMANDS } from './config/index.js'
import { createPackageJson, generateTemplate } from './flow/index.js'
import { getLanguage } from './i18n/index.js'
import {
  ensureDirExistSync,
  getPackageManager,
  getRegistry,
  normalizeThemeName,
} from './utils/index.js'

type Bundler = 'vite' | 'webpack'
type Preset = 'blog' | 'docs'

interface CreateOptions {
  bundler?: Bundler
  preset?: Preset
  theme?: string
}

const bundlers: Bundler[] = ['vite', 'webpack']
const presets: Preset[] = ['blog', 'docs']

// oxlint-disable-next-line max-lines-per-function
export const mainAction = async function (
  this: Command,
  targetDir: string,
  { bundler, preset, theme = '@vuepress/theme-default' }: CreateOptions,
): Promise<void> {
  // get language
  const { lang, locale } = await getLanguage()

  // get packageManager
  const packageManager = await getPackageManager(locale.question.packageManager)

  // handle theme
  const themePackageName = normalizeThemeName(theme)

  if (themePackageName in KNOWN_THEME_COMMANDS) {
    execSync(
      `${packageManager} ${KNOWN_THEME_COMMANDS[themePackageName]} ${targetDir}`,
      { stdio: 'inherit', encoding: 'utf8' },
    )

    return
  }

  if (theme !== '@vuepress/theme-default') console.warn(locale.error.theme)

  // check bundler
  if (bundler && !['vite', 'webpack'].includes(bundler)) {
    this.error(locale.error.bundler)
  }

  // check presets
  if (preset && !['docs', 'blog'].includes(preset)) {
    this.error(locale.error.preset)
  }

  // check if the user is a noob and warn him
  if (!targetDir || (targetDir.startsWith('[') && targetDir.endsWith(']'))) {
    this.error(locale.error.dirMissing(packageManager))
  }

  const targetDirPath = pathResolve(process.cwd(), targetDir)

  // check if the user is trying to cover his files
  if (existsSync(targetDirPath) && readdirSync(targetDirPath).length > 0) {
    this.error(locale.error.dirNotEmpty(targetDir))
  }

  ensureDirExistSync(targetDirPath)

  // complete bundler
  // eslint-disable-next-line no-param-reassign
  bundler ??= await select<Bundler>({
    message: locale.question.bundler,
    choices: bundlers.map((item) => ({
      name: item,
      value: item,
    })),
  })

  // complete preset
  // eslint-disable-next-line no-param-reassign
  preset ??= await select<Preset>({
    message: locale.question.preset,
    choices: presets.map((item) => ({
      name: item,
      value: item,
    })),
  })

  /*
   * Generate template
   */

  await createPackageJson({
    targetDir,
    packageManager,
    locale,
    preset,
    bundler,
  })
  await generateTemplate({
    targetDirPath,
    packageManager,
    lang,
    locale,
    preset,
    bundler,
  })

  /*
   * Install deps
   */
  const registry =
    packageManager === 'pnpm' ? '' : await getRegistry(packageManager, lang)

  console.log(locale.flow.install)
  console.warn(locale.hint.install)

  execSync(
    `${packageManager} install ${registry ? `--registry ${registry}` : ''}`,
    { cwd: targetDirPath, stdio: 'inherit', encoding: 'utf8' },
  )

  console.log(locale.hint.finish)

  /*
   * Open dev server
   */
  if (
    await confirm({
      message: locale.question.devServer,
      default: true,
    })
  ) {
    console.log(locale.flow.devServer)

    // Wrap spawn in a Promise for async/await
    await new Promise<void>((resolve, reject) => {
      // When shell: true, pass the *entire* command string as the first argument.
      // The 'args' array is typically ignored or handled differently by the shell itself.
      const childProcess = spawn(`${packageManager} run docs:dev`, [], {
        cwd: targetDir,
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
        env: { ...process.env },
      })

      childProcess.on('error', (error) => {
        reject(error)
      })

      childProcess.on('close', (code, signal) => {
        // 'close' event fires after stdio streams are closed.
        if (code === 0) {
          // Success
          resolve()
        } else {
          reject(
            new Error(
              `Command failed with exit code ${code ?? 'unknown'} (signal: ${signal ?? 'none'}, code: ${code})`,
            ),
          )
        }
      })
    })
  } else {
    console.log(locale.hint.devServer(packageManager))
  }
}
