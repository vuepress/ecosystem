import matter from 'gray-matter'
import yaml from 'js-yaml'
import pMap from 'p-map'
import { fs, hash as getHash, path } from 'vuepress/utils'
import { createFilter } from './createFilter.js'
import type {
  AutoFrontmatterContext,
  AutoFrontmatterData,
  AutoFrontmatterHandle,
  AutoFrontmatterRule,
} from './types.js'
import { logger } from './utils.js'

/**
 * Get markdown info
 */
const getMarkdownInfo = async (
  relativePath: string,
  cwd: string,
): Promise<{
  data: AutoFrontmatterData
  context: AutoFrontmatterContext
}> => {
  const filepath = path.join(cwd, relativePath)
  const raw = await fs.promises.readFile(filepath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    data,
    context: {
      filepath,
      relativePath,
      content,
    },
  }
}

/**
 * Find rule by filepath, Only return the first
 */
export const findRule = (
  rules: AutoFrontmatterRule[],
  filepath: string,
): AutoFrontmatterRule | undefined => {
  const rule = rules.find(({ filter }) => createFilter(filter)(filepath))
  return rule
}

/**
 * Generate frontmatter for a single Markdown file
 */
export const generateFileFrontmatter = async (
  filepath: string,
  cwd: string,
  handle: AutoFrontmatterHandle,
): Promise<void> => {
  try {
    const { data, context } = await getMarkdownInfo(filepath, cwd)
    const beforeHash = getHash(data)
    const result = await handle(data, context)
    const afterHash = getHash(result)

    // data not changed, skip writing
    if (beforeHash === afterHash) return

    // `gray-matter` depends on version `js-yaml@3.x`
    // The content after stringification in this version will be wrapped in `""`, which does not conform to the usual YAML writing format
    // However, removing `""` through matching would cause special characters to fail parsing correctly
    // These issues have been resolved in `js-yaml@4.x`
    //
    // gray-matter 依赖 `js-yaml@3.x` 的版本
    // 这个版本 stringify 后的内容，值会包裹在 `""` 中，但不符合通常的 yaml 书写格式
    // 而如果通过匹配删除 `""`, 又会导致特殊字符无法正常解析
    // 这些问题在 `js-yaml@4.x` 中已经解决
    const formatted = Object.keys(result).length === 0 ? '' : yaml.dump(result)

    await fs.promises.writeFile(
      context.filepath,
      formatted ? `---\n${formatted}---\n${context.content}` : context.content,
      'utf-8',
    )
  } catch (e) {
    logger.error(`Failed to generate frontmatter for ${filepath}`, e)
  }
}

type Task = readonly [string, AutoFrontmatterHandle]

/**
 * Generate frontmatter for all Markdown files
 */
export const generateFileListFrontmatter = async (
  fileList: string[],
  cwd: string,
  rules: AutoFrontmatterRule[],
): Promise<void> => {
  const tasks: Task[] = []

  for (const filepath of fileList) {
    const rule = findRule(rules, filepath)
    if (rule) {
      tasks.push([filepath, rule.handle])
    }
  }

  if (tasks.length === 0) return

  // Limit the number of concurrent tasks
  await pMap(
    tasks,
    ([filepath, handle]) => generateFileFrontmatter(filepath, cwd, handle),
    { concurrency: 64 },
  )
}
