import path from 'node:path'
import type { AutoFrontmatterContext, AutoFrontmatterData } from '../types.js'

/**
 * Add title by filename
 *
 * @param data - Auto frontmatter data
 *
 * @example
 * ```ts
 * {
 *   handle(data, context) {
 *     addTitleByFilename(data, context)
 *     // => data.title = 'foo'
 *     return data
 *   }
 * }
 * ```
 */
export const addTitleByFilename = (
  data: AutoFrontmatterData,
  { relativePath }: AutoFrontmatterContext,
): void => {
  if (data.title) return

  data.title = path.basename(relativePath, '.md')
}
