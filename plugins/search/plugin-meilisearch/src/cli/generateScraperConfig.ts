import {
  loadUserConfig,
  resolveAppConfig,
  resolveCliAppConfig,
  resolveUserConfigConventionalPath,
  resolveUserConfigPath,
  transformUserConfigToPlugin,
} from 'vuepress/cli'
import type { App } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { fs, logger, path } from 'vuepress/utils'

import { shouldRescrape } from './shouldRescrape.js'
import { getChangedFiles, getGitRelativePath } from './utils.js'

interface MeiliSearchCommandOptions {
  config?: string
  cache?: string
  temp?: string
  cleanCache?: boolean
  cleanTemp?: boolean
}

interface ScraperConfig extends Record<string, unknown> {
  start_urls: string[]
  only_urls?: string[]
}

const generateOnlyUrls = (
  app: App,
  changedMarkdownFilesPathRelative: string[],
  scraperConfig: ScraperConfig,
): string[] => {
  const pagesMap = app.pages.reduce<Record<string, string>>(
    (acc, { filePathRelative, path: pagePath }) => {
      if (!filePathRelative) return acc

      acc[filePathRelative] = pagePath

      return acc
    },
    {},
  )

  const siteDestLocation =
    new URL(scraperConfig.start_urls[0]).origin + app.options.base.slice(0, -1)

  return changedMarkdownFilesPathRelative.map(
    (markdownFilePathRelative) =>
      siteDestLocation + pagesMap[markdownFilePathRelative],
  )
}

export const generateScraperConfig = async (
  source: string,
  output: string | undefined,
  commandOptions: MeiliSearchCommandOptions,
): Promise<void> => {
  // ensure NODE_ENV is set
  process.env.NODE_ENV ??= 'production'

  // resolve app config from cli options
  const cliAppConfig = resolveCliAppConfig(source, {})

  // resolve user config file
  const userConfigPath = commandOptions.config
    ? resolveUserConfigPath(commandOptions.config)
    : resolveUserConfigConventionalPath(cliAppConfig.source)

  const { userConfig } = await loadUserConfig(userConfigPath)

  // resolve the final app config to use
  const appConfig = resolveAppConfig({
    defaultAppConfig: {
      cache: commandOptions.cache,
      temp: commandOptions.temp,
    },
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

  const scraperPath = output
    ? path.join(process.cwd(), output)
    : path.join(app.dir.source(), '.vuepress', 'meilisearch-config.json')

  if (!fs.existsSync(source)) {
    throw new Error(`Source directory ${source} does not exist!`)
  }

  if (!fs.existsSync(scraperPath)) {
    throw new Error(`Scraper file not found at ${scraperPath}`)
  }

  const scraperConfig = fs.readJSONSync(scraperPath, 'utf-8') as ScraperConfig

  if (shouldRescrape()) {
    logger.info('A full rescrape is needed, removing only_urls...')
    delete scraperConfig.only_urls
    fs.writeFileSync(scraperPath, JSON.stringify(scraperConfig, null, 2))
    return
  }

  const sourceRelativePath = getGitRelativePath(app.dir.source())

  const changedMarkdownFilesPathRelative = getChangedFiles()
    .filter(
      (line) => line.startsWith(sourceRelativePath) && line.endsWith('.md'),
    )

    .map((line) => line.substring(sourceRelativePath.length + 1))

  if (changedMarkdownFilesPathRelative.length === 0) {
    logger.info('No changed files found.')
    return
  }

  logger.info('Initializing VuePress and preparing data...')

  // initialize vuepress app to get pages
  await app.init()

  logger.info('Generating only_urls...')

  const onlyUrls = generateOnlyUrls(
    app,
    changedMarkdownFilesPathRelative,
    scraperConfig,
  )

  scraperConfig.only_urls = onlyUrls
  fs.writeFileSync(scraperPath, JSON.stringify(scraperConfig, null, 2))
}
