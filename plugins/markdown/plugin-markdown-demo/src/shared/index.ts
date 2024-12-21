/**
 * Demo options
 */
export interface DemoOptions {
  /**
   * Whether to display CodePen button
   *
   * 是否显示 CodePen 按钮
   *
   * @default true
   */
  codepen?: boolean

  /**
   * Whether to display JSFiddle button
   *
   * 是否显示 JSFiddle 按钮
   *
   * @default true
   */
  jsfiddle?: boolean

  /**
   * JS Library links
   *
   * 引入的 JS 外部库链接
   */
  jsLib: string[]

  /**
   * CSS Library links
   *
   * 引入的 CSS 外部库链接
   */
  cssLib: string[]

  /**
   * Whether to use babel to transpile
   *
   * 是否使用 Babel 进行转义
   *
   * @default false
   */
  transpile: boolean

  /**
   * CodePen editor layout
   *
   * CodePen 编辑器布局
   *
   * @default "left"
   */
  codepenLayout?: 'left' | 'right' | 'top'

  /**
   * CodePen Editor Display
   *
   * CodePen 编辑器显示情况
   *
   * @default "101"
   */
  codepenEditors?: '001' | '010' | '011' | '100' | '101' | '110' | '111'
}
