import type { Plugin } from 'vuepress/core'
import { DEFAULT_LLMSTXT_TEMPLATE, PLUGIN_NAME } from './constants.js'
import { generateLLMFriendlyDocsForEachPage } from './generateLLMFriendlyDocsForEachPage.js'
import { generateLLMsFullTxt } from './generateLLMsFullTxt.js'
import { generateLLMsTxt } from './generateLLMsTxt.js'
import type { LlmstxtPluginOptions } from './options.js'
import { resolvePreparedPages } from './preparedPages.js'
import { logger } from './utils/index.js'

/**
 * llmstxt plugin
 *
 * @param options - LlmstxtPluginOptions
 *
 * @example
 * ```typescript
 * import { llmstxtPlugin } from '@vuepress/plugin-llms'
 *
 * export default defineUserConfig({
 * })
 * ```
 */
export const llmstxtPlugin =
  (options: LlmstxtPluginOptions = {}): Plugin =>
  (app) => {
    if (app.env.isDebug) logger.info('Options: ', options)

    const {
      domain,
      llmsTxt = true,
      llmsFullTxt = true,
      llmsPageTxt = true,
      filter = () => true,
      stripHTML = true,
      llmsTxtTemplate = DEFAULT_LLMSTXT_TEMPLATE,
      llmsTxtTemplateGetter,
      customGenerateTOC,
    } = options

    const linkExtension = !llmsPageTxt ? '.html' : undefined

    return {
      name: PLUGIN_NAME,

      onGenerated: async () => {
        const preparedPages = resolvePreparedPages(app, {
          stripHTML,
          filter,
        })

        if (llmsTxt) {
          await generateLLMsTxt(app, preparedPages, {
            domain,
            llmsTxtTemplate,
            llmsTxtTemplateGetter,
            linkExtension,
            customGenerateTOC,
          })
        }

        if (llmsFullTxt) {
          await generateLLMsFullTxt(app, preparedPages, {
            domain,
            linkExtension,
          })
        }

        if (llmsPageTxt) {
          await generateLLMFriendlyDocsForEachPage(app, preparedPages, domain)
        }
      },
    }
  }
