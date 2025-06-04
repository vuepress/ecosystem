/**
 * TOC component render options
 *
 * 目录组件渲染选项
 */
export interface TocRenderOptions {
  /**
   * Container tag name
   *
   * 容器标签名
   *
   * @default 'nav'
   */
  containerTag?: string

  /**
   * Container class name
   *
   * 容器类名
   *
   * @default 'vuepress-toc'
   */
  containerClass?: string

  /**
   * List class name
   *
   * 列表类名
   *
   * @default 'vuepress-toc-list'
   */
  listClass?: string

  /**
   * Item class name
   *
   * 列表项类名
   *
   * @default 'vuepress-toc-item'
   */
  itemClass?: string

  /**
   * Link tag type
   *
   * 链接标签类型
   *
   * @default 'RouteLink'
   */
  linkTag?: 'a' | 'RouteLink' | 'RouterLink'

  /**
   * Link class name
   *
   * 链接类名
   *
   * @default 'vuepress-toc-link'
   */
  linkClass?: string

  /**
   * Active link class name
   *
   * 活动链接类名
   *
   * @default 'active'
   */
  linkActiveClass?: string

  /**
   * Active children link class name
   *
   * 活动子链接类名
   *
   * @default 'active'
   */
  linkChildrenActiveClass?: string
}
