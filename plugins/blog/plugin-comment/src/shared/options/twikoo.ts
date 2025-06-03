import type { BaseCommentPluginOptions } from './base.js'

/**
 * Twikoo initialization options
 *
 * Twikoo 初始化选项
 */
export interface TwikooInitOptions {
  /**
   * Environment ID for TenCloud or deployment URL for Vercel
   *
   * 腾讯云环境 ID 或 Vercel 部署 URL
   */
  envId: string

  /**
   * TenCloud region
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
