import type { LocaleConfig } from 'vuepress/shared'
import type {
  ArtalkOptions,
  GiscusOptions,
  NoCommentPluginOptions,
  TwikooOptions,
  WalineLocaleData,
  WalineOptions,
} from '../shared/index.js'

/**
 * Artalk comment plugin options
 *
 * Artalk 评论插件选项
 */
export interface ArtalkPluginOptions
  extends Omit<Partial<ArtalkOptions>, 'avatarURLBuilder' | 'imgUploader'> {
  provider: 'Artalk'
}

/**
 * Giscus comment plugin options
 *
 * Giscus 评论插件选项
 */
export interface GiscusPluginOptions extends Partial<GiscusOptions> {
  provider: 'Giscus'
}

/**
 * Twikoo comment plugin options
 *
 * Twikoo 评论插件选项
 */
export interface TwikooPluginOptions extends Partial<TwikooOptions> {
  provider: 'Twikoo'
}

/**
 * Waline comment plugin options
 *
 * Waline 评论插件选项
 */
export interface WalinePluginOptions
  extends Omit<
    Partial<WalineOptions>,
    'highlighter' | 'imageUploader' | 'search' | 'texRenderer'
  > {
  provider: 'Waline'

  /**
   * Whether import meta icons
   *
   * 是否导入 Meta 图标
   *
   * @default true
   */
  metaIcon?: boolean

  /**
   * Locale config for waline
   *
   * Waline 本地化配置
   */
  locales?: LocaleConfig<WalineLocaleData>
}

/**
 * Comment plugin options
 *
 * 评论插件选项
 */
export type CommentPluginOptions =
  | ArtalkPluginOptions
  | GiscusPluginOptions
  | NoCommentPluginOptions
  | TwikooPluginOptions
  | WalinePluginOptions
