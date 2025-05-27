#!/usr/bin/env node

import { createCommand } from 'commander'

import { logger } from 'vuepress/utils'
import pkg from '../../package.json' with { type: 'json' }
import { generateScraperConfig } from './generateScraperConfig.js'

interface MeiliSearchCommandOptions {
  config?: string
  cache?: string
  temp?: string
  cleanCache?: boolean
  cleanTemp?: boolean
}

const program = createCommand('vp-meilisearch-crawler')

program
  .summary('Crawler config generator')
  .description('Generate crawler config for meilisearch')
  .option('-c, --config [config]', 'Set path to config file')
  .option('--cache [cache]', 'Set the directory of the cache files')
  .option('--temp [temp]', 'Set the directory of the temporary files')
  .option('--clean-cache', 'Clean the cache files before generation')
  .option('--clean-temp', 'Clean the temporary files before generation')
  .argument('<source>', 'Source directory of VuePress project')
  .argument(
    '[scraper-path]',
    'Scrapper config file path (default: .vuepress/meilisearch-config.json relative to source folder)',
  )
  .action(
    async (
      sourceDir: string,
      output: string | undefined,
      commandOptions: MeiliSearchCommandOptions,
    ) => {
      try {
        await generateScraperConfig(sourceDir, output, commandOptions)
      } catch (error) {
        logger.error(error)
        program.error(`Command execution error.`)
      }
    },
  )

program.version(pkg.version)
program.showHelpAfterError('add --help for additional information')

await program.parseAsync()
