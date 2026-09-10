import { Logger, ensureEndingSlash, isModuleAvailable } from '@vuepress/helper'
import { path } from 'vuepress/utils'

const __dirname = import.meta.dirname

export const PLUGIN_NAME = '@vuepress/plugin-markdown-chart'

export const logger = new Logger(PLUGIN_NAME)

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

export const isInstalled = (pkg: string, hint = true): boolean => {
  const status = isModuleAvailable(pkg, import.meta)

  if (hint && !status)
    logger.error(`Package ${pkg} is not installed, please install it manually!`)

  return status
}
