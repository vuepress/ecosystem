import path from 'node:path'
import matter from 'gray-matter'

import type { GenerateLLMsFullTxtOptions, PreparedFile } from '../types.js'

/**
 * Generates llms-full.txt from all markdown files
 * 从所有 markdown 文件生成 llms-full.txt
 *
 * @param preparedFiles - Prepared files | 已准备好的文件
 * @param options - Options | 选项
 */
export async function generateLLMsFullTxt(
  preparedFiles: PreparedFile[],
  options: GenerateLLMsFullTxtOptions,
): Promise<string> {
  const { srcDir, cleanUrls, linksExtension, domain, template } = options

  const contentBlocks: string[] = []

  for (const preparedFile of preparedFiles) {
    const filePath = preparedFile.path
    let urlPath = path.relative(srcDir, filePath)

    // Convert Windows paths to POSIX format
    // 将 Windows 路径转换为 POSIX 格式
    urlPath = urlPath.replace(/\\/g, '/')

    // Calculate the URL
    // 计算 URL
    let url = cleanUrls
      ? urlPath.replace(/\.md$/, '')
      : urlPath.replace(/\.md$/, linksExtension)

    // Handle index.md
    // 处理 index.md
    if (path.basename(filePath) === 'index.md') {
      if (!cleanUrls) {
        url = path.dirname(url) + '/index' + linksExtension
      } else {
        url = path.dirname(url) + '/'
      }
    }

    // Add trailing / if path is a directory and cleanUrls is true
    // 如果路径是目录且 cleanUrls 为 true，则添加尾随 /
    if (cleanUrls && !url.endsWith('/')) {
      url += '/'
    }

    // Ensure URL starts with /
    // 确保 URL 以 / 开头
    if (!url.startsWith('/')) {
      url = '/' + url
    }

    // Add domain if provided
    // 如果提供了域名，则添加域名
    if (domain) {
      url = domain.replace(/\/$/, '') + url
    }

    // Extract frontmatter
    // 提取 frontmatter
    let frontmatterBlock = ''

    if (Object.keys(preparedFile.file.data).length > 0) {
      frontmatterBlock = `---\n${matter.stringify('', preparedFile.file.data).trim()}\n---\n\n`
    }

    // Add the content block
    // 添加内容块
    const contentBlock = `# ${preparedFile.title}\n\nURL: ${url}\n\n${frontmatterBlock}${preparedFile.file.content}`
    contentBlocks.push(contentBlock)
  }

  // Join with dividers
  // 用分隔线连接
  let fullContent: string

  if (template) {
    // Use custom template
    // 使用自定义模板
    fullContent = template.replace(
      '{{content}}',
      contentBlocks.join('\n\n---\n\n'),
    )
  } else {
    fullContent = contentBlocks.join('\n\n---\n\n')
  }

  return fullContent
}
