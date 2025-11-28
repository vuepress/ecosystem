import type { WalineInitOptions, WalineLocale } from '@waline/client'
import type { BaseCommentPluginOptions } from './base.js'

/**
 * Waline locale data
 *
 * Waline 语言包数据
 */
export type WalineLocaleData = Partial<WalineLocale>

/**
 * Waline comment options
 *
 * Waline 评论选项
 */
export interface WalineOptions
  extends
    BaseCommentPluginOptions,
    Omit<WalineInitOptions, 'comment' | 'el' | 'locale'> {
  /**
   * Whether enable page views count by default
   *
   * 是否启用访问量
   *
   * @default true
   */
  pageview?: boolean
}
