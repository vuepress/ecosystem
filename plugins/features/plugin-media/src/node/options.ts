import type {
  ArtPlayerOptions,
  PDFLocaleData,
  VidstackLocaleData,
} from '../shared/index.js'

/** Options for @vuepress/plugin-media */
export interface MediaPluginOptions {
  artplayer?: boolean | ArtPlayerOptions
  bilibili?: boolean
  vidstack?: boolean
  vidstackLocales?: Record<string, VidstackLocaleData>
  pdf?:
    | boolean
    | {
        pdfjs?: string | false
      }
  pdfLocales?: Record<string, PDFLocaleData>
}
