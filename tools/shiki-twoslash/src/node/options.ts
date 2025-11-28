import type { TwoslashTypesCache } from '@shikijs/twoslash'
import type {
  RendererRichOptions,
  TransformerTwoslashOptions,
} from '@shikijs/twoslash/core'
import type { VueSpecificOptions } from 'twoslash-vue'

/**
 * Options for FloatingVue specific configurations
 *
 * FloatingVue 特定配置选项
 */
export interface TwoslashFloatingVueOptions {
  /**
   * Class name for copy ignore elements
   *
   * 复制忽略元素的类名
   *
   * @default 'vp-copy-ignore'
   */
  classCopyIgnore?: string

  /**
   * Class name for floating panel
   *
   * 浮动面板的类名
   *
   * @default 'twoslash-floating'
   */
  classFloatingPanel?: string

  /**
   * Class name for code elements
   *
   * 代码元素的类名
   *
   * @default 'vp-code'
   */
  classCode?: string

  /**
   * Class name for markdown elements
   *
   * Markdown 元素的类名
   *
   * @default ''
   */
  classMarkdown?: string

  /**
   * Attribute name for markdown content
   *
   * Markdown 内容的属性名
   *
   * @default 'vp-content'
   */
  attrMarkdown?: string

  /**
   * FloatingVue theme for basic popups
   *
   * 基础弹出框的 FloatingVue 主题
   *
   * @default 'twoslash'
   */
  floatingVueTheme?: string

  /**
   * FloatingVue theme for query popups
   *
   * 查询弹出框的 FloatingVue 主题
   *
   * @default 'twoslash-query'
   */
  floatingVueThemeQuery?: string

  /**
   * FloatingVue theme for completion popups
   *
   * 自动完成弹出框的 FloatingVue 主题
   *
   * @default 'twoslash-completion'
   */
  floatingVueThemeCompletion?: string
}

/**
 * Options for twoslash FloatingVue renderer
 *
 * Twoslash FloatingVue 渲染器选项
 */
export interface TwoslashFloatingVueRendererOptions extends RendererRichOptions {
  /**
   * Class and themes for floating-vue specific nodes
   *
   * FloatingVue 特定节点的类和主题
   */
  floatingVue?: TwoslashFloatingVueOptions
}

/**
 * Options for Shiki twoslash integration
 *
 * Shiki twoslash 集成选项
 */
export interface ShikiTwoslashOptions
  extends TransformerTwoslashOptions, TwoslashFloatingVueRendererOptions {
  /**
   * Twoslash options
   *
   * Twoslash 选项
   */
  twoslashOptions?: TransformerTwoslashOptions['twoslashOptions'] &
    VueSpecificOptions
  /**
   * Requires adding `twoslash` to the code block explicitly to run twoslash
   *
   * 需要在代码块中显式添加 `twoslash` 来运行 twoslash
   *
   * @default true
   */
  explicitTrigger?: TransformerTwoslashOptions['explicitTrigger']

  /**
   * The options for caching resolved types
   *
   * 缓存解析类型的选项
   */
  typesCache?: TwoslashTypesCache
}
