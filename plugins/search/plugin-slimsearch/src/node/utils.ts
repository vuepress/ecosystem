import { Logger, ensureEndingSlash } from '@vuepress/helper'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const PLUGIN_NAME = '@vuepress/plugin-slimsearch'

export const logger = new Logger(PLUGIN_NAME)

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client/'),
)

export const WORKER_FILE = path.resolve(__dirname, '../worker/index.js')

export const getLocaleChunkName = (locale: string): string =>
  locale.replace(/\//g, '') || 'root'

export const inferFilePath = (vuePath: string): string =>
  vuePath
    .replace(/^pages\//, '')
    .replace(/\/index\.html\.vue/, '/README.md')
    .replace(/\.html\.vue/, '.md')
