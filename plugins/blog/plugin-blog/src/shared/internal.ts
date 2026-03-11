/**
 * Configuration for a single category entry within a locale
 *
 * 单个分类条目在某个语言环境下的配置
 */
export interface CategoryConfig {
  /**
   * Page path for this category item
   *
   * 此分类项的页面路径
   *
   * @description Empty string if no item page is generated
   *
   * 如果未生成子项页面则为空字符串
   */
  path: string

  /**
   * Article indexes in the blog store belonging to this category
   *
   * 属于此分类的文章在博客存储中的索引
   */
  indexes: number[]
}

/**
 * Map of category names to their configurations within a single locale
 *
 * 单个语言环境下分类名称到其配置的映射
 *
 * @example
 * ```ts
 * const map: CategoryLocaleMap = {
 *   "JavaScript": { path: "/category/javascript/", indexes: [0, 2, 5] },
 *   "TypeScript": { path: "/category/typescript/", indexes: [1, 3] },
 * }
 * ```
 */
export type CategoryLocaleMap = Record<
  /** Category name / 分类名称 */
  string,
  CategoryConfig
>

/**
 * Category configuration for a single locale
 *
 * 单个语言环境的分类配置
 */
export interface CategoryLocaleConfig {
  /**
   * Main category overview page path
   *
   * 分类概览主页面路径
   *
   * @description Empty string if no main page is generated
   *
   * 如果未生成主页面则为空字符串
   */
  path: string

  /**
   * Map of category names to their configurations
   *
   * 分类名称到其配置的映射
   */
  map: CategoryLocaleMap
}

/**
 * Map of locale paths to category locale configurations for a single category key
 *
 * 单个分类键下语言环境路径到分类区域配置的映射
 *
 * @example
 * ```ts
 * const categoryMap: CategoryMap = {
 *   "/": { path: "/category/", map: { ... } },
 *   "/zh/": { path: "/zh/category/", map: { ... } },
 * }
 * ```
 */
export type CategoryMap = Record<
  /** Locale path (e.g., `"/"`, `"/zh/"`) / 语言环境路径 */
  string,
  CategoryLocaleConfig
>

/**
 * Map of category keys to their locale-specific configurations
 *
 * 分类键到其各语言环境配置的映射
 *
 * @description Each key corresponds to a `BlogCategoryOptions.key` defined in plugin options
 *
 * 每个键对应插件选项中定义的 `BlogCategoryOptions.key`
 *
 * @example
 * ```ts
 * const categoriesMap: CategoriesMap = {
 *   "category": {
 *     "/": { path: "/category/", map: { ... } },
 *   },
 *   "tag": {
 *     "/": { path: "/tag/", map: { ... } },
 *   },
 * }
 * ```
 */
export type CategoriesMap = Record<
  /** Category key / 分类键名 */
  string,
  CategoryMap
>

/**
 * Type configuration for a single locale
 *
 * 单个语言环境的类型配置
 */
export interface TypeLocaleConfig {
  /**
   * Type listing page path
   *
   * 类型列表页面路径
   *
   * @description Empty string if no page is generated
   *
   * 如果未生成页面则为空字符串
   */
  path: string

  /**
   * Article indexes in the blog store belonging to this type
   *
   * 属于此类型的文章在博客存储中的索引
   */
  indexes: number[]
}

/**
 * Map of locale paths to type configurations for a single type key
 *
 * 单个类型键下语言环境路径到类型配置的映射
 *
 * @example
 * ```ts
 * const typeMap: TypeMap = {
 *   "/": { path: "/article/", indexes: [0, 1, 2] },
 *   "/zh/": { path: "/zh/article/", indexes: [0, 1, 2] },
 * }
 * ```
 */
export type TypeMap = Record<
  /** Locale path (e.g., `"/"`, `"/zh/"`) / 语言环境路径 */
  string,
  TypeLocaleConfig
>

/**
 * Map of type keys to their locale-specific configurations
 *
 * 类型键到其各语言环境配置的映射
 *
 * @description Each key corresponds to a `BlogTypeOptions.key` defined in plugin options
 *
 * 每个键对应插件选项中定义的 `BlogTypeOptions.key`
 *
 * @example
 * ```ts
 * const typesMap: TypesMap = {
 *   "article": {
 *     "/": { path: "/article/", indexes: [0, 1, 2] },
 *   },
 *   "timeline": {
 *     "/": { path: "/timeline/", indexes: [3, 4, 5] },
 *   },
 * }
 * ```
 */
export type TypesMap = Record<
  /** Type key / 类型键名 */
  string,
  TypeMap
>
