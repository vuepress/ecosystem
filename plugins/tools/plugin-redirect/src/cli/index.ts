#!/usr/bin/env node
import { removeEndingSlash, removeLeadingSlash } from '@vuepress/helper'
import { createCommand } from 'commander'
import {
  loadUserConfig,
  resolveAppConfig,
  resolveCliAppConfig,
  resolveUserConfigConventionalPath,
  resolveUserConfigPath,
  transformUserConfigToPlugin,
} from 'vuepress/cli'
import { createBuildApp } from 'vuepress/core'
import { fs, logger, path } from 'vuepress/utils'
import pkg from '../../package.json' with { type: 'json' }
import { getRedirectHTML } from '../node/generate/getRedirectHTML.js'

interface RedirectCommandOptions {
  hostname: string
  config?: string
  cache?: string
  temp?: string
  cleanCache?: boolean
  cleanTemp?: boolean
}

const program = createCommand('vp-redirect')

program
  .summary('Generate redirect site')
  .description('Generate redirect site for current VuePress project')
  .option(
    '--hostname <hostname>',
    'Hostname to redirect to (E.g.: https://new.example.com/)',
    '/',
  )
  .option('-c, --config [config]', 'Set path to config file')
  .option('--cache [cache]', 'Set the directory of the cache files')
  .option('--temp [temp]', 'Set the directory of the temporary files')
  .option('--clean-cache', 'Clean the cache files before generation')
  .option('--clean-temp', 'Clean the temporary files before generation')
  .argument('<source>', 'Source directory of VuePress project')
  .argument(
    '[output]',
    'Output folder (default: .vuepress/redirect relative to source folder)',
  )
  .action(
    async (
      sourceDir: string,
      output: string | undefined,
      commandOptions: RedirectCommandOptions,
    ) => {
      // ensure NODE_ENV is set
      process.env.NODE_ENV ??= 'production'

      if (!fs.existsSync(sourceDir)) {
        program.error(`Source directory ${sourceDir} does not exist!`)
      }

      // resolve app config from cli options
      const cliAppConfig = resolveCliAppConfig(sourceDir, {})

      // resolve user config file
      const userConfigPath = commandOptions.config
        ? resolveUserConfigPath(commandOptions.config)
        : resolveUserConfigConventionalPath(cliAppConfig.source)

      const { userConfig } = await loadUserConfig(userConfigPath)

      // resolve the final app config to use
      const appConfig = resolveAppConfig({
        defaultAppConfig: {},
        cliAppConfig,
        userConfig,
      })

      if (appConfig === null) return

      // create vuepress app
      const app = createBuildApp(appConfig)

      // use user-config plugin
      app.use(transformUserConfigToPlugin(userConfig, cliAppConfig.source))

      // clean temp and cache
      if (commandOptions.cleanTemp === true) {
        logger.info('Cleaning temp...')
        await fs.remove(app.dir.temp())
      }
      if (commandOptions.cleanCache === true) {
        logger.info('Cleaning cache...')
        await fs.remove(app.dir.cache())
      }

      const outputFolder = output
        ? path.join(process.cwd(), output)
        : path.join(app.dir.source(), '.vuepress', 'redirect')

      // empty output directory
      await fs.emptyDir(outputFolder)

      // initialize vuepress app to get pages
      logger.info('Initializing VuePress and preparing data...')

      // initialize vuepress app to get pages
      await app.init()

      logger.info('Generating redirect pages...')

      // redirect all pages
      await Promise.all(
        app.pages.map((page) => {
          const redirectUrl = `${removeEndingSlash(commandOptions.hostname)}${
            app.siteData.base
          }${removeLeadingSlash(page.path)}`
          const destLocation = path.join(
            outputFolder,
            removeLeadingSlash(page.path.replace(/\/$/, '/index.html')),
          )

          return fs
            .ensureDir(path.dirname(destLocation))
            .then(() =>
              fs.writeFile(destLocation, getRedirectHTML(redirectUrl)),
            )
        }),
      )
    },
  )

program.version(pkg.version)
program.showHelpAfterError('add --help for additional information')

await program.parseAsync()
