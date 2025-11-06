/**
 * Options for @vuepress/plugin-media
 */
export interface MediaPluginOptions {
  artplayer?: boolean
  bilibili?: boolean
  vidstack?: boolean
  pdf?:
    | boolean
    | {
        pdfjs?: string | false
      }
  pdfLocales?: Record<string, string>
}
