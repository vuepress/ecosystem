import matter from 'gray-matter'
import { millify } from 'millify'
import { approximateTokenSize } from 'tokenx'
import type { App, PageFrontmatter } from 'vuepress'
import { colors, fs } from 'vuepress/utils'
import type { LlmsPluginOptions } from './options.js'
import type { LLMPage, LinksExtension } from './types.js'
import {
  expandTemplate,
  extractTitle,
  generateLink,
  getSizeOf,
  logger,
} from './utils/index.js'

interface GenerateLLMsFullTxtOptions {
  app: App

  /** The base domain for the generated links. */
  domain?: LlmsPluginOptions['domain']

  /** The link extension for generated links. */
  linkExtension?: LinksExtension
}

/**
 * Generate `llms-full.txt`
 */
export const generateLLMsFullTxt = async (
  llmPages: LLMPage[],
  { app, domain, linkExtension }: GenerateLLMsFullTxtOptions,
): Promise<void> => {
  logger.load('Generating llms-full.txt')

  const pageContents = llmPages.map((page) => {
    const metadata: PageFrontmatter = {
      url: generateLink(
        page.htmlFilePathRelative,
        app.options.base,
        domain,
        linkExtension ?? '.md',
      ),
    }

    if (page.frontmatter.description && !page.frontmatter.autoDesc) {
      metadata.description = page.frontmatter.description
    }

    // completion title in markdown content
    const content = extractTitle(page.markdown)
      ? page.markdown
      : `# ${page.title}\n${page.markdown}`

    return matter.stringify(content, metadata)
  })

  const llmsFullTxt = pageContents.join('\n---\n\n')

  await fs.writeFile(app.dir.dest('llms-full.txt'), llmsFullTxt, 'utf-8')

  logger.succeed(
    expandTemplate(
      'Generated {file} (~{tokens} tokens, {size}) with {pageCount} documentation links',
      {
        file: colors.cyan('llms-full.txt'),
        tokens: colors.bold(millify(approximateTokenSize(llmsFullTxt))),
        size: colors.bold(getSizeOf(llmsFullTxt)),
        pageCount: colors.bold(llmPages.length),
      },
    ),
  )
}
