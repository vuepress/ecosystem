import { millify } from 'millify'
import { approximateTokenSize } from 'tokenx'
import type { App } from 'vuepress'
import { colors, fs } from 'vuepress/utils'
import { DEFAULT_LLMSTXT_TEMPLATE } from './constants.js'
import type { LlmstxtPluginOptions } from './options.js'
import type {
  GenerateTOCOptions,
  LinksExtension,
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
  llmsTxtTemplate?: LlmstxtPluginOptions['llmsTxtTemplate']

  /** Template variables for `customllmsTxtTemplate`. */
  llmsTxtTemplateGetter?: LlmstxtPluginOptions['llmsTxtTemplateGetter']

  /** The base domain for the generated links. */
  domain?: LlmstxtPluginOptions['domain']

  /** The link extension for generated links. */
  linkExtension?: LinksExtension

  /** Custom generates a Table of Contents (TOC) for the provided prepared pages. */
  customGenerateTOC?: LlmstxtPluginOptions['customGenerateTOC']
}

/**
 * Generate `llms.txt`
 */
export const generateLLMsTxt = async (
  app: App,
  preparedPages: PreparedPage[],
  {
    llmsTxtTemplate = DEFAULT_LLMSTXT_TEMPLATE,
    llmsTxtTemplateGetter = {},
    domain,
    linkExtension,
    customGenerateTOC,
  }: GenerateLLMsTxtOptions,
): Promise<void> => {
  logger.load('Generating llms.txt')

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const rootLang = app.options.lang || app.options.locales['/']?.lang || 'en-US'
  const [rootPath, localeOptions] = Object.entries(app.options.locales).find(
    ([, { lang }]) => lang === rootLang,
  ) ?? ['/', { lang: rootLang }]

  const homePage = app.pages.find((page) => page.path === rootPath)

  llmsTxtTemplateGetter.title ??=
    localeOptions.title ||
    app.options.title ||
    homePage?.frontmatter.title ||
    homePage?.title ||
    'LLMs Documentation'

  llmsTxtTemplateGetter.description ??=
    homePage?.frontmatter.description ||
    localeOptions.description ||
    app.options.description

  if (llmsTxtTemplateGetter.description)
    llmsTxtTemplateGetter.description = `> ${llmsTxtTemplateGetter.description}`

  llmsTxtTemplateGetter.details ??=
    (homePage?.frontmatter.details as string) ||
    (!llmsTxtTemplateGetter.description
      ? 'This file contains links to all documentation sections.'
      : '')

  const options: GenerateTOCOptions = {
    base: app.options.base,
    domain,
    linkExtension,
  }
  llmsTxtTemplateGetter.toc ??=
    customGenerateTOC?.(preparedPages, options) ??
    generateTOC(preparedPages, options)

  const llmsTxt = expandTemplate(llmsTxtTemplate, llmsTxtTemplateGetter)
  await fs.writeFile(app.dir.dest('llms.txt'), llmsTxt, 'utf-8')

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
