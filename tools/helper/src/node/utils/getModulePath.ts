import { path } from 'vuepress/utils'

/**
 * Get file path of a given module url
 */
export const getModulePath = (module: string, meta: ImportMeta): string =>
  path.normalize(meta.resolve(module))
