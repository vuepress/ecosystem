import type { LocaleConfig } from 'vuepress/shared'
import type { CopyCodePluginLocaleData } from '../shared/index.js'

export interface CopyCodePluginOptions {
  /**
   * Code block selector
   *
   * 代码块选择器
   *
   * @default '.theme-default-content div[class*="language-"] pre'
   */
  selector?: string | string[]

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

  /**
   * Whether to display on the mobile side
   *
   * 是否展示在移动端
   *
   * @default false
   */
  showInMobile?: boolean

  /**
   * The delay of registering copy code buttons, in ms.
   * If the theme you are using has a switching animation causing the dom not available just after routing, then you might need it.
   *
   * 注册复制按钮的延时，单位 ms。
   * 如果你使用的主题有切换动画，导致路由后瞬间 dom 不可用，你可能需要它。
   *
   * @default 500
   */
  delay?: number

  /**
   * When copying code, selecting to ignore nodes in the code block will result in the text content of the selected nodes not being copied.
   *
   * 复制代码时，选择忽略代码块中的节点，被选中的节点文本内容将不会被复制
   *
   * @default []
   */
  ignoreSelector?: string[]

  /**
   * Locale config
   *
   * 国际化配置
   */
  locales?: LocaleConfig<CopyCodePluginLocaleData>
}
