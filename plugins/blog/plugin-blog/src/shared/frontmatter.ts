import type { PageFrontmatter } from 'vuepress/shared'

export interface BlogCategoryFrontmatterOptions {
  type: 'category'

  /**
   * Unique key for this category
   *
   * 分类的唯一键名
   */
  key: string

  /**
   * Category name
   *
   * 分类名称
   *
   * @description Only available in category item pages
   *
   * 仅在分类子项页面中可用
   */
  name?: string
}

export interface BlogTypeFrontmatterOptions {
  type: 'type'

  /**
   * Unique key for this type
   *
   * 类型的唯一键名
   */
  key: string
}

export interface BlogPluginCategoryFrontmatter extends PageFrontmatter {
  blog: BlogCategoryFrontmatterOptions
}

export interface BlogPluginTypeFrontmatter extends PageFrontmatter {
  blog: BlogTypeFrontmatterOptions
}

export type BlogPluginFrontmatter =
  | BlogPluginCategoryFrontmatter
  | BlogPluginTypeFrontmatter
