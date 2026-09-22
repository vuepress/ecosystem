import { ensureEndingSlash } from '@vuepress/helper'
import { path } from 'vuepress/utils'

const __dirname = import.meta.dirname

export const PLUGIN_NAME = '@vuepress/plugin-markdown-file-tree'

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)
