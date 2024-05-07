import type { Plugin, PluginObject } from 'vuepress/core'
import { logger } from 'vuepress/utils'

/**
 * Options for @vuepress/plugin-google-tag-manager
 */
export interface GoogleTagManagerPluginOptions {
  /**
   * The Container ID of Google Tag Manager which should start with `'GTM-'`.
   */
  id: string

  /**
   * Enable debug mode.
   */
  debug?: boolean
}

export const googleTagManagerPlugin =
  (options: GoogleTagManagerPluginOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: '@vuepress/plugin-google-tag-manager',
    }

    if (!options.id) {
      logger.warn(`[${plugin.name}] 'id' is required`)
      return plugin
    }

    // returns an empty plugin in dev mode when debug mode is not enabled
    if (app.env.isDev && !options.debug) {
      return plugin
    }

    return {
      ...plugin,

      define: {
        __GTM_OPTIONS__: options,
      },

      onInitialized: (app) => {
        app.options.head.push([
          'script',
          {},
          `\
((w,d,s,l,i)=>{\
w[l]=w[l]||[];\
w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});\
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';\
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;\
f.parentNode.insertBefore(j,f);\
})(window,document,'script','dataLayer','${options.id}');\
`,
        ])
      },
    }
  }
