import { startsWith } from '@vuepress/helper'
import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { Page } from 'vuepress/core'
import { fs } from 'vuepress/utils'
import {
  getDateString,
  getFullDateString,
  getTimeString,
} from './formatDate.js'
import type { AppendDatePluginOptions } from './options.js'

/**
 * Append date to page frontmatter
 *
 * 向页面 frontmatter 追加日期
 *
 * @param options - Plugin options / 插件选项
 * @param options.key - Frontmatter key to use / 使用的 frontmatter 键名
 * @param options.format - Date format to use / 使用的日期格式
 * @param page - Page object / 页面对象
 */
export const appendDateToPage = async (
  { key = 'date', format = 'date' }: AppendDatePluginOptions,
  { data, filePath, frontmatter }: Page<GitPluginPageData>,
): Promise<void> => {
  if (frontmatter[key] || !filePath) return

  const { createdTime } = data.git

  if (!createdTime) return

  const date = new Date(createdTime)

  const text =
    format === 'time'
      ? getTimeString(date)
      : format === 'full'
        ? getFullDateString(date)
        : getDateString(date)

  frontmatter[key] = new Date(createdTime)

  const markdownContent = await fs.readFile(filePath, 'utf-8')

  await fs.writeFile(
    filePath,
    startsWith(markdownContent, '---\n')
      ? `---\n${key}: ${text}\n${markdownContent.slice(4)}`
      : `---\n${key}: ${text}\n---\n\n${markdownContent}`,
    'utf-8',
  )
}
