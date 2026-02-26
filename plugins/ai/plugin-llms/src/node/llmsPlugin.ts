import type { Plugin } from 'vuepress/core'
import { removeEndingSlash } from 'vuepress/shared'
import { DEFAULT_LLMSTXT_TEMPLATE, PLUGIN_NAME } from './constants.js'
import { generateLLMFriendlyDocs } from './generateLLMFriendlyDocs.js'
import { generateLLMsFullTxt } from './generateLLMsFullTxt.js'
import { generateLLMsTxt } from './generateLLMsTxt.js'
import { llmExcludePlugin, llmOnlyPlugin } from './markdown-it-plugins/index.js'
import type { LlmsPluginOptions } from './options.js'
import { resolveLLMPages } from './resolveLLMPages.js'
import type { LLMState } from './types.js'
import { logger } from './utils/index.js'
import { keys } from '@vuepress/helper'

/**
 * Plugin to generate LLM-friendly documentation files
 *
 * @example
 * ```ts
 * import { llmsPlugin } from '@vuepress/plugin-llms'
 *
 * export default defineUserConfig({
 *   plugins: [
 *     llmsPlugin({
 *       domain: 'https://example.com',
 *       llmsTxt: true,
 *       llmsFullTxt: true,
 *     }),
 *   ],
 * })
 * ```
 */
export const llmsPlugin =
  (options: LlmsPluginOptions = {}): Plugin =>
  (app) => {
    if (app.env.isDebug) logger.info('Options: ', options)

    return {
      name: PLUGIN_NAME,

      extendsMarkdown: (md) => {
        md.use(llmOnlyPlugin)
        md.use(llmExcludePlugin)
      },

      onGenerated: async () => {
        const {
          domain,
          llmsTxt = true,
          llmsFullTxt = true,
          llmsPageTxt = true,
          filter = (): boolean => true,
          stripHTML = true,
          transformMarkdown = (md): string => md,
          llmsTxtTemplate = DEFAULT_LLMSTXT_TEMPLATE,
          llmsTxtTemplateGetter = {},
          locale = '/',
        } = options

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
            transformMarkdown,
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

        await Promise.all(
          (locale === 'all'
            ? // Generate llms for all locales
              keys(app.siteData.locales)
            : // Generate llms for the specified locale
              [locale]
          ).map((localePath) => generateLLM(localePath)),
        )
      },
    }
  }
