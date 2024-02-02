import { ensureEndingSlash } from '@vuepress/helper'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const PLUGIN_NAME = '@vuepress/plugin-redirect'

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)
