import type { ArtalkConfig } from 'artalk'
import type { BaseCommentPluginOptions } from './base.js'

/**
 * Artalk comment options
 *
 * Artalk 评论选项
 */
export type ArtalkOptions = BaseCommentPluginOptions &
  Partial<Omit<ArtalkConfig, 'el' | 'pageKey'>>
