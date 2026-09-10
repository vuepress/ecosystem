import { defaultFile, defaultFolder, definitions } from './definitions.js'

/**
 * Resolve the icon of a file from its extension
 *
 * 从文件的扩展名解析文件的图标
 *
 * @example
 *   getFileIconByExtension('index.ts') // 'vscode-icons:file-type-typescript'
 *   getFileIconByExtension('index.spec.ts') // 'vscode-icons:file-type-testts'
 *
 * @param fileName - File name / 文件名称
 * @returns The icon name, or `null` if there is no match / 图标名称，没有匹配时返回 `null`
 */
export const getFileIconByExtension = (fileName: string): string | null => {
  const firstDotIndex = fileName.indexOf('.')

  if (firstDotIndex === -1) return null

  // Try the longest extension match, e.g. `.spec.ts` before `.ts`
  let extension = fileName.slice(firstDotIndex)

  while (extension !== '') {
    const icon: string | undefined = definitions.extensions[extension]

    if (icon) return icon

    const nextDotIndex = extension.indexOf('.', 1)

    if (nextDotIndex === -1) return null

    extension = extension.slice(nextDotIndex)
  }

  return null
}

/**
 * Resolve the icon of a file or a folder
 *
 * The icon is resolved in the following order: the full name, the extension,
 * and finally a part of the name.
 *
 * 解析文件或文件夹的图标
 *
 * 图标按照以下顺序解析：完整名称、扩展名，最后是名称的一部分。
 *
 * @example
 *   getFileIcon('src', 'folder') // 'vscode-icons:folder-type-src'
 *   getFileIcon('main.ts') // 'vscode-icons:file-type-typescript'
 *
 * @default type 'file'
 * @param fileName - Name of the file or the folder / 文件或文件夹的名称
 * @param type - Type of the node / 节点类型
 * @returns The icon name / 图标名称
 */
export const getFileIcon = (
  fileName: string,
  type: 'file' | 'folder' = 'file',
): string => {
  if (type === 'folder') {
    const icon: string | undefined =
      definitions.folders[fileName] ??
      definitions.folders[fileName.slice(fileName.lastIndexOf('/') + 1)]

    return icon ?? defaultFolder
  }

  const icon: string | undefined =
    definitions.named[fileName] ?? definitions.files[fileName]

  if (icon) return icon

  const extensionIcon = getFileIconByExtension(fileName)

  if (extensionIcon) return extensionIcon

  // A part of the name is matched at last, so that some entries of `partials`
  // (e.g. `docker-compose.yml`, which has a known extension) are unreachable
  for (const [partial, partialIcon] of Object.entries(definitions.partials))
    if (fileName.includes(partial)) return partialIcon

  return defaultFile
}
