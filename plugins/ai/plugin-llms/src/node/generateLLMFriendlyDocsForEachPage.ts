import matter from 'gray-matter'
import type { App, PageFrontmatter } from 'vuepress'
import { removeLeadingSlash } from 'vuepress/shared'
import { colors, fs, path } from 'vuepress/utils'
import type { LlmstxtPluginOptions, PreparedPage } from './types.js'
import { generateLink, logger } from './utils/index.js'

/**
 * Generate llm friendly docs
 */
export const generateLLMFriendlyDocsForEachPage = async (
  app: App,
  preparedPages: PreparedPage[],
  domain: LlmstxtPluginOptions['domain'],
): Promise<void> => {
  const promises = preparedPages.map(async (page) => {
    const relativePath = removeLeadingSlash(path.join(`${page.path}.md`))
    const outputPath = app.dir.dest(relativePath)

    const metadata: PageFrontmatter = {
      url: generateLink(page.path, app.options.base, domain, '.md'),
    }

    if (page.frontmatter.description?.length) {
      metadata.description = page.frontmatter.description
    }
    try {
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.promises.writeFile(
        outputPath,
        matter.stringify(page.content, metadata),
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
    `Generated LLM-friendly docs with ${preparedPages.length} documentation links`,
  )
}
