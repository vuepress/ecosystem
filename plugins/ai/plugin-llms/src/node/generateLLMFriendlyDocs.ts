import matter from 'gray-matter'
import type { PageFrontmatter } from 'vuepress'
import { colors, fs, path } from 'vuepress/utils'
import type { LLMPage, LLMState } from './types.js'
import { generateLink, logger } from './utils/index.js'

/**
 * Generate llm friendly docs
 */
export const generateLLMFriendlyDocs = async (
  llmPages: LLMPage[],
  state: LLMState,
): Promise<void> => {
  logger.load(`Generating llm friendly docs`)

  const promises = llmPages.map(async (page) => {
    const metadata: PageFrontmatter = {
      url: generateLink(page.htmlFilePathRelative, {
        ...state,
        linkExtension: '.md',
      }),
    }

    if (page.frontmatter.description && !page.frontmatter.autoDesc) {
      metadata.description = page.frontmatter.description
    }

    const markdownFilePathRelative = page.htmlFilePathRelative.replace(
      /\.html$/,
      '.md',
    )
    const markdownFilePath = state.app.dir.dest(markdownFilePathRelative)
    const markdownContent = matter.stringify(page.markdown, metadata)

    try {
      await fs.mkdir(path.dirname(markdownFilePath), { recursive: true })
      await fs.writeFile(markdownFilePath, markdownContent, 'utf-8')
      logger.load(
        `Generated llm friendly docs - ${colors.cyan(markdownFilePathRelative)}`,
      )
    } catch (err) {
      logger.error(
        `Failed to process ${colors.cyan(markdownFilePathRelative)}: ${(err as Error).message}`,
      )
    }
  })

  await Promise.all(promises)

  logger.succeed(
    `Generated LLM-friendly docs for ${llmPages.length} documentation links`,
  )
}
