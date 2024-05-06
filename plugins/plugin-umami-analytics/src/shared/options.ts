/**
 * Options for @vuepress/plugin-umami-analytics
 */
export interface UmamiOptions {
  /**
   * The website ID in umami Analytics
   */
  id: string

  /**
   * link of umami analytics script
   *
   * @default 'https://us.umami.is/script.js'
   */
  link?: string

  /**
   * @default true
   */
  autoTrack?: boolean

  /**
   * Cache data to speed up
   */
  cache?: boolean

  /**
   * Allowed domains
   */
  domains?: string[]

  /**
   * @default link
   */
  hostUrl?: string
}
