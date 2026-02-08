import { isFunction } from 'vuepress/shared'
import type {
  AutoFrontmatterPluginOptions,
  AutoFrontmatterRule,
} from './types.js'

/**
 * resolve rules from options
 *
 * @internal
 * @param options - Auto frontmatter plugin options / 自动 frontmatter 插件选项
 * @returns List of auto frontmatter rules / 自动 frontmatter 规则列表
 */
export const resolveRules = (
  options: AutoFrontmatterPluginOptions,
): AutoFrontmatterRule[] => {
  if (isFunction(options)) {
    return [{ filter: () => true, handle: options }]
  }

  return Array.isArray(options) ? options : [options]
}
