/**
 * Mapping from a file name, a file extension or a folder name to an icon name
 *
 * 文件名、文件扩展名或文件夹名称到图标名称的映射
 */
export type IconMap = Record<string, string>

/**
 * Options of the icons of the files and the folders
 *
 * The icons are an optional enhancement of the plugin, which resolves the icon
 * of a node only when the Iconify web component and the icon set package are
 * both installed. The flag is set by the plugin, it is not a public option.
 *
 * 文件与文件夹图标的选项
 *
 * 图标是插件的可选增强：只有在 Iconify Web 组件与图标集包都安装时才会解析节点的图标。 该标记由插件设置，它不是公开选项。
 */
export interface FileIconOptions {
  /**
   * Whether to resolve the icon of every file and folder
   *
   * 是否解析每个文件与文件夹的图标
   *
   * @default true
   */
  icons?: boolean
}
