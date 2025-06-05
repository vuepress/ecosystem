export type PrismjsLightTheme =
  | 'ateliersulphurpool-light'
  | 'coldark-cold'
  | 'coy'
  | 'duotone-light'
  | 'ghcolors'
  | 'gruvbox-light'
  | 'material-light'
  | 'one-light'
  | 'vs'

export type PrismjsDarkTheme =
  | 'atom-dark'
  | 'cb'
  | 'coldark-dark'
  | 'dark'
  | 'dracula'
  | 'duotone-dark'
  | 'duotone-earth'
  | 'duotone-forest'
  | 'duotone-sea'
  | 'duotone-space'
  | 'gruvbox-dark'
  | 'holi'
  | 'hopscotch'
  | 'lucario'
  | 'material-dark'
  | 'material-oceanic'
  | 'night-owl'
  | 'nord'
  | 'one-dark'
  | 'pojoaque'
  | 'shades-of-purple'
  | 'solarized-dark-atom'
  | 'tomorrow'
  | 'vsc-dark-plus'
  | 'xonokai'
  | 'z-touch'

export type PrismjsTheme = PrismjsDarkTheme | PrismjsLightTheme

export interface PrismjsHighlightOptions {
  /**
   * Single theme
   *
   * 单一主题
   *
   * @default 'nord'
   */
  theme?: PrismjsTheme

  /**
   * Dual themes
   *
   * 双主题
   */
  themes?: {
    light: PrismjsTheme
    dark: PrismjsTheme
  }

  /**
   * Languages to preload
   *
   * Workaround for prismjs language reloading issue
   *
   * 要预加载的语言
   *
   * 解决 prismjs 语言重新加载问题的方法
   *
   * @default ['markdown', 'jsdoc', 'yaml']
   * @see https://github.com/PrismJS/prism/issues/2716
   */
  preloadLanguages?: string[]
}
