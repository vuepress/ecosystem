import { createRequire } from 'node:module'
import { path } from 'vuepress/utils'

/**
 * Get file path of a given module url
 */
export const getRealPath = (module: string, currentUrl: string): string => {
  const require = createRequire(currentUrl)

  return path.normalize(require.resolve(module))
}
