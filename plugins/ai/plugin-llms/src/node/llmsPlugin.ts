// import { getRootLang } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { DEFAULT_LLMSTXT_TEMPLATE, PLUGIN_NAME } from './constants.js'
import { generateLLMFriendlyDocsForEachPage } from './generateLLMFriendlyDocsForEachPage.js'
import { generateLLMsFullTxt } from './generateLLMsFullTxt.js'
import { generateLLMsTxt } from './generateLLMsTxt.js'
import type { LlmsPluginOptions } from './options.js'
import { resolveLLMPages } from './resolveLLMPages.js'
import type { LLMState } from './types.js'
import { logger } from './utils/index.js'

/**
 * llmstxt plugin
 *
 * @param llmOptions - LlmstxtPluginOptions
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
  (llmOptions: LlmsPluginOptions = {}): Plugin =>
  (app) => {
    if (app.env.isDebug) logger.info('Options: ', llmOptions)

    const {
      domain,
      llmsTxt = true,
      llmsFullTxt = true,
      llmsPageTxt = true,
      filter = () => true,
      stripHTML = true,
      llmsTxtTemplate = DEFAULT_LLMSTXT_TEMPLATE,
      llmsTxtTemplateGetter,
    } = llmOptions

    return {
      name: PLUGIN_NAME,

      onGenerated: async () => {
        const linkExtension = !llmsPageTxt ? '.html' : undefined
        const { locales, ...base } = app.siteData

        const llmState: LLMState = {
          app,
          base: app.options.base,
          domain,
          linkExtension,
          currentLocale: '/',
          siteLocale: {
            ...base,
            ...locales['/'],
          },
        }

        const llmPages = resolveLLMPages(app, {
          stripHTML,
          filter,
        })

        if (llmsTxt) {
          await generateLLMsTxt(
            llmPages,
            { llmsTxtTemplate, llmsTxtTemplateGetter },
            llmState,
          )
        }

        if (llmsFullTxt) {
          await generateLLMsFullTxt(llmPages, llmState)
        }

        if (llmsPageTxt) {
          await generateLLMFriendlyDocsForEachPage(llmPages, llmState)
        }
      },
    }
  }
