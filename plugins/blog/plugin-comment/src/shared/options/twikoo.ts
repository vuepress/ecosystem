import type { BaseCommentPluginOptions } from './base.js'

/**
 * Twikoo initialization options
 *
 * Twikoo 初始化选项
 */
export interface TwikooInitOptions {
  /**
   * Environment ID for tencloud or Link for Vercel
   *
   * 腾讯云环境链接或 Vercel Link
   */
  envId: string

  /**
   * Tencloud region
   *
   * 腾讯云区域
   *
   * @default "ap-shanghai"
   */
  region?: string
}

/**
 * Twikoo comment options
 *
 * Twikoo 评论选项
 */
export type TwikooOptions = BaseCommentPluginOptions & TwikooInitOptions
