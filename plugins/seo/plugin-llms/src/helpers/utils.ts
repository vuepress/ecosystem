import path from 'node:path'

import type { GrayMatterFile } from 'gray-matter'

import type { LinksExtension } from '../types.js'

/**
 * Extract the title from frontmatter or the first heading. | 从 frontmatter 或第一个标题中提取标题。
 * @param file - The gray-matter file object | gray-matter 文件对象
 * @returns The title as string or undefined if no title found | 标题字符串，如果未找到标题则返回 undefined
 */
export function extractTitle(file: GrayMatterFile<string>): string | undefined {
  const content = file.content || ''

  // Return title from frontmatter if it exists
  // 如果存在，则从 frontmatter 返回标题
  if (file.data?.title) {
    return file.data.title as string
  }

  // Find the first heading in the content
  // 在内容中查找第一个标题
  const titleMatch = content.match(/^#\s+(.*?)$/m)
  if (titleMatch) {
    return titleMatch[1].trim()
  }

  return undefined
}

/**
 * Expand template placeholders with provided variables. | 使用提供的变量展开模板占位符。
 * @param template - Template string with placeholders in {variable} format | 带有 {variable} 格式占位符的模板字符串
 * @param variables - Object with values to replace in the template | 包含要在模板中替换的值的对象
 * @returns Expanded template with variables replaced | 替换了变量的展开模板
 */
export function expandTemplate(
  template: string,
  variables: Record<string, string | undefined>,
): string {
  return template.replace(/\{([^}]+)\}/g, (_, key) => {
    return variables[key] !== undefined ? String(variables[key]) : ''
  })
}

/**
 * Remove the file extension from a path. | 从路径中删除文件扩展名。
 * @param filePath - Path to a file | 文件路径
 * @returns Path without the extension | 没有扩展名的路径
 */
export function stripExt(filePath: string): string {
  const extension = path.extname(filePath)
  return filePath.slice(0, -extension.length)
}

/**
 * Normalize a file path for use in links. | 标准化用于链接的文件路径。
 * @param filePath - Path to normalize | 要标准化的路径
 * @param options - Normalization options | 标准化选项
 * @returns Normalized path suitable for links | 适合链接的标准化路径
 */
export function normalizePath(
  filePath: string,
  options: {
    domain?: string
    linksExtension?: string
    cleanUrls?: boolean
  } = {},
): string {
  const { domain, linksExtension = '.md', cleanUrls = false } = options

  // Normalize path separators to forward slashes
  // 将路径分隔符标准化为正斜杠
  const normalized = filePath.replace(/\\/g, '/')

  let result = normalized

  // Handle index.md files
  // 处理 index.md 文件
  if (path.basename(normalized) === 'index.md') {
    result = path.dirname(normalized)
    if (result === '.') {
      result = ''
    }
  }

  // Apply clean URLs (strip extension)
  // 应用干净的 URL（去除扩展名）
  if (cleanUrls) {
    result = stripExt(result)
  } else {
    // Replace or ensure correct extension
    // 替换或确保正确的扩展名
    const hasExtension = path.extname(result) !== ''
    if (hasExtension) {
      result = stripExt(result) + linksExtension
    } else if (result && result !== '/') {
      result += linksExtension
    }
  }

  // Ensure leading slash
  // 确保前导斜杠
  if (result && !result.startsWith('/')) {
    result = '/' + result
  }

  // Add domain if specified
  // 如果指定了域名，则添加域名
  if (domain) {
    const domainWithoutTrailingSlash = domain.endsWith('/')
      ? domain.slice(0, -1)
      : domain
    result = domainWithoutTrailingSlash + result
  }

  return result
}
