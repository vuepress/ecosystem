import { millify } from 'millify'
import { approximateTokenSize } from 'tokenx'
import type { App } from 'vuepress'
import { colors, fs } from 'vuepress/utils'
import { DEFAULT_LLMSTXT_TEMPLATE } from './constants.js'
import type {
  LinksExtension,
  LlmstxtPluginOptions,
  PreparedPage,
} from './types.js'
import {
  expandTemplate,
  generateTOC,
  getSizeOf,
  logger,
} from './utils/index.js'

interface GenerateLLMsTxtOptions {
  /** Template to use for generating `llms.txt`. */
  LLMsTxtTemplate?: LlmstxtPluginOptions['customLLMsTxtTemplate']

  /** Template variables for `customLLMsTxtTemplate`. */
  templateVariables?: LlmstxtPluginOptions['customTemplateVariables']

  /** The base domain for the generated links. */
  domain?: LlmstxtPluginOptions['domain']

  /** The link extension for generated links. */
  linksExtension?: LinksExtension
}

/**
 * Generate `llms.txt`
 */
export const generateLLMsTxt = async (
  app: App,
  preparedPages: PreparedPage[],
  {
    LLMsTxtTemplate = DEFAULT_LLMSTXT_TEMPLATE,
    templateVariables = {},
    domain,
    linksExtension,
  }: GenerateLLMsTxtOptions,
): Promise<void> => {
  logger.load('Generating llms.txt')

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const rootLang = app.options.lang || app.options.locales['/']?.lang || 'en-US'
  const [rootPath, localeOptions] = Object.entries(app.options.locales).find(
    ([, { lang }]) => lang === rootLang,
  ) ?? ['/', { lang: rootLang }]

  const homePage = app.pages.find((page) => page.path === rootPath)

  templateVariables.title ??=
    localeOptions.title ||
    app.options.title ||
    homePage?.frontmatter.title ||
    homePage?.title ||
    'LLMs Documentation'

  templateVariables.description ??=
    homePage?.frontmatter.description ||
    localeOptions.description ||
    app.options.description

  if (templateVariables.description)
    templateVariables.description = `> ${templateVariables.description}`

  templateVariables.details ??=
    (homePage?.frontmatter.details as string) ||
    (!templateVariables.description
      ? 'This file contains links to all documentation sections.'
      : '')

  templateVariables.toc ??= generateTOC(preparedPages, {
    base: app.options.base,
    domain,
    linksExtension,
  })

  const llmsTxt = expandTemplate(LLMsTxtTemplate, templateVariables)
  await fs.promises.writeFile(app.dir.dest('llms.txt'), llmsTxt, 'utf-8')

  logger.succeed(
    expandTemplate(
      'Generated {file} (~{tokens} tokens, {size}) with {pageCount} documentation links',
      {
        file: colors.cyan('llms.txt'),
        tokens: colors.bold(millify(approximateTokenSize(llmsTxt))),
        size: colors.bold(getSizeOf(llmsTxt)),
        pageCount: colors.bold(preparedPages.length),
      },
    ),
  )
}
