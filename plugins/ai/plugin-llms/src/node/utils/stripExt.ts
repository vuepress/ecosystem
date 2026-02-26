import { path } from 'vuepress/utils'

/**
 * Strip file extension from path
 *
 * @param filepath - File path to process
 * @returns Path without extension
 */
export const stripExt = (filepath: string): string => {
  const ext = path.extname(filepath)

  if (ext === '' || filepath.endsWith('/')) return filepath

  return filepath.slice(0, -ext.length)
}
