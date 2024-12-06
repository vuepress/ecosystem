import { Logger } from '@vuepress/helper'
import { fs, getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const EMPTY_FILE = path.resolve(__dirname, '../../styles/empty.scss')

export const PLUGIN_NAME = '@vuepress/plugin-sass-palette'

export const logger = new Logger(PLUGIN_NAME)

export const getPath = (filePath: string): string =>
  fs.pathExistsSync(filePath) ? filePath : EMPTY_FILE

export const getIdPrefix = (id: string): string => (id ? `${id}-` : '')
