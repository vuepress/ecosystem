/**
 * Reverse index of icon names
 *
 * Every icon name is stored once, together with the keys that use it, which
 * keeps the generated table small.
 *
 * 图标名称的反查索引
 *
 * 每个图标名称只存储一次，并记录使用它的键，从而让生成表保持较小体积。
 */
export type IconIndex = Record<string, string[]>

/**
 * Mapping from a file name, a file extension or a folder name to an icon name
 *
 * 文件名、文件扩展名或文件夹名称到图标名称的映射
 */
export type IconMap = Record<string, string>
