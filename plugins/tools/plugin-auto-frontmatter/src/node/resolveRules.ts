import { isFunction } from 'vuepress/shared'
import type {
  AutoFrontmatterPluginOptions,
  AutoFrontmatterRule,
} from './types.js'

/**
 * resolve rules from options
 * @internal
 */
export const resolveRules = (
  options: AutoFrontmatterPluginOptions,
): AutoFrontmatterRule[] => {
  if (isFunction(options)) {
    return [{ filter: () => true, handle: options }]
  }

  return Array.isArray(options) ? options : [options]
}
