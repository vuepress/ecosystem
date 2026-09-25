import { ensureEndingSlash } from '@vuepress/helper'
import { createSearchLogger } from '@vuepress/search-helper'
import { path } from 'vuepress/utils'

const __dirname = import.meta.dirname

/** Name of the plugin. 插件的名称。 */
export const PLUGIN_NAME = '@vuepress/plugin-slimsearch'

/** Name of the temp directory of the plugin. 插件的临时目录名称。 */
export const TEMP_DIR = 'slimsearch'

/** Logger of the plugin. 插件的日志记录器。 */
export const logger = createSearchLogger(PLUGIN_NAME)

/** Folder of the client code. 客户端代码的目录。 */
export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client/'),
)

/** Path of the worker template file. Worker 模板文件的路径。 */
export const WORKER_FILE = path.resolve(__dirname, '../worker/build.js')
