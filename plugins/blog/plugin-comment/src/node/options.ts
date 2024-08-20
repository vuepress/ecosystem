import type { LocaleConfig } from 'vuepress/shared'
import type {
  ArtalkOptions,
  GiscusOptions,
  NoCommentPluginOptions,
  TwikooOptions,
  WalineLocaleData,
  WalineOptions,
} from '../shared/index.js'

export interface ArtalkPluginOptions
  extends Omit<Partial<ArtalkOptions>, 'avatarURLBuilder' | 'imgUploader'> {
  provider: 'Artalk'
}

export interface GiscusPluginOptions extends Partial<GiscusOptions> {
  provider: 'Giscus'
}

export interface TwikooPluginOptions extends Partial<TwikooOptions> {
  provider: 'Twikoo'
}

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
   */
  locales?: LocaleConfig<WalineLocaleData>
}

/**
 * 评论选项
 *
 * Comment options
 */
export type CommentPluginOptions =
  | ArtalkPluginOptions
  | GiscusPluginOptions
  | NoCommentPluginOptions
  | TwikooPluginOptions
  | WalinePluginOptions
