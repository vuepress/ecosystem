import { Logger, ensureEndingSlash } from '@vuepress/helper'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

export const PLUGIN_NAME = '@vuepress/plugin-comment'

export const logger = new Logger(PLUGIN_NAME)
