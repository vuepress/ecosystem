import type { IsolateStylesOptions } from './isolateStyles.js'

/**
 * Options of markdown-raw plugin
 *
 * `markdown-raw` 插件选项
 */
export interface MarkdownRawPluginOptions {
  /**
   * Whether to isolate the page styles from the content of the `raw` container.
   *
   * 是否将页面样式与 `raw` 容器的内容隔离。
   *
   * When enabled, a PostCSS plugin is injected into the bundler, which prefixes
   * the selectors of the matched style files with `:not(:where(.vp-raw, .vp-raw
   * *))`, so the styles do not apply inside a `raw` container. Pass an object
   * to customize the matched files and the prefix.
   *
   * 启用后，插件会向打包器注入一个 PostCSS 插件，为匹配的样式文件的选择器添加 `:not(:where(.vp-raw, .vp-raw
   * *))` 前缀，使这些样式不会作用于 `raw` 容器内部。 传入对象可自定义匹配的文件与前缀。
   *
   * @default false
   */
  isolateStyles?: IsolateStylesOptions | boolean
}
