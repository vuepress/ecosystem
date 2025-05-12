import { entries, fromEntries } from '@vuepress/helper'
import { millify } from 'millify'
import { approximateTokenSize } from 'tokenx'
import type { App } from 'vuepress'
import { isFunction } from 'vuepress/shared'
import { colors, fs } from 'vuepress/utils'
import { DEFAULT_LLMSTXT_TEMPLATE } from './constants.js'
import { defaultTemplateGetter } from './getter.js'
import type { LlmsPluginOptions } from './options.js'
import type { LLMPage, LLMState } from './types.js'
import { expandTemplate, getSizeOf, logger } from './utils/index.js'

interface GenerateLLMsTxtOptions {
  /** Template to use for generating `llms.txt`. */
  llmsTxtTemplate?: LlmsPluginOptions['llmsTxtTemplate']

  /** Template variables for `customllmsTxtTemplate`. */
  llmsTxtTemplateGetter?: LlmsPluginOptions['llmsTxtTemplateGetter']
}

/**
 * Generate `llms.txt`
 */
export const generateLLMsTxt = async (
  pages: LLMPage[],
  {
    llmsTxtTemplate = DEFAULT_LLMSTXT_TEMPLATE,
    llmsTxtTemplateGetter = {},
  }: GenerateLLMsTxtOptions,
  state: LLMState,
): Promise<void> => {
  logger.load('Generating llms.txt')

  const llmsTxtTemplateData = fromEntries(
    entries({
      ...defaultTemplateGetter,
      ...llmsTxtTemplateGetter,
    }).map(([key, value]) => [
      key,
      isFunction(value) ? value(pages, state) : value,
    ]),
  )

  const llmsTxt = expandTemplate(llmsTxtTemplate, llmsTxtTemplateData)
  await fs.writeFile(state.app.dir.dest('llms.txt'), llmsTxt, 'utf-8')

  logger.succeed(
    expandTemplate(
      'Generated {file} (~{tokens} tokens, {size}) with {pageCount} documentation links',
      {
        file: colors.cyan('llms.txt'),
        tokens: colors.bold(millify(approximateTokenSize(llmsTxt))),
        size: colors.bold(getSizeOf(llmsTxt)),
        pageCount: colors.bold(pages.length),
      },
    ),
  )
}
