import { path } from 'vuepress/utils'

/**
 * Strips the file extension from a given file path.
 *
 * @param filepath - The path to the file.
 * @returns The filename without the extension.
 */
export const stripExt = (url: string): string => {
  const dir = path.dirname(url)
  const name = path.basename(url)

  return path.join(dir, path.basename(name, path.extname(name)))
}
