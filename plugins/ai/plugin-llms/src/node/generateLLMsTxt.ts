import { entries, fromEntries } from '@vuepress/helper'
import { millify } from 'millify'
import { approximateTokenSize } from 'tokenx'
import { isFunction, removeLeadingSlash } from 'vuepress/shared'
import { colors, fs, path } from 'vuepress/utils'
import type { LlmsPluginOptions } from './options.js'
import { defaultTemplateGetter } from './templateGetter.js'
import type { LLMPage, LLMState } from './types.js'
import { expandTemplate, getSizeOf, logger } from './utils/index.js'

type GenerateLLMsTxtOptions = Required<
  Pick<LlmsPluginOptions, 'llmsTxtTemplate' | 'llmsTxtTemplateGetter'>
>

/**
 * Generate `llms.txt`
 */
export const generateLLMsTxt = async (
  pages: LLMPage[],
  state: LLMState,
  { llmsTxtTemplate, llmsTxtTemplateGetter }: GenerateLLMsTxtOptions,
): Promise<void> => {
  const { app, allLocales, currentLocale } = state
  const llmsTxtRelativePath = allLocales
    ? path.join(removeLeadingSlash(currentLocale), 'llms.txt')
    : 'llms.txt'

  logger.load(`Generating ${llmsTxtRelativePath}`)

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

  await fs.writeFile(app.dir.dest(llmsTxtRelativePath), llmsTxt, 'utf-8')

  logger.succeed(
    expandTemplate(
      'Generated {file} (~{tokens} tokens, {size}) with {pageCount} documentation links',
      {
        file: colors.cyan(llmsTxtRelativePath),
        tokens: colors.bold(millify(approximateTokenSize(llmsTxt))),
        size: colors.bold(getSizeOf(llmsTxt)),
        pageCount: colors.bold(pages.length),
      },
    ),
  )
}
