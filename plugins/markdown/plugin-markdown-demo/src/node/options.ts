import type { DemoOptions } from '../shared/index.js'

export interface DemoLibraryOptions {
  /**
   * Babel lib address
   *
   * Babel 库的地址
   *
   * @default "https://unpkg.com/@babel/standalone@7/babel.min.js"
   */
  babel?: string

  /**
   * Vue lib address
   *
   * Vue 库的地址
   *
   * @default "https://unpkg.com/vue@3/dist/vue.global.prod.js"
   */
  vue?: string

  /**
   * React lib address
   *
   * React 库的地址
   *
   * @default "https://unpkg.com/react@18/umd/react.production.min.js"
   */
  react?: string

  /**
   * ReactDOM lib address
   *
   * ReactDOM 库的地址
   *
   * @default "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
   */
  reactDOM?: string
}

/**
 * markdown-demo plugin configuration
 */
export interface MarkdownDemoPluginOptions extends Partial<DemoOptions> {
  /**
   * whether to support html demo
   *
   * @default true
   */
  html?: boolean

  /**
   * whether to support vue demo
   *
   * @default false
   */
  vue?: boolean

  /**
   * whether to support react demo
   *
   * @default false
   */
  react?: boolean

  /**
   * External library links
   *
   * 外部库链接
   */
  libs?: DemoLibraryOptions

  /**
   * delay to load the demo
   *
   * 加载演示的延迟
   *
   * @default 500
   */
  delay?: number
}
