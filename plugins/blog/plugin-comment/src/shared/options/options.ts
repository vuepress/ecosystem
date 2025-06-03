import type { ArtalkOptions } from './artalk.js'
import type { NoCommentPluginOptions } from './disable.js'
import type { GiscusOptions } from './giscus.js'
import type { TwikooOptions } from './twikoo.js'
import type { WalineOptions } from './waline.js'

/**
 * Comment options
 *
 * 评论选项
 */
export type CommentOptions =
  | ArtalkOptions
  | GiscusOptions
  | NoCommentPluginOptions
  | TwikooOptions
  | WalineOptions
