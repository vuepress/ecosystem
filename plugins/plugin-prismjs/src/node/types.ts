export interface PreWrapperOptions {
  /**
   * Wrap the `<pre>` tag with an extra `<div>` or not. Do not disable it unless you
   * understand what's it for
   *
   * - Required for `highlightLines`
   * - Required for `lineNumbers`
   * - Required for title display of default theme
   */
  preWrapper?: boolean

  /**
   * Enable line numbers or not
   *
   * - A `boolean` value is to enable line numbers or not.
   * - A `number` value is the minimum number of lines to enable line numbers
   *
   * @default true
   */
  lineNumbers?: boolean | number

  /**
   * Enable highlight lines or not
   *
   * @default true
   */
  highlightLines?: boolean

  /**
   * Add `v-pre` directive or not
   *
   * @default { block: true, inline: true }
   */
  vPre?: {
    /**
     * Add `v-pre` directive to `<pre>` tag of code block or not
     */
    block?: boolean

    /**
     * Add `v-pre` directive to `<code>` tag of inline code or not
     */
    inline?: boolean
  }
}
