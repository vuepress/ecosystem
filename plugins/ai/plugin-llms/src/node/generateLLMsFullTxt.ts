import matter from 'gray-matter'
import { millify } from 'millify'
import { approximateTokenSize } from 'tokenx'
import type { App, PageFrontmatter } from 'vuepress'
import { colors, fs } from 'vuepress/utils'
import type {
  LinksExtension,
  LlmstxtPluginOptions,
  PreparedPage,
} from './types.js'
import {
  expandTemplate,
  extractTitle,
  generateLink,
  getSizeOf,
  logger,
  withBase,
} from './utils/index.js'

interface GenerateLLMsFullTxtOptions {
  /** The base domain for the generated links. */
  domain?: LlmstxtPluginOptions['domain']

  /** The link extension for generated links. */
  linksExtension?: LinksExtension
}

export const generateLLMsFullTxt = async (
  app: App,
  preparedPages: PreparedPage[],
  { domain, linksExtension }: GenerateLLMsFullTxtOptions,
): Promise<void> => {
  logger.load('Generating llms-full.txt')

  const pageContents = preparedPages.map((page) => {
    const metadata: PageFrontmatter = {
      url: withBase(
        generateLink(page.path, domain, linksExtension ?? '.md'),
        app.options.base,
      ),
    }

    if (page.frontmatter.description?.length) {
      metadata.description = page.frontmatter.description
    }

    // completion title in markdown content
    const content = extractTitle(page.content)
      ? page.content
      : `# ${page.title}\n${page.content}`
    return matter.stringify(content, metadata)
  })

  const llmsFullTxt = pageContents.join('\n---\n\n')

  await fs.promises.writeFile(
    app.dir.dest('llms-full.txt'),
    llmsFullTxt,
    'utf-8',
  )

  logger.succeed(
    expandTemplate(
      'Generated {file} (~{tokens} tokens, {size}) with {pageCount} documentation links',
      {
        file: colors.cyan('llms-full.txt'),
        tokens: colors.bold(millify(approximateTokenSize(llmsFullTxt))),
        size: colors.bold(getSizeOf(llmsFullTxt)),
        pageCount: colors.bold(preparedPages.length),
      },
    ),
  )
}
