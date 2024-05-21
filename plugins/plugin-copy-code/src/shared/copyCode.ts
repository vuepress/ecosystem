export interface CopyCodeOptions {
  /**
   * Copy Code Button Selector
   *
   * 复制代码按钮 选择器
   *
   * @default 'div[class*="language-"] > button.vp-copy-code'
   */
  selector?: string

  /**
   * Prompt message display time
   *
   * @description setting it to `0` will disable the hint.
   *
   * 提示消息显示时间
   *
   * @description 设置为 `0` 会禁用提示。
   *
   * @default 2000
   */
  duration?: number
}
