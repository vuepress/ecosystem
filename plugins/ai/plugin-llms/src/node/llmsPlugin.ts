// import { getRootLang } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { removeEndingSlash } from 'vuepress/shared'
import { DEFAULT_LLMSTXT_TEMPLATE, PLUGIN_NAME } from './constants.js'
import { generateLLMFriendlyDocs } from './generateLLMFriendlyDocs.js'
import { generateLLMsFullTxt } from './generateLLMsFullTxt.js'
import { generateLLMsTxt } from './generateLLMsTxt.js'
import type { LlmsPluginOptions } from './options.js'
import { resolveLLMPages } from './resolveLLMPages.js'
import type { LLMState } from './types.js'
import { logger } from './utils/index.js'

/**
 * llmstxt plugin
 *
 * @param llmOptions - LlmsPluginOptions
 *
 * @example
 * ```ts
 * import { llmsPlugin } from '@vuepress/plugin-llms'
 *
 * export default defineUserConfig({
 * })
 * ```
 */
export const llmsPlugin =
  (llmOptions: LlmsPluginOptions = {}): Plugin =>
  (app) => {
    if (app.env.isDebug) logger.info('Options: ', llmOptions)

    return {
      name: PLUGIN_NAME,

      onGenerated: async () => {
        const {
          domain,
          llmsTxt = true,
          llmsFullTxt = true,
          llmsPageTxt = true,
          filter = () => true,
          stripHTML = true,
          llmsTxtTemplate = DEFAULT_LLMSTXT_TEMPLATE,
          llmsTxtTemplateGetter = {},
          locale = '/',
        } = llmOptions

        const linkExtension = llmsPageTxt ? '.md' : '.html'
        const { locales, ...base } = app.siteData

        const generateLLM = async (localePath: string): Promise<void> => {
          const llmState: LLMState = {
            app,
            base: app.options.base,
            domain: domain ? removeEndingSlash(domain) : undefined,
            linkExtension,
            currentLocale: localePath,
            siteLocale: {
              ...base,
              ...locales[localePath],
            },
            allLocales: locale === 'all',
          }

          const llmPages = resolveLLMPages(app, {
            stripHTML,
            filter,
            currentLocale: localePath,
          })

          if (llmsTxt) {
            await generateLLMsTxt(llmPages, llmState, {
              llmsTxtTemplate,
              llmsTxtTemplateGetter,
            })
          }

          if (llmsFullTxt) {
            await generateLLMsFullTxt(llmPages, llmState)
          }

          if (llmsPageTxt) {
            await generateLLMFriendlyDocs(llmPages, llmState)
          }
        }

        if (locale === 'all') {
          // Generate llms for all locales
          for (const localePath in app.siteData.locales) {
            await generateLLM(localePath)
          }
        } else {
          // Generate llms for the specified locale
          await generateLLM(locale)
        }
      },
    }
  }
