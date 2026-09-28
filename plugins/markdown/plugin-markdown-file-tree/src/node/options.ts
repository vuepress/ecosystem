/**
 * Options of the code tree
 *
 * 代码树的选项
 */
export interface MarkdownCodeTreePluginOptions {
  /**
   * Default height of the code tree
   *
   * Accepts a CSS length or a number in pixels.
   *
   * 代码树的默认高度
   *
   * 接受 CSS 长度或像素数值。
   *
   * @default '320px'
   */
  height?: number | string
}

/**
 * Options of the markdown file tree plugin
 *
 * Markdown 文件树插件的选项
 */
export interface MarkdownFileTreePluginOptions {
  /**
   * Whether to enable the file tree, which renders a directory structure from
   * Markdown unordered lists inside a `::: file-tree` container
   *
   * 是否启用文件树
   *
   * 文件树从 `::: file-tree` 容器内的 Markdown 无序列表渲染目录结构。
   *
   * @default false
   */
  fileTree?: boolean
  /**
   * Whether to enable the code tree, which puts the code blocks of several
   * files together with a file tree
   *
   * Passing an object enables the code tree with the given options.
   *
   * 是否启用代码树
   *
   * 代码树将多个文件的代码块与文件树一起展示。
   *
   * 传入对象表示启用代码树并附加选项。
   *
   * @default false
   */
  codeTree?: boolean | MarkdownCodeTreePluginOptions
}
