#!/usr/bin/env node

import { createCommand } from 'commander'
import { logger } from 'vuepress/utils'

import pkg from '../../package.json' with { type: 'json' }
import type { GenerateOnlyUrlOptions } from './generateScraperConfig.js'
import { generateScraperConfig } from './generateScraperConfig.js'

export type MeiliSearchCommandOptions = Omit<
  GenerateOnlyUrlOptions,
  'convertDiffFilesToMarkdown' | 'diffDepth'
> & {
  diffDepth: string
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
  .option('--debug', 'Enable debug mode')
  .option('--full-scrape', 'Force a full re-scrape')
  .option(
    '--diff-depth <number>',
    'Number of commits to look back for changes',
    '1',
  )
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
        const { diffDepth, ...rest } = commandOptions
        const status = await generateScraperConfig(sourceDir, output, {
          ...rest,
          diffDepth: Number(diffDepth),
        })

        if (status === 'skip') {
          logger.info('No changes detected, scrape not needed.')
          process.exitCode = 2
        }
      } catch (err) {
        logger.error(err)
        program.error(`Command execution error.`)
      }
    },
  )

program.version(pkg.version)
program.showHelpAfterError('add --help for additional information')

await program.parseAsync()
