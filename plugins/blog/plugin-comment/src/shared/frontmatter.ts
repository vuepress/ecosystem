import type { PageFrontmatter } from 'vuepress/shared'

/**
 * Comment plugin frontmatter
 *
 * 评论插件 frontmatter
 */
export interface CommentPluginFrontmatter extends PageFrontmatter {
  /**
   * Whether enable comment
   *
   * 是否启用评论
   *
   * @default true
   */
  comment?: boolean

  /**
   * Comment identifier
   *
   * 评论标识符
   */
  commentID?: string

  /**
   * Whether enable pageviews
   *
   * 是否启用访问量
   *
   * @description Only available when using waline
   *
   * 仅在使用 Waline 时可用
   *
   * @default true
   */
  pageview?: boolean
}
