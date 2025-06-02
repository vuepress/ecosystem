import type { BaseCommentPluginOptions } from './base.js'

/**
 * No comment plugin options
 *
 * 禁用评论插件选项
 */
export interface NoCommentPluginOptions extends BaseCommentPluginOptions {
  provider?: 'None'
  comment?: never
}
