import { path } from 'vuepress/utils'

/**
 * Strips the file extension from a given file path.
 *
 * @param filepath - The path to the file.
 * @returns The filename without the extension.
 */
export const stripExt = (filepath: string): string => {
  const ext = path.extname(filepath)

  if (ext === '' || filepath.endsWith('/')) {
    return filepath
  }

  return filepath.slice(0, -ext.length)
}
