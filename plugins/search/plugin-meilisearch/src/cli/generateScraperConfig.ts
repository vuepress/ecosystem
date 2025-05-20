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

import { getChangedFiles, shouldRescrape } from './utils.js'

const README_REG_EXP = /README\.md$/i

interface MeiliSearchCommandOptions {
  config?: string
  cache?: string
  temp?: string
  cleanCache?: boolean
  cleanTemp?: boolean
}

const generateOnlyUrls = (
  markdownFilePaths: string[],
  source: string,
  output: string,
): string[] =>
  markdownFilePaths.map((markdownFilePath) => {
    const url = README_REG_EXP.test(markdownFilePath)
      ? markdownFilePath.replace(README_REG_EXP, '').replace(source, output)
      : markdownFilePath.replace('.md', '.html').replace(source, output)

    return url
  })

export const generateScraperConfig = async (
  sourceDir: string,
  output: string | undefined,
  commandOptions: MeiliSearchCommandOptions,
): Promise<void> => {
  if (shouldRescrape()) {
    logger.info('A full rescrape is needed, no need to generate only_urls')
    return
  }

  // ensure NODE_ENV is set
  process.env.NODE_ENV ??= 'production'

  // resolve app config from cli options
  const cliAppConfig = resolveCliAppConfig(sourceDir, {})

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

  const sourceDirPath = path.join(process.cwd(), sourceDir)

  const outputPath = output
    ? path.join(process.cwd(), output)
    : path.join(app.dir.source(), '.vuepress', 'meilisearch-config.json')

  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory ${sourceDir} does not exist!`)
  }

  const scraperPath = path.resolve(output)

  if (!fs.existsSync(outputPath)) {
    throw new Error(`Scraper file not found at ${scraperPath}`)
  }

  const scraperConfig = fs.readJSONSync(outputPath, 'utf-8') as Record<
    string,
    unknown
  >

  const changedMarkdownFiles = getChangedFiles().filter(
    (line) => line.includes('.md') && line.includes(sourceDirPath),
  )

  if (changedMarkdownFiles.length === 0) {
    logger.info('No changed files found.')
    return
  }

  const onlyUrls = generateOnlyUrls(
    changedMarkdownFiles,
    sourceDirPath,
    outputPath,
  )

  scraperConfig.only_urls = onlyUrls
  fs.writeFileSync(scraperPath, JSON.stringify(scraperConfig, null, 2))
}
