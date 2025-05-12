import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'
import { minimatch } from 'minimatch'
import pc from 'picocolors'
import { remark } from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import { remove } from 'unist-util-remove'

import type { App, Plugin } from '@vuepress/core'
const PLUGIN_NAME = '@vuepress/plugin-llms'

import { defaultLLMsTxtTemplate } from './constants.js'
import { generateLLMsFullTxt, generateLLMsTxt } from './helpers/index.js'
import log from './helpers/logger.js'
import { extractTitle } from './helpers/utils.js'
import type { LlmstxtSettings, PreparedFile } from './types.js'

/**
 * [VuePress](https://v2.vuepress.vuejs.org/) 插件，用于生成原始的 Markdown 格式文档，这种格式对**大语言模型(LLMs)**更轻量且更高效
 * [VuePress](https://v2.vuepress.vuejs.org/) plugin for generating raw documentation for **LLMs** in Markdown format which is much lighter and more efficient for LLMs
 *
 * @param userSettings - Plugin settings. | 插件设置。
 * @see https://github.com/vuepress/ecosystem/blob/main/plugins/seo/plugin-llms
 * @see https://llmstxt.org/
 */
export const llmsPlugin = (userSettings: LlmstxtSettings = {}): Plugin => {
  // Create a settings object with defaults explicitly merged
  // 创建一个设置对象，明确合并默认值
  const settings = {
    generateLLMsTxt: true,
    generateLLMsFullTxt: true,
    stripHTML: true,
    ignoreFiles: [] as string[],
    workDir: '' as string,
    ...userSettings,
    // Ensure workDir is set after merging
  }

  // Set to store all markdown file paths
  // 用于存储所有markdown文件路径的集合
  const mdFiles: Set<string> = new Set()

  return {
    name: PLUGIN_NAME,

    /** Set up plugin on initialization | 在初始化时设置插件 */
    onInitialized(app: App) {
      if (settings.workDir) {
        settings.workDir = path.resolve(app.dir.source(), settings.workDir)
      } else {
        settings.workDir = app.dir.source()
      }

      log.info(
        `${pc.bold(PLUGIN_NAME)} initialized with workDir: ${pc.cyan(settings.workDir)}`,
      )
    },

    /** Process files after they've been prepared | 在文件准备好后处理它们 */
    async onGenerated(app: App) {
      // Reset file collection
      // 重置文件集合
      mdFiles.clear()
      log.info('Starting markdown file collection')

      // Collect all markdown files in the source directory
      // 收集源目录中的所有markdown文件
      const collectMarkdownFiles = async (dir: string): Promise<void> => {
        const entries = await fs.readdir(dir, { withFileTypes: true })

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)

          // Skip files outside workDir if configured
          // 如果配置了workDir，跳过workDir之外的文件
          if (!fullPath.startsWith(settings.workDir)) {
            continue
          }

          // Process directories recursively
          // 递归处理目录
          if (entry.isDirectory()) {
            await collectMarkdownFiles(fullPath)
            continue
          }

          // Skip non-markdown files
          // 跳过非markdown文件
          if (!entry.name.endsWith('.md')) {
            continue
          }

          // Check if file should be ignored
          // 检查文件是否应该被忽略
          if (settings.ignoreFiles?.length) {
            const relPath = path.relative(settings.workDir, fullPath)
            const shouldIgnore = settings.ignoreFiles.some((pattern) => {
              if (typeof pattern === 'string') {
                return minimatch(relPath, pattern)
              }
              return false
            })

            if (shouldIgnore) {
              continue
            }
          }

          // Add markdown file to collection
          // 将markdown文件添加到集合中
          mdFiles.add(fullPath)
        }
      }

      await collectMarkdownFiles(settings.workDir)

      const mdFilesList = Array.from(mdFiles)
      const fileCount = mdFilesList.length

      // Skip if no files found
      // 如果没有找到文件则跳过
      if (fileCount === 0) {
        log.warn(
          `No markdown files found to process. Check your \`${pc.bold('workDir')}\` and \`${pc.bold('ignoreFiles')}\` settings.`,
        )
        return
      }

      log.info(
        `Processing ${pc.bold(fileCount.toString())} markdown files from ${pc.cyan(settings.workDir)}`,
      )

      // Prepare files for processing
      // 准备文件以进行处理
      const preparedFiles: PreparedFile[] = await Promise.all(
        mdFilesList.map(async (file) => {
          const content = await fs.readFile(file, 'utf-8')

          let mdFile: matter.GrayMatterFile<string>

          if (settings.stripHTML) {
            const cleanedMarkdown = await remark()
              .use(remarkFrontmatter)
              .use(() => {
                // Strip HTML tags
                // 去除HTML标签
                return (tree) => {
                  remove(tree, { type: 'html' })
                  return tree
                }
              })
              .process(content)

            mdFile = matter(
              String(cleanedMarkdown),
            ) as matter.GrayMatterFile<string>
          } else {
            mdFile = matter(content) as matter.GrayMatterFile<string>
          }

          // Extract title from frontmatter or use the first heading
          // 从frontmatter中提取标题或使用第一个标题
          const title = extractTitle(mdFile)?.trim() || 'Untitled'
          const filePath =
            path.basename(file) === 'index.md' &&
            path.dirname(file) !== settings.workDir
              ? `${path.dirname(file)}.md`
              : file

          return { path: filePath, title, file: mdFile }
        }),
      )

      // Sort files by title for better organization
      // 按标题排序文件以获得更好的组织
      preparedFiles.sort((a, b) => a.title.localeCompare(b.title))

      const tasks: Promise<void>[] = []
      const outDir = app.dir.dest()

      // Create output directory if it doesn't exist
      // 如果输出目录不存在则创建
      try {
        await fs.access(outDir)
      } catch {
        log.info(`Creating output directory: ${pc.cyan(outDir)}`)
        await fs.mkdir(outDir, { recursive: true })
      }

      // Generate llms.txt
      // 生成 llms.txt
      if (settings.generateLLMsTxt) {
        const llmsTxtPath = path.resolve(outDir, 'llms.txt')
        const templateVariables = {
          title: settings.title,
          description: settings.description,
          details: settings.details,
          toc: settings.toc,
          ...settings.customTemplateVariables,
        }

        tasks.push(
          (async () => {
            log.info(`Generating ${pc.cyan('llms.txt')}...`)
            const siteConfig = app.siteData

            // Find index.md file
            // 查找 index.md 文件
            const indexMdPath = path.resolve(settings.workDir, 'index.md')
            let indexMdExists = true

            try {
              await fs.access(indexMdPath)
            } catch {
              indexMdExists = false
              log.warn('index.md not found in workDir, using fallback values')
            }

            const content = await generateLLMsTxt(preparedFiles, {
              indexMd: indexMdExists
                ? indexMdPath
                : preparedFiles[0]?.path || '',
              srcDir: settings.workDir,
              LLMsTxtTemplate:
                settings.customLLMsTxtTemplate || defaultLLMsTxtTemplate,
              templateVariables: templateVariables as Record<
                string,
                string | boolean | undefined
              >,
              siteConfig: {
                title: siteConfig.title,
                description: siteConfig.description,
              },
              domain: settings.domain,
              linksExtension: '.md',
              cleanUrls: false,
            })

            await fs.writeFile(llmsTxtPath, content, 'utf-8')
            log.success(
              `Generated ${pc.cyan('llms.txt')} (${pc.bold(content.length.toString())} bytes)`,
            )
          })(),
        )
      }

      // Generate llms-full.txt
      // 生成 llms-full.txt
      if (settings.generateLLMsFullTxt) {
        const llmsFullTxtPath = path.resolve(outDir, 'llms-full.txt')

        tasks.push(
          (async () => {
            log.info(`Generating ${pc.cyan('llms-full.txt')}...`)

            const content = await generateLLMsFullTxt(preparedFiles, {
              srcDir: settings.workDir,
              cleanUrls: false,
              linksExtension: '.md',
              domain: settings.domain,
              ...(settings.customLLMsFullTxtTemplate
                ? { template: settings.customLLMsFullTxtTemplate }
                : {}),
            })

            await fs.writeFile(llmsFullTxtPath, content, 'utf-8')
            log.success(
              `Generated ${pc.cyan('llms-full.txt')} (${pc.bold(content.length.toString())} bytes)`,
            )
          })(),
        )
      }

      // Wait for all tasks to complete
      // 等待所有任务完成
      try {
        await Promise.all(tasks)
        log.success(`${pc.bold(PLUGIN_NAME)} completed all tasks successfully!`)
      } catch (error) {
        log.error(
          `Error generating LLMs files: ${error instanceof Error ? error.message : String(error)}`,
        )
        throw error
      }
    },
  }
}

// 为了向后兼容，保留默认导出
// For backward compatibility, retain default export
export default llmsPlugin
