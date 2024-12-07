import { fileURLToPath } from 'node:url'
import { path } from 'vuepress/utils'

/**
 * Get file path of a given module url
 */
export const getModulePath = (module: string, meta: ImportMeta): string =>
  path.normalize(fileURLToPath(meta.resolve(module)))
