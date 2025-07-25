import type { LocaleConfig, PageFrontmatter } from 'vuepress/shared'
import type { CatalogPluginLocaleData } from '../shared/index.js'

export interface CatalogPluginOptions {
  /**
   * Max depth of catalog items.
   *
   * 目录项级别的最大深度。
   *
   * @description Built-in component only
   *
   * 仅限内置组件
   *
   * @default 3
   */
  level?: 1 | 2 | 3

  /**
   * Whether to show index for catalog.
   *
   * 目录是否显示索引。
   *
   * @default false
   */
  index?: boolean

  /**
   * Frontmatter getter for the generated page.
   *
   * 生成页面的 Frontmatter 获取器。
   *
   * @param path path to be generated / 当前生成的路径名称
   * @returns page frontmatter / 页面 Frontmatter
   */
  frontmatter?: (path: string) => PageFrontmatter

  /**
   * Catalog page path to be excluded during generation.
   *
   * 生成中需要排除的目录页路径。
   *
   * @default []
   */
  exclude?: (RegExp | string)[]

  /**
   * Component name to use as catalog.
   *
   * 用作目录的组件名称。
   *
   * @description By default the plugin will register a `<Catalog />` component and use interface. If you want to use your own component, you can set this option to the name of your component.
   *
   * 默认情况下，插件将注册一个 `<Catalog />` 组件并使用该组件。如果你想使用自己的组件，可以将此选项设置为你的组件的名称。
   */
  component?: string

  /**
   * Catalog locales
   *
   * 目录组件国际化配置
   */
  locales?: LocaleConfig<CatalogPluginLocaleData>
}
