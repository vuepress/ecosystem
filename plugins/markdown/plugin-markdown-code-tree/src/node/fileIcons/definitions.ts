import { extensions } from './extensions.js'
import { files } from './files.js'
import { folders } from './folders.js'
import { named } from './named.js'
import { partials } from './partials.js'

/**
 * File icon definitions
 *
 * A curated mapping from file or folder names to Iconify icon names.
 *
 * 文件图标定义
 *
 * 从文件或文件夹名称到 Iconify 图标名称的映射。
 */
export interface Definitions {
  /**
   * Icons matched by the name of a file or a folder, without the extension
   *
   * 根据文件或文件夹名称（不含扩展名）匹配的图标
   */
  named: Record<string, string>
  /**
   * Icons matched by the name of a folder
   *
   * 根据文件夹名称匹配的图标
   */
  folders: Record<string, string>
  /**
   * Icons matched by the full name of a file
   *
   * 根据文件的完整名称匹配的图标
   */
  files: Record<string, string>
  /**
   * Icons matched by the extension of a file
   *
   * 根据文件的扩展名匹配的图标
   */
  extensions: Record<string, string>
  /**
   * Icons matched by a part of the name of a file
   *
   * 根据文件名称的一部分匹配的图标
   */
  partials: Record<string, string>
}

/**
 * Default icon for folders
 *
 * 文件夹的默认图标
 */
export const defaultFolder = 'vscode-icons:default-folder'

/**
 * Default icon for files
 *
 * 文件的默认图标
 */
export const defaultFile = 'vscode-icons:default-file'

/**
 * Icon definitions
 *
 * 图标定义
 */
export const definitions: Definitions = {
  named,
  folders,
  files,
  extensions,
  partials,
}
