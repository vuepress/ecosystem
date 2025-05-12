import matter from 'gray-matter'
import type { PageFrontmatter } from 'vuepress'
import { colors, fs, path } from 'vuepress/utils'
import type { LLMPage, LLMState } from './types.js'
import { generateLink, logger, stripExt } from './utils/index.js'

/**
 * Generate llm friendly docs
 */
export const generateLLMFriendlyDocsForEachPage = async (
  llmPages: LLMPage[],
  { app, base, domain }: LLMState,
): Promise<void> => {
  const promises = llmPages.map(async (page) => {
    const relativePath = `${stripExt(page.htmlFilePathRelative)}.md`
    const outputPath = app.dir.dest(relativePath)

    const metadata: PageFrontmatter = {
      url: generateLink(page.htmlFilePathRelative, base, domain, '.md'),
    }

    if (page.frontmatter.description && !page.frontmatter.autoDesc) {
      metadata.description = page.frontmatter.description
    }
    try {
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(
        outputPath,
        matter.stringify(page.markdown, metadata),
        'utf-8',
      )
      logger.load(`generate llm friendly docs - ${colors.cyan(relativePath)}`)
    } catch (e) {
      logger.error(
        `Failed to process ${colors.cyan(relativePath)}: ${(e as Error).message}`,
      )
    }
  })

  await Promise.all(promises)

  logger.succeed(
    `Generated LLM-friendly docs with ${llmPages.length} documentation links`,
  )
}
