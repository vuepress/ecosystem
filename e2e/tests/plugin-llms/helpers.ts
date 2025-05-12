import fs from 'node:fs'
import path from 'node:path'

/**
 * 获取构建目录路径
 */
export const getDistDir = (): string => {
  return path.resolve(process.cwd(), 'docs/.vuepress/dist')
}

/**
 * 获取 llms.txt 文件路径
 */
export const getLlmsTxtPath = (): string => {
  return path.join(getDistDir(), 'llms.txt')
}

/**
 * 获取 llms-full.txt 文件路径
 */
export const getLlmsFullTxtPath = (): string => {
  return path.join(getDistDir(), 'llms-full.txt')
}

/**
 * 读取 llms.txt 文件内容
 */
export const readLlmsTxt = (): string => {
  const filePath = getLlmsTxtPath()
  if (!fs.existsSync(filePath)) {
    throw new Error(`llms.txt file not found at ${filePath}`)
  }
  return fs.readFileSync(filePath, 'utf-8')
}

/**
 * 读取 llms-full.txt 文件内容
 */
export const readLlmsFullTxt = (): string => {
  const filePath = getLlmsFullTxtPath()
  if (!fs.existsSync(filePath)) {
    throw new Error(`llms-full.txt file not found at ${filePath}`)
  }
  return fs.readFileSync(filePath, 'utf-8')
}

/**
 * 检查 llms.txt 文件是否包含指定文本
 */
export const llmsTxtContains = (text: string): boolean => {
  return readLlmsTxt().includes(text)
}

/**
 * 检查 llms-full.txt 文件是否包含指定文本
 */
export const llmsFullTxtContains = (text: string): boolean => {
  return readLlmsFullTxt().includes(text)
}

/**
 * 解析 llms.txt 文件的结构
 */
export const parseLlmsTxt = () => {
  const content = readLlmsTxt()
  const lines = content.split('\n')

  // 查找目录部分
  const tocIndex = lines.findIndex((line) => line === '## Table of Contents')
  const tocLines =
    tocIndex > -1
      ? lines.slice(tocIndex + 1).filter((line) => line.trim().startsWith('-'))
      : []

  return {
    title: lines[0],
    tocStartIndex: tocIndex,
    tocItems: tocLines.map((line) => line.trim()),
    content: content,
  }
}

/**
 * 检查链接格式
 */
export const checkLinkFormat = (
  content: string,
  isMarkdownFormat = true,
): boolean => {
  const linkPattern = isMarkdownFormat
    ? /\[.*?\]\(.*?\.md\)/
    : /\[.*?\]\(.*?\.html\)/

  return linkPattern.test(content)
}

/**
 * 获取所有链接
 */
export const extractLinks = (content: string): string[] => {
  const linkRegex = /\[.*?\]\((.*?)\)/g
  const matches = content.matchAll(linkRegex)
  return Array.from(matches, (m) => m[1])
}

/**
 * 检查 llms.txt 符合规范
 */
export const validateLlmsTxt = () => {
  const content = readLlmsTxt()
  const hasTitle = content.startsWith('# ')
  const hasToc = content.includes('## Table of Contents')
  const hasLinks = checkLinkFormat(content)

  return {
    isValid: hasTitle && hasToc && hasLinks,
    hasTitle,
    hasToc,
    hasLinks,
  }
}

/**
 * 检查 llms-full.txt 符合规范
 */
export const validateLlmsFullTxt = () => {
  const content = readLlmsFullTxt()
  const hasUrls = content.includes('URL:')
  const hasDividers = content.includes('---')

  return {
    isValid: hasUrls && hasDividers,
    hasUrls,
    hasDividers,
  }
}
