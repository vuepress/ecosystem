import type { ExactLocaleConfig } from '@vuepress/helper/client'

import type { CopyCodePluginLocaleData } from '../shared/index.js'

export type CopyCodePluginLocaleConfig =
  ExactLocaleConfig<CopyCodePluginLocaleData>

/**
 * Copy code options that can be defined in the client-side
 *
 * 可以在客户端定义的复制代码选项
 */
export interface CopyCodeClientOptions {
  /**
   * Code block selector
   *
   * 代码块选择器
   *
   * @default '[vp-content] div[class*="language-"] pre'
   */
  selector?: string[] | string

  /**
   * Elements selector in code blocks to ignore when copying
   *
   * 复制时忽略的代码块中的元素选择器
   *
   * @default ''
   */
  ignoreSelector?: string[] | string

  /**
   * The selector of inline code
   *
   * 行内代码选择器
   *
   * Setting it to `true` will use the default selector `'[vp-content] :not(pre) >
   * code'`, while setting it to `false` will disable copying inline code.
   *
   * 设置为 `true` 会使用默认选择器 `'[vp-content] :not(pre) > code'`，设置为 `false`
   * 会禁用行内代码复制。
   *
   * @default false
   */
  inline?: string[] | boolean | string

  /**
   * Prompt message display time
   *
   * 提示消息显示时间
   *
   * Setting it to `0` will disable the hint.
   *
   * 设置为 `0` 会禁用提示。
   *
   * @default 2000
   */
  duration?: number

  /**
   * Whether to display on the mobile side
   *
   * 是否展示在移动端
   *
   * @default false
   */
  showInMobile?: boolean

  /**
   * Transform `<pre>` element before copying
   *
   * 转换复制前的 `<pre>` 元素
   *
   * For example, deleting certain elements before copying, or inserting
   * copyright information.
   *
   * 例如在复制前删除特定元素，或插入版权信息。
   *
   * @param preElement - `<pre>` clone node / `<pre>` 克隆节点
   */
  transform?: (preElement: HTMLPreElement) => void
}
