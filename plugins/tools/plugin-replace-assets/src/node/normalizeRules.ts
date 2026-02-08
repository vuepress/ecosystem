import { isArray, isFunction } from '@vuepress/helper'
import { KNOWN_IMAGE_EXTENSIONS, KNOWN_MEDIA_EXTENSIONS } from './constants.js'
import type { ReplaceAssetsPluginOptions, ReplacementRule } from './types.js'

export const createFindPattern = (dir: string, extensions: string[]): RegExp =>
  new RegExp(`^/${dir}/.*\\.(?:${extensions.join('|')})(\\?.*)?$`)

/**
 * Normalize replacement rules
 *
 * @param options - The plugin options to normalize
 * @returns Normalized replacement rules
 */
export const normalizeRules = (
  options?: ReplaceAssetsPluginOptions,
): ReplacementRule[] => {
  const normalized: ReplacementRule[] = []

  if (!options) return []

  if (typeof options === 'string' || isFunction(options)) {
    // eslint-disable-next-line no-param-reassign
    options = {
      all: options,
    }
  }

  if (isArray(options)) {
    normalized.push(...options)
    return normalized
  }

  if ('find' in options) {
    if (options.find && options.replacement) normalized.push(options)
    return normalized
  }

  if (options.rules) {
    normalized.push(
      ...(isArray(options.rules) ? options.rules : [options.rules]),
    )
  }

  if (options.image || options.all) {
    normalized.push({
      find: createFindPattern('images', KNOWN_IMAGE_EXTENSIONS),
      replacement: options.image || options.all!,
    })
  }

  if (options.media || options.all) {
    normalized.push({
      find: createFindPattern('medias', KNOWN_MEDIA_EXTENSIONS),
      replacement: options.media || options.all!,
    })
  }

  return normalized
}
