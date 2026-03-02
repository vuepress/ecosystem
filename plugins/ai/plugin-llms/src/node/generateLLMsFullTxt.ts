import matter from 'gray-matter'
import { millify } from 'millify'
import { estimateTokenCount } from 'tokenx'
import type { PageFrontmatter } from 'vuepress'
import { removeLeadingSlash } from 'vuepress/shared'
import { colors, fs, path } from 'vuepress/utils'
import type { LLMPage, LLMState } from './types.js'
import {
  expandTemplate,
  extractTitle,
  generateLink,
  getSizeOf,
  logger,
} from './utils/index.js'

const PAGE_SEPARATOR = '\n---\n\n'

/**
 * Generate `llms-full.txt` file with all page contents
 *
 * @param llmPages - Array of LLM pages to include
 * @param state - State object containing generation options
 */
export const generateLLMsFullTxt = async (
  llmPages: LLMPage[],
  state: LLMState,
): Promise<void> => {
  const { app, allLocales, currentLocale } = state
  const llmsFullTxtRelativePath = allLocales
    ? path.join(removeLeadingSlash(currentLocale), 'llms-full.txt')
    : 'llms-full.txt'

  logger.load(`Generating ${llmsFullTxtRelativePath}`)

  const pageContents = llmPages.map((page) => {
    const metadata: PageFrontmatter = {
      url: generateLink(page.htmlFilePathRelative, state),
    }

    if (page.frontmatter.description && !page.data.autoDesc)
      metadata.description = page.frontmatter.description

    // completion title in markdown content
    const content = extractTitle(page.markdown)
      ? page.markdown
      : `# ${page.title}\n${page.markdown}`

    return matter.stringify(content, metadata)
  })

  const llmsFullTxt = pageContents.join(PAGE_SEPARATOR)

  await fs.writeFile(
    app.dir.dest(llmsFullTxtRelativePath),
    llmsFullTxt,
    'utf-8',
  )

  logger.succeed(
    expandTemplate(
      'Generated {file} (~{tokens} tokens, {size}) with {pageCount} documentation links',
      {
        file: colors.cyan(llmsFullTxtRelativePath),
        tokens: colors.bold(millify(estimateTokenCount(llmsFullTxt))),
        size: colors.bold(getSizeOf(llmsFullTxt)),
        pageCount: colors.bold(llmPages.length),
      },
    ),
  )
}
